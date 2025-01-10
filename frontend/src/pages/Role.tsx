import React, { useEffect, useState } from "react";
import student from "../assets/student.png"
import instructor from "../assets/instructor.png"
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import getCookie from "../utilities/getCookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Role: React.FC = () => {

  const navigate = useNavigate()
  const user_id = localStorage.getItem("user_id")
  const csrftoken = getCookie('csrftoken'); 


  const handleClick = async (role: string) => {
    
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + `/api/users/${user_id}/`,
        {
          method: "PATCH",
          body:JSON.stringify({"role":role}),
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
        localStorage.setItem('role', data.role);      
        navigate('/explore')
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="role ">
      <ToastContainer/>
        <Header className="z-[999]" page="Select role"/>
        <div className="flex flex-col xl:flex-row justify-center items-center gap-12 h-[100vh] z-50">
        <button name="student" className="student w-2/3 xl:w-1/4 flex flex-col items-center gap-4" onClick={(e) => handleClick(e.currentTarget.name)}>
            <p className="text-2xl">Student</p>
            <img className="w-2/3" src={student} alt="" />
        </button>
        <button name='instructor' className="instructor w-2/3 xl:w-1/4 flex flex-col items-center gap-4" onClick={(e) => handleClick(e.currentTarget.name)}>
            <p className="text-2xl">Instructor</p>
            <img className="w-2/3" src={instructor} alt="" />
        </button>
        </div>
    </div>
  )
};

export default Role;
