import React from "react";
import "../styles/components/tracker.css";
import { COMPLAINT_STEPS, getNextStatus } from "../constants/complaintStatus";

const ComplaintTracker = ({ complaint, onStatusChange, role }) => {
    const currentStatus = complaint.status || 'Submitted';
    const statusHistory = complaint.statusHistory || [];

    // Find index
    const currentIndex = COMPLAINT_STEPS.findIndex(s => s.id === currentStatus);
    const validIndex = currentIndex === -1 ? 0 : currentIndex;

    const nextStep = getNextStatus(currentStatus);

    // Determine if user can perform action
    // ADMIN can move: 0 -> 1, 1 -> 2, 2 -> 3
    // GOV_ADMIN can move: 3 -> 4
    let canMove = false;

    if (nextStep) {
        if (role === 'admin' && nextStep.role === 'admin') {
            canMove = true;
        } else if (role === 'gov_admin' && nextStep.role === 'gov_admin') {
            canMove = true;
        }
    }

    // Calculate progress for the colored line
    const progressPercent = (validIndex / (COMPLAINT_STEPS.length - 1)) * 100;

    const getStepTimestamp = (stepId) => {
        const historyItem = statusHistory.find(h => h.status === stepId);
        if (!historyItem || !historyItem.updatedAt) return null;
        try {
            // Handle Firestore timestamp or ISO string
            const date = historyItem.updatedAt.toDate ? historyItem.updatedAt.toDate() : new Date(historyItem.updatedAt);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return null;
        }
    };

    return (
        <div className="tracker-container">
            <div className="tracker-stepper">
                {/* Background Line */}
                <div className="tracker-line-bg"></div>
                {/* Progress Line */}
                <div className="tracker-line-progress" style={{ width: `${progressPercent}%` }}></div>

                {COMPLAINT_STEPS.map((step, index) => {
                    const isCompleted = index < validIndex;
                    const isCurrent = index === validIndex;
                    let statusClass = "pending";
                    if (isCompleted) statusClass = "completed";
                    if (isCurrent) statusClass = "current";

                    const timestamp = getStepTimestamp(step.id);

                    return (
                        <div key={step.id} className={`tracker-step ${statusClass}`}>
                            <div className="step-circle">{index + 1}</div>
                            <div className="step-label">{step.label}</div>
                            {(timestamp) && <div className="step-time">{timestamp}</div>}
                            {isCurrent && !timestamp && <div className="step-time">Current Stage</div>}
                        </div>
                    );
                })}
            </div>

            {onStatusChange && nextStep && role !== 'user' && (
                <div className="tracker-action">
                    {canMove ? (
                        <button className="tracker-btn" onClick={() => onStatusChange(nextStep.id)}>
                            Mark as {nextStep.label}
                        </button>
                    ) : (
                        // Show info why disabled
                        (nextStep.role === 'gov_admin' && role === 'admin') ? (
                            <p className="gov-only-badge">Pending Government Approval</p>
                        ) : (
                            <p className="gov-only-badge">Action Unavailable</p>
                        )
                    )}
                </div>
            )}

            {validIndex === 4 && (
                <div className="tracker-action">
                    <p className="gov-only-badge" style={{ color: 'var(--success)', fontSize: '1rem', fontWeight: 'bold' }}>
                        ✅ Resolved – Closed by Government Authority
                    </p>
                </div>
            )}
        </div>
    );
};

export default ComplaintTracker;
