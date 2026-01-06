import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
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
                            <h1>{t('helpSupport')}</h1>
                        </div>
                        <p className="help-subtitle">
                            {t('helpSubtitle')}
                        </p>
                    </div>

                    {/* Quick Info - Now Compact Layout */}
                    <section className="help-info">
                        <div className="info-card">
                            <MdQuestionAnswer className="info-icon" />
                            <h3>FAQ</h3>
                            <p>Find quick answers.</p>
                        </div>
                        <div className="info-card">
                            <MdEmail className="info-icon" />
                            <h3>Email Us</h3>
                            <p>Response in 24h.</p>
                        </div>
                        <div className="info-card">
                            <MdPhone className="info-icon" />
                            <h3>Call Us</h3>
                            <p>Mon-Fri, 9am-6pm.</p>
                        </div>
                    </section>

                    {/* Main Content Grid: FAQ vs Contact */}
                    <div className="help-main-grid">
                        {/* Left Column: FAQs */}
                        <section className="help-section">
                            <h2>{t('frequentlyAskedQuestions')}</h2>
                            <div className="faq-list">
                                <div className="faq-item">
                                    <h4>How do I raise a complaint?</h4>
                                    <p>Navigate to "{t('raiseNew')}", fill details, and submit. You'll get a tracking ID.</p>
                                </div>
                                <div className="faq-item">
                                    <h4>Resolution time?</h4>
                                    <p>Typically 3-7 business days depending on severity.</p>
                                </div>
                                <div className="faq-item">
                                    <h4>Track status?</h4>
                                    <p>Go to "{t('myComplaints')}" to view real-time updates.</p>
                                </div>
                                <div className="faq-item">
                                    <h4>Update profile?</h4>
                                    <p>Go to {t('settings')}, update details, and save.</p>
                                </div>
                            </div>
                        </section>

                        {/* Right Column: Contact Form */}
                        <section className="help-section contact-section">
                            <h2>{t('contactSupport')}</h2>
                            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                    />
                                    <label htmlFor="name">{t('fullName')}</label>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                    />
                                    <label htmlFor="email">{t('emailAddress')}</label>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                    />
                                    <label htmlFor="subject">{t('subject')}</label>
                                </div>

                                <div className="input-group">
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4" /* Reduced rows */
                                        placeholder=" "
                                    ></textarea>
                                    <label htmlFor="message">{t('message')}</label>
                                </div>

                                <button type="submit" className="submit-btn" disabled={sending}>
                                    <MdSend size={16} />
                                    {sending ? t('sending') : t('sendMessage')}
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* Bottom Grid: Contact Info & Social */}
                    <div className="bottom-grid">
                        <section className="help-section contact-info">
                            <h2>{t('reachUsDirectly')}</h2>
                            <div className="contact-methods">
                                <div className="contact-method">
                                    <MdEmail />
                                    <div>
                                        <h4>Email</h4>
                                        <p>support@civic.gov.in</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <MdPhone />
                                    <div>
                                        <h4>Phone</h4>
                                        <p>1800-123-4567</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <FaWhatsapp />
                                    <div>
                                        <h4>WhatsApp</h4>
                                        <p>+91-98765-43210</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <MdLocationOn />
                                    <div>
                                        <h4>Address</h4>
                                        <p>New Delhi, India</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="help-section resources">
                            <h2>{t('connectResources')}</h2>
                            <div className="social-links">
                                <div className="social-icons">
                                    <a href="#" aria-label="Facebook"><FaFacebook size={24} /></a>
                                    <a href="#" aria-label="Twitter"><FaTwitter size={24} /></a>
                                    <a href="#" aria-label="WhatsApp"><FaWhatsapp size={24} /></a>
                                </div>
                            </div>
                            <div className="resource-links">
                                <a href="#" className="resource-link">{t('userManual')}</a>
                                <a href="#" className="resource-link">{t('policies')}</a>
                                <a href="#" className="resource-link">{t('terms')}</a>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Help;
