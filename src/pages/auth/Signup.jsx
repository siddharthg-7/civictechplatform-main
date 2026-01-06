import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import { auth, db } from "../../firebase";
import { TextField } from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !phone || !password) {
            alert("Please fill in all details");
            return;
        }

        setLoading(true);
        console.log("Starting signup for:", email);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User created in Auth:", user.uid);

            // Update display name
            await updateProfile(user, { displayName: name });
            console.log("Profile updated with name:", name);

            // Store additional user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                phone: phone,
                role: "user",
                createdAt: new Date().toISOString(),
            });
            console.log("User data stored in Firestore");

            navigate("/dashboard");
        } catch (error) {
            console.error("Signup error details:", error);
            alert(`Signup failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-form">
                    {/*logo*/}
                    <div className="auth-logo">
                        <img src={logo} alt="Civic Platform" />
                        <h2>Get started</h2>
                    </div>

                    {/*Name*/}
                    <div className="form-group">
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            size="small"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/*Email*/}
                    <div className="form-group">
                        <TextField
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            fullWidth
                            size="small"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/*Phone*/}
                    <div className="form-group">
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            size="small"
                            placeholder="+1 (555) 000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {/*Password*/}
                    <div className="form-group">
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            size="small"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Signup Button */}
                    <button className="auth-btn" onClick={handleSignup} disabled={loading}>
                        {loading ? "Creating account..." : "Create account"}
                    </button>

                    {/*Links*/}
                    <div className="auth-links">
                        <p>Already have an account? <Link to="/">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;