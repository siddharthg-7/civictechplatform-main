import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/civic-logo.png";
import { auth, db } from "../../firebase";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const Signup = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
                        <h2>{t('getStarted')}</h2>
                    </div>

                    {/*Name*/}
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>{t('fullName')}</label>
                    </div>

                    {/*Email*/}
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>{t('emailAddress')}</label>
                    </div>

                    {/*Phone*/}
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=" "
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label>{t('phoneNumber')}</label>
                    </div>

                    {/*Password*/}
                    <div className="input-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>{t('passwordLabel')}</label>
                    </div>

                    {/* Signup Button */}
                    <button className="auth-btn" onClick={handleSignup} disabled={loading}>
                        {loading ? t('creatingAccount') : t('createAccountBtn')}
                    </button>

                    {/*Links*/}
                    <div className="auth-links">
                        <p>{t('alreadyHaveAccount')} <Link to="/">{t('signInButton')}</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;