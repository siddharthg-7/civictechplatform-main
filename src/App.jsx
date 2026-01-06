import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import MyComplaints from "./pages/complaints/MyComplaints";
import RaiseComplaint from "./pages/complaints/RaiseComplaint";
import Telecommunications from "./pages/telecom/Telecommunications";
import Settings from "./pages/settings/Settings";
import AboutAccount from "./pages/about/AboutAccount";
import Resolved from "./pages/complaints/Resolved";
import Reports from "./pages/reports/Reports";
import Help from "./pages/help/Help";
import CommunityDashboard from "./community/CommunityDashboard";
import ProposeProject from "./community/ProposeProject";
import DecisionLogs from "./community/DecisionLogs";
import CommunityPolls from "./community/CommunityPolls";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminComplaints from "./admin/pages/AdminComplaints";
import AdminSignup from "./admin/pages/AdminSignup";
import AdminForgot from "./admin/pages/AdminForgot";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminPolls from "./admin/pages/AdminPolls";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminAccount from "./admin/pages/AdminAccount";
import AdminSettings from "./admin/pages/AdminSettings";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-layout">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaints" element={<MyComplaints />} />
        <Route path="/raise-complaint" element={<RaiseComplaint />} />
        <Route path="/telecom" element={<Telecommunications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about/account" element={<AboutAccount />} />
        <Route path="/resolved" element={<Resolved />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/help" element={<Help />} />
        <Route path="/community" element={<CommunityDashboard />} />
        <Route path="/community/propose" element={<ProposeProject />} />
        <Route path="/community/decisions" element={<DecisionLogs />} />
        <Route path="/community/polls" element={<CommunityPolls />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/forgot" element={<AdminForgot />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route path="/admin/polls" element={<AdminPolls />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/account" element={<AdminAccount />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
