import React, { useRef, useState } from "react";
import Loader from "../components/Loader";
import Input from "../components/Input_Field";
import googleLogo from "../assets/Google-G-logo.png";
import facebookLogo from "../assets/facebook-logo.png";
import { Form, Navigate, useNavigate } from "react-router-dom";
import getCookie from "../utilities/getCookie";

const Login: React.FC = () => {
  const csrftoken = getCookie("csrftoken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_BASE_FRONT_URL);
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/api-auth/login/",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        console.log(data);
        if (data["message"] === "Successfull") {
          console.log("Hogya Login");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="login flex flex-col justify-between p-5 h-[100vh]">
      <div className="heading">
        <h1 className="text-5xl py-5">Login</h1>
        <p className="text-lg">Enter the new era of learning.</p>
      </div>
      <form
        onSubmit={handleLogin}
        method="get"
        className="h-2/3 flex flex-col justify-evenly max-h-[600px]"
      >
        <div className="">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
            placeholder="Enter your email address"
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="mb-5 justify-self-center">
          Login
        </button>

        <hr />
        <div className="social-login flex flex-col items-center w-full">
          <p className="my-4">Other ways to login</p>
          <div className="flex justify-center w-full">
            <button className="w-1/2 flex justify-center">
              <img src={facebookLogo} className="w-6" alt="Facebook Logo" />
            </button>
            <button className="w-1/2 flex justify-center">
              <img src={googleLogo} className="w-6" alt="Google Logo" />
            </button>
          </div>
        </div>
      </form>
      <div></div>
    </section>
  );
};

export default Login;
