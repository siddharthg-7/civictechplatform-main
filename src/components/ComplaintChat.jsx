import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

import "../styles/components/chat.css";

const ComplaintChat = ({ complaintId, role }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const q = query(
            collection(db, "complaints", complaintId, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [complaintId, isOpen]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;
        if (!auth.currentUser) return;

        try {
            await addDoc(collection(db, "complaints", complaintId, "messages"), {
                text: newMessage,
                senderId: auth.currentUser.uid,
                senderName: auth.currentUser.displayName || (role === 'admin' || role === 'gov_admin' ? 'Admin' : 'User'),
                senderRole: role,
                createdAt: serverTimestamp()
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!isOpen) {
        return (
            <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
                💬 View Discussion
            </button>
        );
    }

    const canChat = role !== 'gov_admin';

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h4>Community Discussion</h4>
                <button onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="chat-messages">
                {messages.length === 0 ? <p className="no-msgs">No messages yet. Start the discussion.</p> : (
                    messages.map(msg => (
                        <div key={msg.id} className={`chat-msg ${msg.senderRole === 'admin' ? 'admin' : 'user'}`}>
                            <span className="msg-sender">{msg.senderName} ({msg.senderRole})</span>
                            <p>{msg.text}</p>
                        </div>
                    ))
                )}
            </div>

            {canChat ? (
                <div className="chat-input-area">
                    <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder=" "
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <label>Type a message...</label>
                    </div>
                    <button onClick={handleSend}>Send</button>
                </div>
            ) : (
                <div className="chat-locked">
                    <p>Government Admins cannot participate in discussions.</p>
                </div>
            )}
        </div>
    );
};

export default ComplaintChat;
