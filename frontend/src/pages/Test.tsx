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
  const hasOngoingCourses = true;

  useEffect(() => {
    navigate("/explore");
    setLoader(true);
    setTimeout(() => setLoader(false), 1500);
  }, []);

  try{
    const allCourses = fetch(process.env.REACT_APP_BASE_FRONT_URL + "/courses")
  }
  catch(error){
    console.log(error)
  }

  if (loading) {
    return <Loader />;
  }

  if (localStorage.getItem("logged") == "true") {
    return (
      <div className="explore min-h-[100vh] relative">
        <Header />
        <section className="explore-body py-16">
          <p className="font-semibold text-xl py-2 px-3 border-b border-blue-200">
            Hello, {localStorage.getItem("firstName") || "Guest"}
          </p>
          {hasOngoingCourses && (
            <div className="ongoing-courses min-h-[250px]">
              <div className="explore-heading-wrapper">
                <div className="explore-heading">
                  <h2 className="explore-heading-text">My Courses</h2>
                  <i className="material-icons">bookmarks</i>
                </div>
                <Link to="/my-courses" className="">                                                                                                                                                                                            
                  See all
                </Link>
              </div>
              <div className="slider flex min-h-48 overflow-x-scroll">
                <div className="card">
                  <h3 className="title py-4">
                    Web development with Python and Javascript
                  </h3>
                  <div className="progress-bar-wrapper relative  my-4 w-full">
                    <div className="progress h-3 w-2/6 absolute inset-0 bg-gradient-to-t from-secondary to-secondary_light rounded-full"></div>
                    <div className="progress-bar w-full h-3 rounded-full bg-clip-content shadow-inner shadow-gray-300"></div>
                  </div>
                </div>

                <div className="card w-[300px]">
                  <h3 className="title py-4">
                    Web development with Python and Javascript
                  </h3>
                  <div className="progress-bar-wrapper relative my-4 w-full">
                    <div className="progress h-3 w-2/6 absolute inset-0 bg-gradient-to-t from-secondary to-secondary_light rounded-full"></div>
                    <div className="progress-bar w-full h-3 rounded-full bg-clip-content shadow-inner shadow-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="course-categories">
            <div className="explore-heading-wrapper">
              <div className="explore-heading">
                <h2 className="explore-heading-text">Categories</h2>
                <i className="material-icons">category</i>
              </div>
              <Link to="/categories" className="">
                See all
              </Link>
            </div>
            <div className="slider">
              <div className="box w-1/2">
                <h3 className="title py-4">UI/UX</h3>
                <img
                  src="https://indosystem.com/wp-content/uploads/2016/03/uiux.png"
                  className="w-20"
                  alt=""
                />
              </div>

              <div className="box w-1/2">
                <h3 className="title py-4">Database</h3>
                <img
                  src="https://indosystem.com/wp-content/uploads/2016/03/uiux.png"
                  className="w-20"
                  alt=""
                />
              </div>

              <div className="box w-1/2">
                <h3 className="title py-4">Database</h3>
                <img
                  src="https://indosystem.com/wp-content/uploads/2016/03/uiux.png"
                  className="w-20"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="trending">
            <div className="explore-heading-wrapper">
              <div className="explore-heading">
                <h2 className="explore-heading-text">Trending</h2>
                <i className="material-icons">trending_up</i>
              </div>
              <Link to="/trending" className="text-gray-500 last">
                See all
              </Link>
            </div>
            <div className="slider flex min-h-96 overflow-x-scroll">
              <div className="card">
                <img src={testImage} alt="" />
                <div className="flex">
                  <h3 className="title py-2 text-ellipsis line-clamp-2">
                    Web development with Python and Javascript
                  </h3>
                  <div className="rating flex py-2 pl-2 items-center">
                    <p className="font-semibold pr-1">4.9</p>
                    <i className="material-icons text-amber-500">star</i>
                  </div>
                </div>
                <p className="description text-ellipsis line-clamp-3 my-1 text-sm leading-tight">
                  This is a long description of the text that will be placed
                  inside the description of any course describing about it, so
                  take care of all the stuff that you go through and do not make
                  sure anything else.
                </p>
                <div className="flex w-full justify-between">
                  <p className="instructor text-sm my-1 text-gray-500">
                    Raj Kapoor
                  </p>
                  <p className="duration text-sm my-1 text-gray-500">120 Hrs</p>
                </div>
              </div>

              <div className="card">
                <img src={testImage} alt="" />
                <div className="flex">
                  <h3 className="title py-2 text-ellipsis line-clamp-2">
                    Web development with Python and Javascript
                  </h3>
                  <div className="rating flex py-2 pl-2 items-center">
                    <p className="font-semibold pr-1">4.9</p>
                    <i className="material-icons text-amber-500">star</i>
                  </div>
                </div>
                <p className="description text-ellipsis line-clamp-3 my-1 text-sm leading-tight">
                  This is a long description of the text that will be placed
                  inside the description of any course describing about it, so
                  take care of all the stuff that you go through and do not make
                  sure anything else.
                </p>
                <div className="flex w-full justify-between">
                  <p className="instructor text-sm my-1 text-gray-500">
                    Raj Kapoor
                  </p>
                  <p className="duration text-sm my-1 text-gray-500">120 Hrs</p>
                </div>
              </div>
            </div>
          </div>
          <div className="free-courses">
            <div className="explore-heading-wrapper">
              <div className="explore-heading">
                <h2 className="explore-heading-text">Free Courses</h2>
                <i className="material-icons">local_offer</i>
              </div>
              <Link to="/free-courses" className="text-gray-500 last">
                See all
              </Link>
            </div>
            <div className="slider flex min-h-96 overflow-x-scroll">
              <div className="card">
                <img src={testImage} alt="" />
                <div className="flex">
                  <h3 className="title py-2 text-ellipsis line-clamp-2">
                    Web development with Python and Javascript
                  </h3>
                  <div className="rating flex py-2 pl-2 items-center">
                    <p className="font-semibold pr-1">4.9</p>
                    <i className="material-icons text-amber-500">star</i>
                  </div>
                </div>
                <p className="description text-ellipsis line-clamp-3 my-1 text-sm leading-tight">
                  This is a long description of the text that will be placed
                  inside the description of any course describing about it, so
                  take care of all the stuff that you go through and do not make
                  sure anything else.
                </p>
                <div className="flex w-full justify-between">
                  <p className="instructor text-sm my-1 text-gray-500">
                    Raj Kapoor
                  </p>
                  <p className="duration text-sm my-1 text-gray-500">120 Hrs</p>
                </div>
              </div>

              <div className="card">
                <img src={testImage} alt="" />
                <div className="flex">
                  <h3 className="title py-2 text-ellipsis line-clamp-2">
                    Web development with Python and Javascript
                  </h3>
                  <div className="rating flex py-2 pl-2 items-center">
                    <p className="font-semibold pr-1">4.9</p>
                    <i className="material-icons text-amber-500">star</i>
                  </div>
                </div>
                <p className="description text-ellipsis line-clamp-3 my-1 text-sm leading-tight">
                  This is a long description of the text that will be placed
                  inside the description of any course describing about it, so
                  take care of all the stuff that you go through and do not make
                  sure anything else.
                </p>
                <div className="flex w-full justify-between">
                  <p className="instructor text-sm my-1 text-gray-500">
                    Raj Kapoor
                  </p>
                  <p className="duration text-sm my-1 text-gray-500">120 Hrs</p>
                </div>
              </div>
            </div>
          </div>
          <div className="all-courses">
            <div className="explore-heading-wrapper">
              <div className="explore-heading">
                <h2 className="explore-heading-text">All Courses</h2>
                <i className="material-icons">menu_book</i>
              </div>
              <Link to="/courses" className="text-gray-500 last">
                See all
              </Link>
            </div>
            <div className="slider flex min-h-96 overflow-x-scroll">
              <div className="card">
                <img src={testImage} alt="" />
                <div className="flex">
                  <h3 className="title py-2 text-ellipsis line-clamp-2">
                    Web development with Python and Javascript
                  </h3>
                  <div className="rating flex py-2 pl-2 items-center">
                    <p className="font-semibold pr-1">4.9</p>
                    <i className="material-icons text-amber-500">star</i>
                  </div>
                </div>
                <p className="description text-ellipsis line-clamp-3 my-1 text-sm leading-tight">
                  This is a long description of the text that will be placed
                  inside the description of any course describing about it, so
                  take care of all the stuff that you go through and do not make
                  sure anything else.
                </p>
                <div className="flex w-full justify-between">
                  <p className="instructor text-sm my-1 text-gray-500">
                    Raj Kapoor
                  </p>
                  <p className="duration text-sm my-1 text-gray-500">120 Hrs</p>
                </div>
              </div>

              <div className="card">
                <img src={testImage} alt="" />
                <div className="flex">
                  <h3 className="title py-2 text-ellipsis line-clamp-2">
                    Web development with Python and Javascript
                  </h3>
                  <div className="rating flex py-2 pl-2 items-center">
                    <p className="font-semibold pr-1">4.9</p>
                    <i className="material-icons text-amber-500">star</i>
                  </div>
                </div>
                <p className="description text-ellipsis line-clamp-3 my-1 text-sm leading-tight">
                  This is a long description of the text that will be placed
                  inside the description of any course describing about it, so
                  take care of all the stuff that you go through and do not make
                  sure anything else.
                </p>
                <div className="flex w-full justify-between">
                  <p className="instructor text-sm my-1 text-gray-500">
                    Raj Kapoor
                  </p>
                  <p className="duration text-sm my-1 text-gray-500">120 Hrs</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BottomMenu/>
      </div>
    );
  } else {
    navigate("/login");
    return null;
  }
};
export default Explore;
