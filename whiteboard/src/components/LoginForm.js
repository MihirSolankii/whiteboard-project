import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Import your CSS file for styling

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful");
        // Redirect or navigate to another page
      } else if (response.status === 404) {
        // User not found, redirect to signup
        navigate("/signup");
      } else {
        console.error("Login failed:", response.statusText);
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
    }
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>
            Don't have an account? <a href="/login">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
