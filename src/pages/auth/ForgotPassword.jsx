import React, { useState } from 'react';
import { Links, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo/civic-logo.png";
import emailIcon from "../../assets/images/icons/email.png";

const ForgotPassword = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter your registered email");
      return;
    }

    alert("Password reset link sent to your email");
    navigate("/");
  };
  return (
    <div className="auth-page">
    <div className="auth-container">
        <div className="auth-form">
            {/*Logo*/}
            <div className="auth-logo">
                <img src={logo} alt="Civic Logo"/>
                <h2>Forget PassWord</h2>
            </div>
            {/*Email*/}
            <div className="input-group">
                <img src={emailIcon} alt="email"/>
                <input type="email" placeholder="Email your Registered Email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            </div>
            {/* Submit Button */}
            <button className="auth-btn" onClick={handleReset}>
                Reset Password
            </button>
        </div>
        </div>
        
    </div>
  )
}

export default ForgotPassword