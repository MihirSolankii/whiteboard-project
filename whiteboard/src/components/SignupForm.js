import React, { useState } from "react";
import "./SignupForm.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";

// You can replace the following with any image you

function SignupForm() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("User created successfully:", data);
        // Reset form data after successful signup
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
      } else {
        // Handle error response from backend
        console.error("Signup failed:", data.message);
        setErrors(data.errors || {});
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 500);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
    navigate("/")
  };

  return (
    <div className="signup-container">
      <div className={`signup-form ${shake ? "shake" : ""}`}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
