import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import userIcon from "../../assets/images/icons/user.png";
import emailIcon from "../../assets/images/icons/email.png";
import phoneIcon from "../../assets/images/icons/phone.png";
import passwordIcon from "../../assets/images/icons/password.png";
import signupIcon from "../../assets/images/icons/signup.png";
import { auth, db } from "../../firebase";
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
            alert("Please fill all the details");
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

            alert("Account created successfully ✅");
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
                        <img src={logo} alt="Civic Logo" />
                        <h2>Create Account</h2>
                    </div>
                    {/*Name*/}
                    <div className="input-group">
                        <img src={userIcon} alt="user" />
                        <input type="text" placeholder="Full Name" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    {/*Email*/}
                    <div className="input-group">
                        <img src={emailIcon} alt="email" />
                        <input type="email" placeholder="Email Address" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {/*Phone*/}
                    <div className="input-group">
                        <img src={phoneIcon} alt="phone" />
                        <input type="text" placeholder="Phone Number" value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    {/*Password*/}
                    <div className="input-group">
                        <img src={passwordIcon} alt="password" />
                        <input type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {/* Signup Button */}
                    <button className="auth-btn" onClick={handleSignup} disabled={loading}>
                        <img src={signupIcon} alt="signup" />
                        {loading ? "Creating Account..." : "Signup"}
                    </button>
                    {/*Links*/}
                    <div className="auth-links">
                        <p>Already have an account? <Link to="/">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;