import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  IconButton,
  TextField,
  InputAdornment,
  Button,
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { setCookie } from "../../utils/cookie-handler";
import { TOKEN } from "../../utils/constants";
import AuthService from "../../services/AuthService";
import UserContext from "../../context/UserContext";

import logo from "../../group.svg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submitLogin = async () => {
    setShowError(false);
    const accessToken = await AuthService.login(email, password);
    if (accessToken) {
      user.updateToken(accessToken);
      setCookie(TOKEN, accessToken);
      navigate("/home");
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="input-container">
        <img src={logo} alt="logo" height="40" width="32" />
        <div className="text-container">
          <h2>Welcome back!</h2>
          <p>Log in to continue.</p>
        </div>
        <div className="form-container">
          <TextField
            className="email input"
            id="outline-email"
            label="Username"
            value={email}
            variant="standard"
            onChange={handleChangeEmail}
            error={showError}
          />
          <FormControl className="password input" variant="outlined">
            <InputLabel
              style={{ left: -13 }}
              error={showError}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <Input
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChangePassword}
              error={showError}
              endAdornment={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <InputAdornment position="end">
                  <IconButton
                    aria-label={"toggle password visibility"}
                    onClick={handleClickShowPassword}
                    edge={"end"}
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className="signup-link">
            <Link to="/signup">Don’t have an account? Sign up.</Link>
          </div>
          <Button
            className="login-button"
            variant="contained"
            onClick={submitLogin}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
