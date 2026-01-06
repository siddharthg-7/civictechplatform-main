import { useEffect, useState } from "react";
import "../styles/admin.css";

import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

import { MdPerson } from "react-icons/md";

import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="admin-wrapper">
      <AdminNavbar />

      <div className="admin-body">
        <AdminSidebar />

        <main className="admin-content">
          <h2 className="admin-title">Registered Users</h2>

          {loading ? (
            <p className="empty-text">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="empty-text">No registered users found.</p>
          ) : (
            <div className="admin-complaints-grid">
              {users.map((user) => (
                <div className="admin-card" key={user.id}>
                  <div className="admin-row" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                    <MdPerson
                      size={24}
                      color="#666"
                      className="admin-user-icon"
                    />
                    <strong>{user.name}</strong>
                  </div>

                  <div className="admin-row">
                    <strong>Email:</strong> {user.email}
                  </div>

                  <div className="admin-row">
                    <strong>Phone:</strong> {user.phone || "N/A"}
                  </div>

                  <div className="admin-row">
                    <strong>Status:</strong>
                    <span className={`resolved-badge ${user.status === 'online' ? 'resolved' : 'pending'}`}>
                      {user.status || "offline"}
                    </span>
                  </div>

                  <div className="admin-row">
                    <strong>Role:</strong>
                    <span style={{ textTransform: 'capitalize' }}>{user.role || "user"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
