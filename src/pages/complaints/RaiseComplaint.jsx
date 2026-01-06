import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/pages/complaints.css";
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const RaiseComplaint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { state, district, municipality } = location.state || {};

  const [problemType, setProblemType] = useState("");
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!problemType || !days || !description) {
      alert("Please fill all required fields");
      return;
    }

    if (!state || !district || !municipality) {
      alert("Missing location data. Please go back and select your location.");
      return;
    }

    if (!auth.currentUser) {
      alert("Please login to raise a complaint");
      return;
    }

    setLoading(true);
    console.log("Starting complaint submission...");

    try {
      const newComplaint = {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "Anonymous",
        userEmail: auth.currentUser.email,
        state,
        district,
        municipality,
        problemType,
        days,
        description,
        status: "Pending",
        createdAt: serverTimestamp(),
      };

      console.log("Saving complaint to Firestore...");
      const docRef = await addDoc(collection(db, "complaints"), newComplaint);
      console.log("Complaint saved with ID:", docRef.id);

      setSubmitted(true);
      setTimeout(() => {
        navigate("/complaints");
      }, 1500);
    } catch (error) {
      console.error("Full error details:", error);
      alert(`Failed to raise complaint: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="complaints-container">

            <h2 className="complaints-title">{t('raiseComplaintTitle')}</h2>

            <div className="complaint-box">

              {/* LOCATION INFO */}
              <p className="complaint-location">
                <strong>{t('location')}:</strong>{" "}
                {state}, {district}, {municipality}
              </p>

              {/* PROBLEM TYPE & DAYS */}
              <div className="form-row">
                <select
                  value={problemType}
                  onChange={(e) => setProblemType(e.target.value)}
                >
                  <option value="">{t('selectProblemType')}</option>
                  <option value="Road Issue">{t('roadIssue')}</option>
                  <option value="Water Supply">{t('waterSupply')}</option>
                  <option value="Drainage">{t('drainage')}</option>
                  <option value="Garbage">{t('garbage')}</option>
                  <option value="Street Light">{t('streetLight')}</option>
                  <option value="Other">{t('other')}</option>
                </select>

                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                >
                  <option value="">{t('problemSince')}</option>
                  <option value="1-3 days">1–3 days</option>
                  <option value="4-7 days">4–7 days</option>
                  <option value="More than 7 days">
                    More than 7 days
                  </option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <textarea
                placeholder={t('describeProblem')}
                value={description}
                maxLength={1000}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* SUBMIT */}
              <button onClick={handleSubmit} disabled={loading}>
                {loading ? t('submitting') : t('submitComplaint')}
              </button>

              {/* SUCCESS MESSAGE */}
              {submitted && (
                <p className="success-text">
                  ✅ {t('complaintSuccess')}
                </p>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RaiseComplaint;
