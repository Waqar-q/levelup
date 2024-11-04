import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import testImage from "../assets/Web-Development-Course-Thumbnail.jpg";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import Input from "../components/Input_Field";
import Loader from "../components/Loader";
import Dialog from "../components/Dialog";
import Radio from "../components/Radio";
import BottomMenu from "../components/Bottom_Menu";
import defaultDp from "../assets/default_dp.jpg";

const Notifications: React.FC = () => {
  
  const navigate = useNavigate();
  

  if (localStorage.getItem('logged') == 'true'){
    
  return (        
      <section className="notifications">
        <Header page='Notifications'/>
        <ul className="notifications-list">
            <Link to=''><li className="grid grid-cols-[80%_20%] min-h-20 items-center px-5 border-b border-gray-500 cursor-pointer">
                <p className="">This is a notification</p>
                <p className="text-gray-400 text-sm">11:24pm</p>
            </li></Link>

        </ul>
     <BottomMenu/>
      </section>
  );
} else{
  navigate('/login');
  return null;
}
}
export default Notifications;
