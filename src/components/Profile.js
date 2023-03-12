import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();

  // Extract user's email name
  const emailName = user.email.split("@")[0];

  // Construct formatted name
  const name = `${emailName.charAt(0).toUpperCase()}${emailName.slice(1)}`;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
