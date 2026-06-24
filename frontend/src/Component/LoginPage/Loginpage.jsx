import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  const [currentState, setCurrentState] = useState("signup");
const navigate = useNavigate();
  const url = "https://womendressing-backend.onrender.com";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Register = async () => {
    try {
      const endpoint =
        currentState === "signup"
          ? "/api/auth/register"
          : "/api/auth/login";

      const payload =
        currentState === "signup"
          ? { name, email, password }
          : { email, password };

      const response = await axios.post(url + endpoint, payload, {
        withCredentials: true,
      });

      if (response.data.success) {
        navigate("/")
       
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Register();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo">NYRA</h1>
        <p className="tagline">Fashion that understands you</p>

        {currentState === "signup" ? (
          <div className="form">
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSubmit}>Create Account</button>
          </div>
        ) : (
          <div className="form">
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSubmit}>Login</button>
          </div>
        )}

        <p className="switch" onClick={() => setCurrentState(currentState === "signup" ? "login" : "signup")}>
          {currentState === "signup"
            ? "Already have an account? Login"
            : "New here? Create account"}
        </p>
      </div>
    </div>
  );
};

export default Loginpage;