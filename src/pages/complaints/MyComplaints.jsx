import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import ComplaintChat from "../../components/ComplaintChat";

import { locations } from "../../data/locations";

import "../../styles/pages/complaints.css";
import { auth, db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const MyComplaints = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const locationData = useLocation().state || {};
  const [state, setState] = useState(locationData.state || "");
  const [district, setDistrict] = useState(locationData.district || "");
  const [municipality, setMunicipality] = useState(locationData.municipality || "");

  const [myComplaints, setMyComplaints] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, "complaints"), where("userId", "==", auth.currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      setMyComplaints(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // states
  const states = Object.keys(locations);

  // districts based on state
  const districts =
    state && locations[state]
      ? Object.keys(locations[state].districts)
      : [];

  // municipalities based on district
  const municipalities =
    state && district
      ? locations[state].districts[district].municipalities
      : [];

  const handleContinue = () => {
    if (!state || !district || !municipality) {
      alert("Please select State, District and Municipality");
      return;
    }

    // navigate to RaiseComplaint
    navigate("/raise-complaint", {
      state: {
        state,
        district,
        municipality,
      },
    });
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="complaints-container">
            <h2 className="complaints-title">{t('raiseNewComplaint')}</h2>

            <div className="complaint-box">
              {/* STATE */}
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setDistrict("");
                  setMunicipality("");
                }}
              >
                <option value="">{t('selectState')}</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* DISTRICT */}
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setMunicipality("");
                }}
                disabled={!state}
              >
                <option value="">{t('selectDistrict')}</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {/* MUNICIPALITY */}
              <select
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                disabled={!district}
              >
                <option value="">{t('selectMunicipality')}</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <button onClick={handleContinue} disabled={!municipality}>
                {t('continue')}
              </button>
            </div>

            {/* STATS */}
            <div className="complaint-stats">
              <div className="stat-card">
                <h3>{myComplaints.length}</h3>
                <p>{t('totalComplaints') || 'Total Complaints'}</p>
              </div>
              <div className="stat-card resolved">
                <h3>{myComplaints.filter(c => c.status === 'Resolved').length}</h3>
                <p>{t('resolved') || 'Resolved'}</p>
              </div>
              <div className="stat-card pending">
                <h3>{myComplaints.length - myComplaints.filter(c => c.status === 'Resolved').length}</h3>
                <p>{t('pending') || 'Pending'}</p>
              </div>
            </div>

            {/* MY RECENT COMPLAINTS */}
            <div className="my-complaints-section" style={{ marginTop: '3rem' }}>
              <h2 className="complaints-title">{t('trackComplaintStatus')}</h2>
              <div className="complaints-list">
                {myComplaints.length === 0 ? (
                  <p>{t('noComplaintsYet')}</p>
                ) : (
                  myComplaints.map(c => (
                    <div key={c.id} className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--primary)' }}>{c.problemType}</h3>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p style={{ marginBottom: '1rem' }}>{c.description}</p>
                      <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                        <strong>Status: </strong>
                        <span style={{
                          color: c.status === 'Resolved' ? 'var(--success)' : c.status === 'Rejected' ? 'var(--danger)' : 'var(--primary)',
                          fontWeight: 'bold'
                        }}>
                          {c.status || 'Submitted'}
                        </span>
                      </div>
                      <ComplaintChat complaintId={c.id} role="user" />
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default MyComplaints;
