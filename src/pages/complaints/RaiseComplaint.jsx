import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/pages/complaints.css";
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const RaiseComplaint = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

            <h2 className="complaints-title">Raise Complaint</h2>

            <div className="complaint-box">

              {/* LOCATION INFO */}
              <p className="complaint-location">
                <strong>Location:</strong>{" "}
                {state}, {district}, {municipality}
              </p>

              {/* PROBLEM TYPE & DAYS */}
              <div className="form-row">
                <select
                  value={problemType}
                  onChange={(e) => setProblemType(e.target.value)}
                >
                  <option value="">Select Problem Type</option>
                  <option value="Road Issue">Road Issue</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Drainage">Drainage</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Street Light">Street Light</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                >
                  <option value="">Problem Since</option>
                  <option value="1-3 days">1–3 days</option>
                  <option value="4-7 days">4–7 days</option>
                  <option value="More than 7 days">
                    More than 7 days
                  </option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <textarea
                placeholder="Describe the problem clearly (max 1000 characters)"
                value={description}
                maxLength={1000}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* SUBMIT */}
              <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>

              {/* SUCCESS MESSAGE */}
              {submitted && (
                <p className="success-text">
                  ✅ Complaint published successfully
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
