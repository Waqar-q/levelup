import React, { useRef, useState } from "react";
import Loader from "../components/Loader";
import Input from "../components/Input_Field";
import googleLogo from "../assets/Google-G-logo.png";
import facebookLogo from "../assets/facebook-logo.png";
import loginImage from "../assets/login_image.jpg";
import { Form, Link, Navigate, redirect, useNavigate } from "react-router-dom";
import getCookie from "../utilities/getCookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import Logo from "../components/Logo";

const Login: React.FC = () => {
  const csrftoken = getCookie("csrftoken");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    logged: false,
  });

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

    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/auth/login/",
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
        if (data["message"] === "Successful") {
          toast.success("You have been successfully logged in.");
          setUser({
            ...user,
            id: data["user_id"],
            firstName: data["firstName"],
            lastName: data["lastName"],
            fullName: data["fullName"],
            email: data["email"],
            age: data["age"],
            gender: data["gender"],
            phone: data["phone"],
            logged: true,
          });

          localStorage.setItem("logged", "true");
          localStorage.setItem("user_id", data["user_id"]);
          localStorage.setItem("firstName", data["firstName"]);
          localStorage.setItem("lastName", data["lastName"]);
          localStorage.setItem("email", data["email"]);
          localStorage.setItem("age", data["age"]);
          localStorage.setItem("gender", data["gender"]);
          localStorage.setItem("phone", data["phone"]);
          setTimeout(() => navigate("/explore"), 500);
        } else if (data["redirect"] === "signup") {
          localStorage.setItem("logged", "false");
          toast.error(data["message"]);
          navigate("/signup");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    const { credential } = credentialResponse;
    const accessToken: string = credential;

    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/auth/google-login/",
        {
          method: "POST",
          body: JSON.stringify({
            token: accessToken,
          }),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
        }
      );
      const data: { [key: string]: string } = await response.json();
      if (!response.ok) {
        throw console.error("Response is not OK");
      } else if (data["login status"] === "true") {
        toast.success("You have been successfully logged in.");
        setUser({
          ...user,
          id: data["user_id"],
          email: data["email"],
          firstName: data["firstName"],
          lastName: data["lastName"],
          gender: data["gender"],
          age: data["age"],
          phone: data["phone"],
          logged: true,
        });

        localStorage.setItem("logged", "true");
        localStorage.setItem("user_id", data["user_id"]);
        localStorage.setItem("email", data["email"]);
        localStorage.setItem("firstName", data["firstName"]);
        localStorage.setItem("lastName", data["lastName"]);
        localStorage.setItem("gender", data["gender"]);
        localStorage.setItem("age", data["age"]);
        localStorage.setItem("phone", data["phone"]);

        setTimeout(() => navigate(-1), 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLoginFailure = () => {};

  const handleFacebookLogin = async () => {
    window.FB.login(
      async (response: any) => {
        if (response.authResponse) {
          console.log("Login successful", response.authResponse.accessToken);
          const accessToken = response.authResponse.accessToken;

          try {
            const backend_response = await fetch(
              process.env.REACT_APP_BASE_FRONT_URL +
                "/api/auth/facebook-login/",
              {
                method: "POST",
                body: JSON.stringify({
                  "fb-token": accessToken,
                }),
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": csrftoken,
                },
                credentials: "include",
              }
            );

            if (!backend_response.ok) {
              console.log("Response is not OK", backend_response);
            } else {
              const data = await backend_response.json();
              console.log(data);
              navigate(-1);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("Login response invalid");
        }
      },
      { scope: "email,public_profile" }
    );
  };

  return (
    <section className="login flex flex-col justify-between items-center xl:flex-row xl:p-0  p-5 h-[100vh] overflow-clip">
      
      <img src={loginImage} alt="" className="hidden xl:flex h-[150%] justify-self-start max-w-screen-lg "/>
      <span className="absolute xl:top-10 top-5 right-5 xl:right-[55%] xl:bg-transparent bg-white rounded-lg xl:rounded-none">
      <Logo className="xl:w-28 w-20"/></span>
      <ToastContainer />
      <div className=" py-10 xl:px-40 flex flex-col justify-between items-start h-full">
      <div className="heading flex-col justify-between">
        <h1 className="text-5xl py-5">Login</h1>
        <p className="text-lg">Enter the new era of learning.</p>
      </div>
      <form
        onSubmit={handleLogin}
        method="get"
        className="h-2/3 flex flex-col justify-evenly max-h-[600px]"
      >
        <div className="flex flex-col">
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
        <button type="submit" className="mb-5 justify-self-center max-w-96">
          Login
        </button>
      </form>
      <hr />
      <div className="social-login flex flex-col items-center w-full">
        <p className="my-4">
          Other ways to login or{" "}
          <Link className="underline" to="/signup">
            signup
          </Link>
        </p>
        <div className="flex justify-center w-full">
          <button
            type="button"
            className="w-1/2 flex justify-center items-center bg-none bg-white h-10 border-none text-gray-600 font-normal text-[12px]"
            onClick={handleFacebookLogin}
          >
            <img src={facebookLogo} className="w-6 mx-1" alt="Facebook Logo" />
            Sign in with Facebook
          </button>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            type="standard"
            theme="outline"
            size="large"
            text="signin_with"
            shape="pill"
            logo_alignment="center"
            width="100%"
          />
        </div>
      </div>
      </div>
      <div className="xl:hidden"></div>
    </section>
  );
};

export default Login;
