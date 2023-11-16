import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import PlacesPage from "./PlacesPage";

const ProfilePage = () => {
  const { user, isLoading, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");

  const logout = () => {
    axios.post("/logout");
    setRedirect("/");
  };

  if (redirect) {
    setUser(null);
    return <Navigate to={redirect} />;
  }

  if (!user && isLoading) return "loading...";
  if (!user) return <Navigate to={"/login"} />;

  return (
    <div>
      <AccountNav />
      <div className="text-center mx-auto max-w-md">
        <p>
          Logged in as {user.name} ({user.email})
        </p>
        <button
          onClick={logout}
          className="bg-primary w-full text-white py-2 rounded-full mt-2"
        >
          Logout
        </button>
      </div>

      {/* {subpage === "places" && <PlacesPage />} */}
    </div>
  );
};

export default ProfilePage;
