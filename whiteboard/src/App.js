import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/WhiteBoard/WhiteBoard";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to check if user is logged in
  const isLoggedIn = () => {
    // Your logic to determine if the user is logged in
    // For example, you can check if there is a token in localStorage
    return loggedIn;
  };

  // Function to handle signup
  const handleSignup = () => {
    setLoggedIn(true); // Update the loggedIn state to true upon signup
  };

  return { loggedIn, setLoggedIn, isLoggedIn, handleSignup };
}

function App() {
  const { loggedIn, isLoggedIn, handleSignup } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/signup"
        element={<LoginForm handleSignup={handleSignup} />}
      />
     <Route path="/login" element={<SignupForm/>}></Route>
    </Routes>
  );
}

export default App;
