import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <h2>Welcome, {user.name}!</h2>
      ) : (
        <>
          <h1>Welcome to my app!</h1>
          <p>Please login to continue</p>
        </>
      )}
    </div>
  );
};

export default Home;
