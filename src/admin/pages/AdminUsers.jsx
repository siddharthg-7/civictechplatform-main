import { useEffect, useState } from "react";
import "../styles/admin.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import userIcon from "../../assets/images/icons/user.png";

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
      <Navbar role="admin" />

      <div className="admin-body">
        <Sidebar role="admin" />

        <div className="admin-content">
          <h2>Logged Users</h2>

          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users have registered yet.</p>
          ) : (
            <div className="admin-complaints-grid">
              {users.map((user) => (
                <div className="admin-card" key={user.id}>
                  <div className="admin-row">
                    <img
                      src={userIcon}
                      alt="user"
                      className="admin-user-icon"
                    />
                    <strong>{user.name}</strong>
                  </div>

                  <div className="admin-row">
                    <span>Email:</span>
                    <span>{user.email}</span>
                  </div>

                  <div className="admin-row">
                    <span>Phone:</span>
                    <span>{user.phone || "N/A"}</span>
                  </div>

                  <div className="admin-row">
                    <span>Status:</span>
                    <span
                      className={
                        user.status === "online"
                          ? "online"
                          : ""
                      }
                    >
                      {user.status || "offline"}
                    </span>
                  </div>

                  <div className="admin-row">
                    <span>Role:</span>
                    <span>{user.role || "user"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
