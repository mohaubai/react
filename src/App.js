import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar"; // import Navbar component
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "./auth0-variables";
import axios from "axios";

axios.interceptors.request.use(config => {
  config.withCredentials = true;
  config.headers["SameSite"] = "None";
  config.headers["Secure"] = true;
  return config;
});

function App() {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <Router>
        <Navbar /> {/* Add the Navbar component */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
