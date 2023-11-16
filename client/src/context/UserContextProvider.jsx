import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({data}) => {
        setUser(data);
        setLoading(false)
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
