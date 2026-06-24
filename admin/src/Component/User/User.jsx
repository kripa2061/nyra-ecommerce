import React, { useEffect, useState } from "react";
import axios from "axios";
import './User.css'
const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://womendressing-backend.onrender.com/api/auth/getUser");

      // backend: { success: true, data: [...] }
      setUsers(res.data.data || []);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
  <div className="user-page">
    <h2>User List</h2>

    {users.length === 0 ? (
      <p className="empty-text">No users found</p>
    ) : (
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default User;