import "../css/signup.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://gravitas-backend.up.railway.app/signup", {
        username,
        email,
        password,
      });
      alert(response.data.msg);
      navigate("/login");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Registration failed: " + error.response?.data?.msg);
    }
  };

  return (
    <div className="Signupform-container">
      <form className="Signupform" onSubmit={handleSignup}>
        <h2 className="Signupform-heading">SIGNUP</h2>
        <input
          type="text"
          placeholder="NAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
