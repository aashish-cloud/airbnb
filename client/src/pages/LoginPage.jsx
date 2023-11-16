import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const {setUser} = useContext(UserContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/login", {
        email,
        password,
      });
      alert("Login successful!");
      setUser(data)
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  if (redirect) return <Navigate to={"/"} />

  return (
    <div className="grow flex items-center justify-around">
      <div className="-mt-32 w-full max-w-sm md:min-w-md">
        <h2 className="text-4xl text-center mb-2">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-2 mx-auto">
          <input
            type="email"
            className="p-2 border rounded-md"
            placeholder="Enter your email here"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-2 border rounded-md"
            placeholder="Enter your password here"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 border rounded-md text-white bg-primary"
          >
            Login
          </button>
        </form>
        <div className="text-gray-500 text-sm mt-2 text-center">
          <span>Don't have an account? </span>
          <Link className="text-black underline" to="/register">
            Register now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
