import React, { useEffect, useState } from "react";
import student from "../assets/student.png"
import instructor from "../assets/instructor.png"
import Header from "../components/Header";


const Role: React.FC = () => {
  return (
    <div className="role ">
        <Header page="Select role"/>
        <div className="flex flex-col justify-center items-center gap-12 h-[100vh]">
        <button className="student w-2/3 flex flex-col items-center gap-4">
            <p className="text-2xl">Student</p>
            <img className="w-2/3" src={student} alt="" />
        </button>
        <button className="instructor w-2/3 flex flex-col items-center gap-4">
            <p className="text-2xl">Instructor</p>
            <img className="w-2/3" src={instructor} alt="" />
        </button>
        </div>
    </div>
  )
};

export default Role;
