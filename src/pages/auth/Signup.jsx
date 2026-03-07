import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getAuthErrorMessage } from "../../utils/authErrors";
import "../../styles/pages/auth.css";

/* ------------------------------------------------------------------ */
/*  Floating Label Input — Material Design style                        */
/* ------------------------------------------------------------------ */
const FloatInput = ({
    id,
    type = "text",
    label,
    icon,
    value,
    onChange,
    autoComplete,
}) => (
    <div className="float-field">
        <input
            id={id}
            type={type}
            placeholder=" "
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
        />
        <span className="field-icon material-symbols-outlined">{icon}</span>
        <label htmlFor={id}>{label}</label>
    </div>
);

/* ------------------------------------------------------------------ */
/*  Signup Page                                                         */
/* ------------------------------------------------------------------ */
const Signup = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        if (!agreed) {
            alert("Please accept the Terms of Service and Privacy Policy.");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                phone,
                role: "user",
                createdAt: new Date().toISOString(),
            });

            navigate("/dashboard");
        } catch (error) {
            const message = getAuthErrorMessage(error);
            alert(`Signup failed: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            {/* ── NAV ── */}
            <header className="auth-navbar">
                <div className="auth-navbar-brand">
                    <div className="auth-navbar-logo">
                        <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <span className="auth-navbar-title">Civic Platform</span>
                </div>

                <div className="auth-navbar-actions">
                    <nav className="auth-navbar-nav">
                        <a href="#">About</a>
                        <a href="#">Support</a>
                    </nav>
                    <Link to="/" className="auth-navbar-login-btn">
                        Login
                    </Link>
                </div>
            </header>

            {/* ── MAIN ── */}
            <main className="signup-main">
                {/* ── LEFT PANEL ── */}
                <aside className="auth-left" style={{ flex: "0 0 50%" }}>
                    <div className="signup-left-inner">
                        {/* Icon */}
                        <div className="signup-left-icon">
                            <span className="material-symbols-outlined">diversity_3</span>
                        </div>

                        {/* Headline */}
                        <h2 className="signup-left-title">
                            Empowering Citizens,<br />Shaping Cities.
                        </h2>
                        <p className="signup-left-subtitle">
                            Join thousands of residents in the digital revolution of smart
                            governance. Your voice is the foundation of a better, smarter
                            community.
                        </p>

                        {/* Feature list */}
                        <ul className="auth-feature-list">
                            {[
                                "Vote on local community projects",
                                "Real-time alerts for city services",
                                "Direct channel to local representatives",
                            ].map((item) => (
                                <li key={item} className="auth-feature-item">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* decorative blobs */}
                    <div className="auth-blob-1" />
                    <div className="auth-blob-2" />
                </aside>

                {/* ── RIGHT PANEL ── */}
                <section className="auth-right">
                    <div className="auth-form-wrapper">

                        {/* Card */}
                        <div className="auth-glass-card">
                            <div className="auth-card-header">
                                <h3>Create Your Account</h3>
                                <p>Enter your details to start engaging with your local government.</p>
                            </div>

                            <form className="auth-form-fields" onSubmit={handleSignup}>
                                {/* Full Name */}
                                <FloatInput
                                    id="signup-name"
                                    type="text"
                                    label="Full Name"
                                    icon="person"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                />

                                {/* Email */}
                                <FloatInput
                                    id="signup-email"
                                    type="email"
                                    label="Email Address"
                                    icon="mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />

                                {/* Phone */}
                                <FloatInput
                                    id="signup-phone"
                                    type="tel"
                                    label="Phone Number"
                                    icon="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoComplete="tel"
                                />

                                {/* Password row */}
                                <div className="form-row-2">
                                    <FloatInput
                                        id="signup-password"
                                        type="password"
                                        label="Password"
                                        icon="lock"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                    <FloatInput
                                        id="signup-confirm"
                                        type="password"
                                        label="Confirm Password"
                                        icon="lock_reset"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </div>

                                {/* Terms */}
                                <div className="auth-checkbox-row">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <label htmlFor="terms">
                                        I agree to the{" "}
                                        <a href="#" style={{ color: "#1e3b8a", fontWeight: 600 }}>
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" style={{ color: "#1e3b8a", fontWeight: 600 }}>
                                            Privacy Policy
                                        </a>
                                        .
                                    </label>
                                </div>

                                {/* Submit */}
                                <button
                                    className="auth-btn-primary"
                                    type="submit"
                                    disabled={loading}
                                    style={{ fontSize: "1.05rem", padding: "1rem" }}
                                >
                                    {loading ? "Creating account…" : "Create Account"}
                                </button>
                            </form>

                            {/* Sign-in link */}
                            <div className="auth-divider-section" style={{ marginBottom: 0 }}>
                                <p className="auth-alt-link">
                                    Already have an account?{" "}
                                    <Link to="/">Log in here</Link>
                                </p>
                            </div>
                        </div>

                        {/* App store badges */}
                        <div className="auth-app-badges">
                            <div className="auth-badge">
                                <span className="material-symbols-outlined">ios</span>
                                App Store
                            </div>
                            <div className="auth-badge">
                                <span className="material-symbols-outlined">play_store_installed</span>
                                Google Play
                            </div>
                        </div>
                    </div>

                    {/* ── FAB ── */}
                    <div className="auth-fab-group">
                        <span className="auth-fab-tooltip">Need help?</span>
                        <button
                            type="button"
                            className="auth-fab"
                            aria-label="Help"
                            onClick={() => navigate("/help")}
                        >
                            <span className="material-symbols-outlined">help</span>
                        </button>
                    </div>
                </section>
            </main>

            {/* mobile footer */}
            <footer className="signup-footer">
                © 2024 Civic Platform. All rights reserved. Built for better communities.
            </footer>
        </div>
    );
};

export default Signup;