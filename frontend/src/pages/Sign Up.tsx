import React from "react";
import Loader from "../components/Loader";
import Input from "../components/Input_Field";
import googleLogo from "../assets/Google-G-logo.png";
import facebookLogo from "../assets/facebook-logo.png";


const Login: React.FC = () => {
    return (
        <section  className="login flex flex-col justify-between p-5 h-[100vh]">
            <div className="heading">
            <h1 className="text-5xl py-5">Sign Up</h1>
            <p className="text-lg">Be a part of revolution in learning.</p>
            </div>
            <form action="" method="post" className="h-2/3 flex flex-col justify-evenly max-h-[600px]">
                <div className="">
                <label htmlFor="email">Email</label>
                <input type="email" name="email"  placeholder="Enter your email address"/>
                </div>
                <div className="">
                <label htmlFor="password">Password</label>
                <input type="password" name="password"  placeholder="Enter your password"/>
                </div>
                <button type="submit" className="mb-5 justify-self-center">Login</button>

                <hr />
                <div className="social-login flex flex-col items-center w-full">
                    <p className="my-4">Other ways to login</p>
                 <div className="flex justify-center w-full">   
                <button className="w-1/2 flex justify-center"><img src={facebookLogo} className="w-6" alt="Facebook Logo"/></button>
                    <button className="w-1/2 flex justify-center"><img src={googleLogo} className="w-6" alt="Google Logo"/></button>
                    </div>
                </div>
            </form>
            <div></div>

        </section>
    )
}

export default Login;