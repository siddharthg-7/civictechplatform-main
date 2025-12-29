import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { locations } from "../../data/locations";

import "../../styles/pages/complaints.css";

const MyComplaints = () => {
  const navigate = useNavigate();

  const locationData = useLocation().state || {};
  const [state, setState] = useState(locationData.state || "");
  const [district, setDistrict] = useState(location.district||"");
  const [municipality, setMunicipality] = useState(location.municipality||"");

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
            <h2 className="complaints-title">Raise New Complaint</h2>

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
                <option value="">Select State</option>
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
                <option value="">Select District</option>
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
                <option value="">Select Municipality</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <button onClick={handleContinue} disabled={!municipality}>
                Continue
              </button>
            </div>

            {/* STATS */}
            <div className="complaint-stats">
              <div className="stat-card">
                <h3>120</h3>
                <p>Total Complaints</p>
              </div>

              <div className="stat-card resolved">
                <h3>75</h3>
                <p>Resolved</p>
              </div>

              <div className="stat-card pending">
                <h3>45</h3>
                <p>Pending</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyComplaints;
