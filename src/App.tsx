import React, { useState, useEffect, useContext } from "react";
import { CookiesProvider } from "react-cookie";
import { HashRouter as Router } from "react-router-dom";
import UserContext from "./context/UserContext";
import { getCookie } from "./utils/cookie-handler";
import { TOKEN } from "./utils/constants";
import Routes from "./Routes";
import "./App.css";

const App = () => {
  const [, setIsLogged] = useState(false);
  const [, setShowMenu] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    if (getCookie(TOKEN)) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      setShowMenu(false);
    }
  }, [user, getCookie(TOKEN)]);

  return (
    <CookiesProvider>
      <Router>
        <div className="content">
          <Routes />
        </div>
      </Router>
    </CookiesProvider>
  );
};

export default App;
