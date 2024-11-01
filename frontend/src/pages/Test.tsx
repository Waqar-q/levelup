import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    console.log('in use effect')
    setLoader(true)
    setTimeout(() => setLoader(false), 1500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="explore min-h-[100vh] relative">
      <Header />
  
      <section className="explore-body p-5">
        <p>Hello, {localStorage.getItem('fullName')}</p>
        
      </section>
      <BottomMenu/>
    </div>
  );
};

export default Explore;
