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

const Explore: React.FC = () => {
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    window.onload = () => setLoader(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="explore">
      <Header />
      
      <section className="explore-body p-5">
        <p>Explore</p>
        <Dialog>
      </Dialog>
        <Link to="/login">
          <button>Go to login</button>
        </Link>
        <Button value="Button" />
        <Card
          imgsrc={testImage}
          title="Web Development Course"
          description="Web development courses teach students how to create, maintain, and build websites and web applications. They can include topics such as: 
            Programming languages: Students learn how to use programming languages like HTML, CSS, and JavaScript to create websites. 
            Content management systems: Students learn how to use content management systems (CMS) like WordPress, Drupal, and Joomla! to build websites. 
            Database management: Students learn how to manage databases. 
            Web design: Students learn how to design the features and functionality of websites. 
            Front-end and back-end development: Students learn how to develop both the front-end and back-end of websites. 
            User experience: Students learn how to create a personalized user experience for their websites. 
            Data collection: Students learn how to collect data from webpages and incorporate it into their own websites. 
            Security: Students learn how to secure themselves from unwanted data collection and how to secure a domain name. 
            Accessibility: Students learn how to make their websites accessible to a wide range of users. "
          buttonName="Apply"
        />
        <Checkbox value="Tick this checkbox" />
        <Dropdown options={["India", "Africa"]} />

        <Input fieldType="text" placeholder="Waqar" />
        <Input fieldType="password" />
        <Input fieldType="email" />
        <Input fieldType="number" />
        <Input fieldType="tel" />
        <Input fieldType="url" />
        <Input fieldType="search" />
        <Input fieldType="date" />
        <Input fieldType="time" />
        <Input fieldType="datetime-local" />
        <Input fieldType="month" />
        <Input fieldType="week" />
        <Input fieldType="color" />
        <Input fieldType="file" />
        <Input fieldType="checkbox" />
        <Input fieldType="radio" />
        <Input fieldType="range" />
        <Input fieldType="hidden" />
      </section>
    </div>
  );
};

export default Explore;
