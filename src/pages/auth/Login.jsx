import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ADMIN_EMAILS } from '../../constants/adminEmails';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Shield, User, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const switchMode = (adminMode) => {
    setIsAdmin(adminMode);
    setUsername('');
    setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter your email and password.');
      return;
    }
    if (isAdmin && !ADMIN_EMAILS.includes(username)) {
      alert('This account does not have Admin privileges.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Colors based on mode
  const primaryColor = isAdmin ? '#B45309' : '#1E3A8A'; // Orange/Brown for Admin, Blue for Citizen
  const primaryHover = isAdmin ? '#92400E' : '#1e3b8a';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'row', fontFamily: 'sans-serif' }} className="bg-slate-50 antialiased">
      
      {/* ── LEFT SIDE (Hero Section) ── */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3.5rem', position: 'relative', overflow: 'hidden', transition: 'background-color 0.3s' }} className={`${isAdmin ? 'bg-[#1e293b]' : 'bg-[#1E3A8A]'} text-white`}>
        
        {/* Background Gradients */}
        <div style={{ position: 'absolute', top: 0, left: '-25%', width: '50%', height: '50%', background: isAdmin ? 'rgba(245, 158, 11, 0.1)' : 'rgba(37, 99, 235, 0.2)', borderRadius: '9999px', filter: 'blur(60px)' }}></div>
        
        {/* Top: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 10 }}>
          <div style={{ width: '2.5rem', height: '2.5rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <Shield size={20} style={{ color: 'white' }} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>Civic Platform</span>
        </div>

        {/* Main Content */}
        <div style={{ zIndex: 10, marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isAdmin ? 'admin' : 'citizen'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '0.5rem', color: 'white' }}>
                {isAdmin ? 'Official Admin' : 'Empowering Citizens.'}<br />
                <span style={{ color: isAdmin ? '#10b981' : '#10b981' }}>
                  {isAdmin ? 'Secure Portal.' : 'Transparent Governance.'}
                </span>
              </h1>

              <p style={{ color: 'rgba(219, 234, 254, 0.8)', fontSize: '1rem', maxWidth: '32rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                {isAdmin 
                  ? 'Access the restricted administrative portal to manage civic services, complaints, community polls, and government reports.'
                  : 'Join over 2 million citizens participating in the digital transformation of their cities. Report issues, vote on proposals, and access public services instantly.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Visual Area (Lottie) */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ width: '100%', height: '350px', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
            <div style={{ width: '100%', height: '100%', maxWidth: '500px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isAdmin ? 'admin-lottie' : 'citizen-lottie'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <DotLottieReact
                    src={isAdmin 
                      ? "https://lottie.host/a26291a3-8831-4525-b11c-f41df5b80b31/VW3fDzZtNG.lottie"
                      : "https://lottie.host/e2eeeb95-4085-46f0-87e2-2ba75b6e377b/BEzGf1BGW8.lottie"}
                    loop
                    autoplay
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Floating Stat Cards (Only for Citizen mode) */}
          {!isAdmin && (
            <>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', top: '10%', left: '-1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 20 }}
              >
                <div style={{ color: '#67e8f9', fontWeight: 'bold', fontSize: '1.1rem' }}>2.4M+</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(219, 234, 254, 0.7)' }}>Active Citizens</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{ position: 'absolute', top: '30%', right: '-1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 20 }}
              >
                <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}>98%</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(219, 234, 254, 0.7)' }}>Resolution Rate</div>
              </motion.div>
            </>
          )}
        </div>

        {/* Footer info */}
        <div style={{ fontSize: '0.75rem', color: 'rgba(219, 234, 254, 0.4)', zIndex: 10, marginTop: '1.5rem' }}>
          © 2026 Civic Platform. All rights reserved.
        </div>
      </div>

      {/* ── RIGHT SIDE (Login Area) ── */}
      <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.5rem', position: 'relative', background: '#f8fafc' }}>
        
        {/* Ambient background glow / Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5, zIndex: 1 }}></div>
        
        <div style={{ width: '100%', maxWidth: '440px', zIndex: 10 }}>
          
          {/* Premium Card */}
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9' }}>
              <button
                onClick={() => switchMode(false)}
                style={{ flex: 1, padding: '1rem', fontSize: '0.875rem', fontWeight: '600', transition: 'all 0.2s', background: !isAdmin ? 'white' : '#f8fafc', border: 'none', borderBottom: !isAdmin ? `2px solid ${primaryColor}` : '2px solid transparent', color: !isAdmin ? primaryColor : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <User size={16} />
                Citizen Login
              </button>
              <button
                onClick={() => switchMode(true)}
                style={{ flex: 1, padding: '1rem', fontSize: '0.875rem', fontWeight: '600', transition: 'all 0.2s', background: isAdmin ? 'white' : '#f8fafc', border: 'none', borderBottom: isAdmin ? `2px solid ${primaryColor}` : '2px solid transparent', color: isAdmin ? primaryColor : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Shield size={16} />
                Admin / Govt
              </button>
            </div>

            {/* Card Content */}
            <div style={{ padding: '2.5rem' }}>
              
              {/* Admin Badge */}
              {isAdmin && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FEF3C7', color: '#B45309', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase' }}>
                  <Shield size={14} />
                  Restricted Government Access
                </div>
              )}

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem' }}>
                  {isAdmin ? 'Admin Portal' : 'Welcome Back'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  {isAdmin ? 'Enter your official credentials to access the admin dashboard.' : 'Please enter your details to access your dashboard.'}
                </p>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Email Input */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', insetY: 0, left: 0, paddingLeft: '1rem', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: '#94a3b8', height: '100%' }}>
                    {isAdmin ? <Shield size={18} /> : <Mail size={18} />}
                  </div>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={isAdmin ? "Official Email Address" : "Email Address"}
                    style={{ width: '100%', paddingLeft: '2.75rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = primaryColor}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    required
                  />
                </div>

                {/* Password Input */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', insetY: 0, left: 0, paddingLeft: '1rem', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: '#94a3b8', height: '100%' }}>
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{ width: '100%', paddingLeft: '2.75rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = primaryColor}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    required
                  />
                </div>

                {/* Remember & Forgot */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#475569' }}>
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      style={{ borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}
                    />
                    <span>{isAdmin ? 'Remember me' : 'Remember me for 30 days'}</span>
                  </label>
                  <Link
                    to={isAdmin ? '/admin/forgot' : '/forgot-password'}
                    style={{ fontWeight: '600', color: '#0d9488', textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', paddingTop: '0.75rem', paddingBottom: '0.75rem', background: primaryColor, color: 'white', fontWeight: '600', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1, fontSize: '0.875rem' }}
                  onMouseOver={(e) => e.target.style.background = primaryHover}
                  onMouseOut={(e) => e.target.style.background = primaryColor}
                >
                  <span>{loading ? 'Signing in...' : (isAdmin ? 'Access Admin Dashboard' : 'Login to Dashboard')}</span>
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>

              {/* Admin Info Box */}
              {isAdmin && (
                <div style={{ marginTop: '1.5rem', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '0.5rem', padding: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <AlertCircle size={16} style={{ color: '#B45309', flexShrink: 0, marginTop: '0.1rem' }} />
                  <p style={{ fontSize: '0.75rem', color: '#B45309', lineHeight: '1.4' }}>
                    All admin sessions are monitored and logged for security compliance.
                  </p>
                </div>
              )}

              {/* Bottom Section */}
              {!isAdmin && (
                <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#475569', textAlign: 'center' }}>
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ fontWeight: '600', color: '#1E3A8A', textDecoration: 'none' }}>
                    Sign up for free
                  </Link>
                </div>
              )}
              
              {isAdmin && (
                <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#475569', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    Not an admin?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode(false)}
                      style={{ fontWeight: '600', color: '#1E3A8A', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Go to Citizen Login
                    </button>
                  </div>
                  <div>
                    Need admin access?{' '}
                    <Link to="/admin/signup" style={{ fontWeight: '600', color: '#B45309', textDecoration: 'none' }}>
                      Request via Admin Signup
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Links */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Help Center</a>
          </div>
        </div>
        
        {/* FAB */}
        <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }}>
          <button 
            onClick={() => navigate('/help')}
            style={{ width: '3rem', height: '3rem', background: primaryColor, border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'background-color 0.2s' }}
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
