import React, { useRef, useState } from "react";
import Loader from "../components/Loader";
import Input from "../components/Input_Field";
import googleLogo from "../assets/Google-G-logo.png";
import facebookLogo from "../assets/facebook-logo.png";
import { Form, Link, Navigate, redirect, useNavigate } from "react-router-dom";
import getCookie from "../utilities/getCookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';


const Signup: React.FC = () => {
  const csrftoken = getCookie("csrftoken");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    'id': '',
    'firstName': '',
    'lastName': '',
    'fullName': '',
    'email': '',
    'age': '',
    'gender': '',
    'phone': '',
    'logged': false,
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name:"",
    last_name:"",
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/auth/signup/",
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

          toast.success("You have been successfully logged in.")
          setUser({
            ...user,
            'id': data['user_id'],
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'fullName': data['fullName'],
            'email': data['email'],
            'age': data['age'],
            'gender': data['gender'],
            'phone': data['phone'],
            'logged': true,
          });
          
          localStorage.setItem('logged', 'true');
          localStorage.setItem('user_id', data['user_id']);
          localStorage.setItem('firstName', data['firstName']);
          localStorage.setItem('lastName', data['lastName']);
          localStorage.setItem('email', data['email']);
          localStorage.setItem('age', data['age']);
          localStorage.setItem('gender', data['gender']);
          localStorage.setItem('phone', data['phone']);          
          navigate('/role')
        }
        else{
          localStorage.setItem('logged', 'false');
          toast.error("Something went wrong.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

const handleGoogleLoginSuccess = async (credentialResponse: any) => {
  const {credential} = credentialResponse;
  const accessToken: string = credential;

  try {
    const response = await fetch(process.env.REACT_APP_BASE_FRONT_URL + "/api/auth/google-login/",{
      method:"POST",
      body: JSON.stringify({
        token: accessToken,
      }),
      headers:{
        "Content-Type": 'application/json',
        "X-CSRFToken": csrftoken,
      },
      credentials: 'include',
    })
    const data: {[key: string]: string} = await response.json();
    if(!response.ok){throw console.error("Response is not OK");
    }
    else if (data['login status'] === 'true'){
      toast.success("You have been successfully logged in.")
          setUser({
            ...user,
            'id': data['user_id'],
            'email': data['email'],
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'gender': data['gender'],
            'age': data['age'],
            'phone': data['phone'],
            'logged': true,
          });
          
          localStorage.setItem('logged', 'true');
          localStorage.setItem('user_id', data['user_id']);
          localStorage.setItem('email', data['email']);
          localStorage.setItem('firstName', data['firstName']);
          localStorage.setItem('lastName', data['lastName']);
          localStorage.setItem('gender', data['gender']);
          localStorage.setItem('age', data['age']);
          localStorage.setItem('phone', data['phone']);
          
          navigate("role")
    }
  }
  catch(error){
    console.error(error)
  }
}

const handleGoogleLoginFailure = () => {

}

const handleFacebookLogin = async () => {
  window.FB.login(async (response: any) => {
    if (response.authResponse){
      console.log("Login successful", response.authResponse.accessToken)
      const accessToken = response.authResponse.accessToken;

      try{
        const backend_response = await fetch(process.env.REACT_APP_BASE_FRONT_URL + "/api/auth/facebook-login/",{
          method: "POST",
          body: JSON.stringify({
            'fb-token': accessToken,
          }),
          headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
          },
          credentials: 'include',
                  })
        
          if (!backend_response.ok){
            console.log("Response is not OK", backend_response)
          }
          else{
            const data = await backend_response.json()
            console.log(data)
            navigate("/role");
          }
        }
        catch(error){
          console.error(error);
          
        }
      }
    else {
      console.log("Login response invalid")
    }
  }, {scope: 'email,public_profile'});
}


  return (
    <section className="login flex flex-col justify-between p-5 h-[100vh]">
      <ToastContainer/>
      <div className="heading">
        <h1 className="text-5xl py-5">Signup</h1>
        <p className="text-lg">Join a community of learners</p>
      </div>
      <form
        onSubmit={handleSignup}
        method="get"
        className="h-2/3 flex flex-col justify-evenly max-h-[600px]"
      >
        <label htmlFor="first_name">First Name</label>
        <input
            type="text"
            onChange={handleChange}
            name="first_name"
            value={formData.first_name}
            placeholder="Enter your first name"
          />
        <label htmlFor="last_name">Last Name</label>
        <input
            type="text"
            onChange={handleChange}
            name="last_name"
            value={formData.last_name}
            placeholder="Enter your last name"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
            placeholder="Enter your email address"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            placeholder="Enter your password"
          />
        <button type="submit" className="mb-5 justify-self-center">
        Sign Up
        </button>
      </form>
      <hr />
        <div className="social-login flex flex-col items-center w-full">
          <p className="my-4">Other ways to <Link className="underline" to='/login'>login</Link> or sign up</p>
          <div className="flex justify-center w-full">
            <button type="button" className="w-1/2 flex justify-center" onClick={handleFacebookLogin}>
              <img src={facebookLogo} className="w-6" alt="Facebook Logo" />
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
      <div></div>
    </section>
  );
};

export default Signup;
