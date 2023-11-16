import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();
    axios.post("/register", {
        name,
        email,
        password,
    });
  };

  return (
    <div className="grow flex items-center justify-around">
      <div className="-mt-32 w-full max-w-sm md:min-w-md">
        <h2 className="text-4xl text-center mb-2">Register</h2>
        <form onSubmit={registerUser} className="flex flex-col gap-2 mx-auto">
          <input
            type="name"
            className="p-2 border rounded-md"
            placeholder="Enter your name here"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Register
          </button>
        </form>
        <div className="text-gray-500 text-sm mt-2 text-center">
          <span>Already a member? </span>
          <Link className="text-black underline" to="/login">
            Login!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
