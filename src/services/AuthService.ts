import axios from "axios";

const BASE_URL = "http://localhost:8080";
const LOGIN_PATH = "/login";
const SIGNUP_PATH = "/signup";

const login = (username: string, password: string) => {
  return axios
    .post(`${BASE_URL}${LOGIN_PATH}`, {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const signup = (name: string, username: string, password: string) => {
  return axios
    .post(`${BASE_URL}${SIGNUP_PATH}`, {
      name,
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const AuthService = {
  login,
  signup,
};

export default AuthService;
