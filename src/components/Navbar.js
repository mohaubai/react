import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={() => logout()}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => loginWithRedirect()}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
