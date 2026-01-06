import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import emailjs from "@emailjs/browser";
import {
    MdHelp,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdQuestionAnswer,
    MdSend
} from "react-icons/md";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import "../../styles/pages/help.css";

const Help = () => {
    const navigate = useNavigate();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            // EmailJS configuration
            const serviceId = "service_7cv033j";
            const templateId = "template_5ekzoaa";
            const publicKey = "tGSgRGbb4tv4t6ZkE";

            await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

            alert("✅ Your message has been sent successfully! We'll get back to you soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("EmailJS Error:", error);
            alert("❌ Failed to send message. Please try again or contact us directly.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <Navbar />

            <div className="dashboard-body">
                <Sidebar />

                <main className="dashboard-content help-page">
                    <div className="help-header">
                        <div className="help-title">
                            <MdHelp size={32} />
                            <h1>Help & Support</h1>
                        </div>
                        <p className="help-subtitle">
                            Get assistance with your queries and concerns
                        </p>
                    </div>

                    {/* Quick Info Section */}
                    <section className="help-info">
                        <div className="info-card">
                            <MdQuestionAnswer size={32} className="info-icon" />
                            <h3>Frequently Asked Questions</h3>
                            <p>Find quick answers to common questions about our civic platform.</p>
                        </div>

                        <div className="info-card">
                            <MdEmail size={32} className="info-icon" />
                            <h3>Email Support</h3>
                            <p>Send us your queries and we'll respond within 24-48 hours.</p>
                        </div>

                        <div className="info-card">
                            <MdPhone size={32} className="info-icon" />
                            <h3>Phone Support</h3>
                            <p>Call our helpline for immediate assistance during business hours.</p>
                        </div>
                    </section>

                    {/* FAQs */}
                    <section className="help-section">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-list">
                            <div className="faq-item">
                                <h4>How do I raise a complaint?</h4>
                                <p>Navigate to "Raise New" from the sidebar or navbar, fill in the complaint details including category, location, and description, then submit. You'll receive a tracking ID to monitor your complaint status.</p>
                            </div>

                            <div className="faq-item">
                                <h4>How long does it take to resolve a complaint?</h4>
                                <p>Resolution time varies based on the complaint category and severity. Typically, complaints are resolved within 3-7 business days. You can track the status in real-time from your dashboard.</p>
                            </div>

                            <div className="faq-item">
                                <h4>Can I track my complaint status?</h4>
                                <p>Yes! Go to "My Complaints" to view all your submitted complaints with their current status (Pending, In Progress, or Resolved). Click on any complaint to see detailed tracking information.</p>
                            </div>

                            <div className="faq-item">
                                <h4>What types of complaints can I file?</h4>
                                <p>You can file complaints related to infrastructure, utilities, sanitation, public safety, transportation, and other civic issues. Select the appropriate category when raising your complaint.</p>
                            </div>

                            <div className="faq-item">
                                <h4>How do I update my profile information?</h4>
                                <p>Go to Settings from the sidebar, update your name, email, or mobile number, and click "Save Changes". For security reasons, email changes may require verification.</p>
                            </div>

                            <div className="faq-item">
                                <h4>What is the Community section?</h4>
                                <p>The Community section allows citizens to participate in civic polls, propose projects, and view decision logs. It's a platform for democratic participation in local governance.</p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Form */}
                    <section className="help-section contact-section">
                        <h2>Contact Us</h2>
                        <p className="section-description">
                            Can't find what you're looking for? Send us a message and our support team will get back to you.
                        </p>

                        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Brief subject of your query"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Describe your query or issue in detail..."
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn" disabled={sending}>
                                <MdSend size={20} />
                                {sending ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </section>

                    {/* Contact Information */}
                    <section className="help-section contact-info">
                        <h2>Other Ways to Reach Us</h2>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <MdEmail size={24} />
                                <div>
                                    <h4>Email</h4>
                                    <p>support@civicplatform.gov.in</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <MdPhone size={24} />
                                <div>
                                    <h4>Phone</h4>
                                    <p>1800-XXX-XXXX (Toll Free)</p>
                                    <p className="timing">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <FaWhatsapp size={24} />
                                <div>
                                    <h4>WhatsApp</h4>
                                    <p>+91-XXXXX-XXXXX</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <MdLocationOn size={24} />
                                <div>
                                    <h4>Office Address</h4>
                                    <p>Civic Platform Division</p>
                                    <p>Government of India</p>
                                    <p>New Delhi - 110001</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            <h4>Follow Us</h4>
                            <div className="social-icons">
                                <a href="#" aria-label="Facebook"><FaFacebook size={28} /></a>
                                <a href="#" aria-label="Twitter"><FaTwitter size={28} /></a>
                                <a href="#" aria-label="WhatsApp"><FaWhatsapp size={28} /></a>
                            </div>
                        </div>
                    </section>

                    {/* Additional Resources */}
                    <section className="help-section resources">
                        <h2>Additional Resources</h2>
                        <div className="resource-links">
                            <a href="#" className="resource-link">User Guide (PDF)</a>
                            <a href="#" className="resource-link">Video Tutorials</a>
                            <a href="#" className="resource-link">Terms of Service</a>
                            <a href="#" className="resource-link">Privacy Policy</a>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Help;
