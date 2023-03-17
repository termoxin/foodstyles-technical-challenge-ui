import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import AuthService from "../../services/AuthService";
import "./Signup.css";
import logo from "../../group.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeVerifyPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerifyPassword(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitSignup = async () => {
    if (password !== verifyPassword) {
      setShowError(true);
      return;
    }
    setShowError(false);
    const user = await AuthService.signup(name, email, password);
    if (user) {
      navigate("/login");
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="input-container">
        <img src={logo} alt="logo" height="40" width="32" />
        <div className="text-container">
          <h1>Welcome!</h1>
          <p>Sign up to start using Simpledo today.</p>
        </div>
        <TextField
          className="name input"
          id="outline-name"
          variant="standard"
          label="Name"
          type="text"
          value={name}
          onChange={handleChangeName}
          error={showError}
        />
        <TextField
          className="email input"
          id="outline-email"
          variant="standard"
          label="Username"
          type="text"
          value={email}
          onChange={handleChangeEmail}
          error={showError}
        />
        <TextField
          className="password input"
          id="outline-password"
          variant="standard"
          label="Password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          error={showError}
        />
        <TextField
          className="verify-password input"
          id="outline-verify-password"
          variant="standard"
          label="Verify Password"
          type="password"
          value={verifyPassword}
          onChange={handleChangeVerifyPassword}
          error={showError}
        />
        <div className="login-link">
          <Link to="/login">Already have an account? Go to Login</Link>
        </div>
        <Button
          className="login-button"
          variant="contained"
          onClick={submitSignup}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Signup;
