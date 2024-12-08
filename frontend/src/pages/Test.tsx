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

interface User {
  id: string;
  last_login: string;
  is_superuser: true;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  phone: string;
  role: string;
  profile_picture: null;
  date_joined: string;
  is_active: boolean;
  is_staff: boolean;
  groups: string[];
  user_permissions: string[];
  courses: string[];
}

export interface Course {
  id: string;
  course_name: string;
  tag_line: string;
  description: string;
  requirements: string;
  duration: number;
  date_of_creation: Date;
  thumbnail: string;
  price: number;
  language: string;
  category: string;
  subcategory: string;
}
export interface CourseCategory {
  id: number;
  category_name: string;
  description: string;
  image: string;
}

const Explore: React.FC = () => {
  const user_id = localStorage.getItem("user_id");
  const [user, setUser] = useState<User>();
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();
  const hasOngoingCourses = true;
  const [courseCategories, setCourseCategories] = useState<CourseCategory[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [freeCourses, setFreeCourses] = useState<Course[]>([]);
  const [trendingCourses, setTrendingCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  useEffect(() => {
    navigate("/explore");
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
    fetchData();
  }, []);

  const fetchData = async () => {
    //Fetching All Courses Data
    try {
      fetch(
        process.env.REACT_APP_BASE_BACK_URL +
          "/api/courses/?format=json&page=1",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Courses: ", data.results);
          setCourses(data.results);
        });

      //Fetching My Courses Data
      fetch(process.env.REACT_APP_BASE_BACK_URL + `/api/users/${user_id}/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User Data: ", data);
          setUser(data);
          return data.courses;
        })
        .then((courses: string[]) => {
          courses.forEach((course) => {
            console.log("Course:", course);
            fetch(
              process.env.REACT_APP_BASE_BACK_URL + `/api/courses/${course}/`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                setMyCourses((myCourses) => [...myCourses, data]);
              });
          });
        });

      //Fetching Free Courses Data
      fetch(
        process.env.REACT_APP_BASE_BACK_URL + "/api/courses/free/?format=json",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Free Courses: ", data.results);
          setFreeCourses(data.results);
        });

      //Fetching Trending Courses Data
      fetch(
        process.env.REACT_APP_BASE_BACK_URL +
          "/api/courses/trending/?format=json",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Trending Courses: ", data.results);
          setTrendingCourses(data.results);
        });

      //Fetching Categories Data
      fetch(
        process.env.REACT_APP_BASE_BACK_URL +
          "/api/course-categories/?format=json",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          const courseCategories = response.json();
          return courseCategories;
        })
        .then((courseCategories) => {
          console.log("Categories:",courseCategories);
          setCourseCategories(courseCategories);
        });
    } catch (error) {
      console.log(error);
    }
  };

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

              {/*--------------------------------------------My Courses---------------------------------*/}

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
                {myCourses.map((course) => (
                  <Link to={`/course/${course.id}`} className="">
                  <div className="card">
                    <h3 className="title py-4 min-h-20">{course.course_name}</h3>
                    <div className="progress-bar-wrapper relative  my-4 w-full">
                      <div className="progress h-3 w-2/6 absolute inset-0 bg-gradient-to-t from-secondary to-secondary_light rounded-full"></div>
                      <div className="progress-bar w-full h-3 rounded-full bg-clip-content shadow-inner shadow-gray-300"></div>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
              {/*------------------------------------------Categories---------------------------------*/}
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
              {courseCategories.map((category) => (
                <div className="box w-1/2">
                  <h3 className="title py-4">{category.category_name}</h3>
                  <img src={category.image}  className="w-20" alt="" />
                </div>
                
              ))}
            </div>
          </div>

              {/*--------------------------------------------Trending Courses---------------------------------*/}
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
              {trendingCourses.map((course) => (
                  <Link to={`/course/${course.id}`} className="">
                <Card key={course.id} course={course} className="h-96"/>
                </Link>
              ))}
            </div>
          </div>

              {/*--------------------------------------------Free Courses---------------------------------*/}

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
              {freeCourses.map((course) => (
                  <Link to={`/course/${course.id}`} className="">
                <Card key={course.id} course={course} className="h-96"/>
                </Link>
              ))}
            </div>
          </div>

              {/*--------------------------------------------All Courses---------------------------------*/}

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
              {courses.map((course) => (
                  <Link to={`/course/${course.id}`} className="">
                <Card key={course.id} course={course} className="h-96"/>
                </Link> 
              ))}
            </div>
          </div>
        </section>
        <BottomMenu />
      </div>
    );
  } else {
    navigate("/login");
    return null;
  }
};
export default Explore;
