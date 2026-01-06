import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/pages/community.css";

import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { TextField } from '@mui/material';

const ProposeProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !category) {
      alert("Please fill all fields");
      return;
    }

    if (!auth.currentUser) {
      alert("Please login to propose a project");
      return;
    }

    setLoading(true);
    try {
      const project = {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "Anonymous",
        title,
        description,
        category,
        likes: 0,
        dislikes: 0,
        voters: [],
        status: "Under Review",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "communityProjects"), project);

      alert("Project proposal submitted successfully ✅");
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit proposal");
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
          <div className="community-container">
            <header className="page-header">
              <h2 className="page-title">Propose a Project</h2>
              <p className="page-subtitle">
                Have an idea to improve your neighborhood? Share it with the community and gathering support.
              </p>
            </header>

            <div className="community-form">
              <div className="form-group">
                <TextField
                  label="Project Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="e.g. New Street Lights in Ward 5"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <TextField
                  label="Category"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="Zebra Crossing">Zebra Crossing</option>
                  <option value="Park / Playground">Park / Playground</option>
                  <option value="Street Lights">Street Lights</option>
                  <option value="Footpath">Footpath</option>
                  <option value="Drainage">Drainage</option>
                </TextField>
              </div>

              <div className="form-group">
                <TextField
                  label="Project Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Describe the project and how it will benefit the local residents..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting Idea..." : "Submit Proposal"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProposeProject;
