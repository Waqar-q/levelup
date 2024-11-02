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

const Explore: React.FC = () => {
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    navigate('/explore');
    setLoader(true)
    setTimeout(() => setLoader(false), 1500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (localStorage.getItem('logged') == 'true'){
    
  return (  
    <div className="explore min-h-[100vh] relative">
      <Header />
  
      <section className="explore-body p-5">
        <p className="font-semibold text-2xl">Hello, {localStorage.getItem('firstName')}</p>
        
      </section>
      <BottomMenu/>
    </div>
  );
} else{
  navigate('/login');
  return null;
}
}
export default Explore;
