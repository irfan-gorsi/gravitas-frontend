import "../css/login.css"; 
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode";  // Import jwtDecode

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gravitas-backend.up.railway.app/login",
        { email, password },
        { withCredentials: true }
      );

      // Store token in localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Decode the token to get the user role
      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      setEmail("");
      setPassword("");
      alert(response.data.msg);

      // Redirect based on role
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert("Login failed: " + error.response?.data?.msg);
    }
  };

  return (
    <div className="Loginform-container">
      <form className="Loginform" onSubmit={handleLogin}>
        <h2 >LOGIN</h2>
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">LOGIN</button>
        <p>
          Don't have an account? <Link to="/">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
