import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

import "../styles/components/chat.css";

const DiscussionChat = ({ contextId, collectionName = "complaints", role }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const q = query(
            collection(db, collectionName, contextId, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [contextId, collectionName, isOpen]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;
        if (!auth.currentUser) return;

        let senderDisplay = auth.currentUser.displayName || "Anonymous";

        // Logic for role display
        if (role === 'admin' || role === 'gov_admin') {
            // Check specific role or default
            senderDisplay = role === 'gov_admin' ? 'Government Authority' : 'Admin';
        }

        try {
            await addDoc(collection(db, collectionName, contextId, "messages"), {
                text: newMessage,
                senderId: auth.currentUser.uid,
                senderName: senderDisplay,
                senderRole: role || 'user',
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
                💬 Discuss
            </button>
        );
    }

    // Role-based Chat Permissions
    // Gov Admin: Read-only in Complaints, but maybe allowed in Polls? 
    // Assumption: Gov Admin matches complaint logic (Read Only) for consistency, unless specified otherwise.
    // However, user said "discussion should be in community polls". 
    // Usually polls are open for everyone. Let's assume standard behavior:
    // If it's a poll, everyone can chat? Or stick to role restrictions?
    // Let's stick to the requested restriction: "Government Admins cannot participate in discussions" from earlier prompt logic implies a general rule.
    // But for regular users, they can chat.

    const canChat = role !== 'gov_admin';

    return (
        <div className="chat-container" style={{ marginTop: '1rem' }}>
            <div className="chat-header">
                <h4>Discussion</h4>
                <button onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="chat-messages">
                {messages.length === 0 ? <p className="no-msgs">Start the discussion...</p> : (
                    messages.map(msg => (
                        <div key={msg.id} className={`chat-msg ${msg.senderRole === 'admin' || msg.senderRole === 'gov_admin' ? 'admin' : 'user'}`}>
                            <span className="msg-sender">{msg.senderName} ({msg.senderRole === 'gov_admin' ? 'Gov' : (msg.senderRole === 'admin' ? 'Admin' : 'User')})</span>
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
                    <p>Government Admins cannot participate.</p>
                </div>
            )}
        </div>
    );
};

export default DiscussionChat;
