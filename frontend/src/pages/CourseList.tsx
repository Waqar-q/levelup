import React, { ReactElement, useEffect, useRef } from "react";
import { useState } from "react";
import Header from "../components/Header";
import BottomMenu from "../components/Bottom_Menu";
import { Course, User } from "./Test";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Card from "../components/Card";

const CourseList: React.FC = () => {
  const [searchParameters] = useSearchParams();
  const category = searchParameters.get("category");
  const filter = searchParameters.get("filter");
  const [searchQuery, setSearchQuery] = useState("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [nextCourses, setNextCourses] = useState(null);
  const [previousCourses, setPreviousCourses] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState<Course>();
  const [instructor, setInstructor] = useState<User>();
  const navigate = useNavigate();

  const [filterBy, setFilterBy] = useState(filter ? filter + "/" : "");

  useEffect(() => {
    fetchCourses();
  }, [filterBy, searchQuery, category]);

  const fetchCourses = async (url?: string) => {
    //Fetching All Courses Data
    try {
      fetch(
        url ||
          process.env.REACT_APP_BASE_BACK_URL +
            `/api/courses/${filterBy}?format=json&category=${
              category || ""
            }&query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setCourses(data.results);
          setNextCourses(data.next);
          setPreviousCourses(data.previous);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInstructor = (course: Course) => {
    fetch(
      process.env.REACT_APP_BASE_BACK_URL + `/api/users/${course.instructor}/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((instructor_data) => {
        setInstructor(instructor_data);
      });
  };

  const handleSelection = (
    e: MouseEvent<HTMLAnchorElement>,
    course_id: string
  ) => {
    const tempCourse = courses.find((course) => course.id == course_id);
    setSelectedCourse(tempCourse);
    if (tempCourse) {
      fetchInstructor(tempCourse);
    }
  };

  return (
    <section className="course-list">
      <Header page="Courses" className="bg-light z-[999]" />
      <div className="search-wrapper relative pt-20 flex xl:w-1/2 justify-self-center px-5 pb-3">
        <input
          type="text"
          className="search-bar xl:max-w-full"
          placeholder="Search"
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.currentTarget.value.length != 0) {
              setFilterBy("search/");
            }
          }}
          value={searchQuery}
          autoFocus={true}
        />
        <i className="absolute right-8 bottom-[15%] text-4xl material-icons text-gray-300">
          search
        </i>
      </div>

      <div className="filter-bar px-4 py-2">
        <button
          onClick={() => {
            setFilterBy("");
          }}
          className={`${
            filterBy == "" ? "bg-accent_light text-light" : "bg-none"
          } border-accent_light text-dark h-min text-md px-4 py-1`}
        >
          All
        </button>
        <button
          onClick={() => {
            setFilterBy("trending/");
          }}
          className={`${
            filterBy == "trending/" ? "bg-accent_light text-light" : "bg-none"
          } border-accent_light text-dark h-min text-md px-4 py-1`}
        >
          Trending
        </button>
        <button
          onClick={() => {
            setFilterBy("free/");
          }}
          className={`${
            filterBy == "free/" ? "bg-accent_light text-light" : "bg-none"
          } border-accent_light text-dark h-min text-md px-4 py-1`}
        >
          Free
        </button>
      </div>
      <div className="pagination py-2 xl:py-5 flex place-content-center">
        {previousCourses ? (
          <button
            className="previous flex items-center pr-2 py-0 px-0 bg-none border-accent_light rounded-lg text-dark place-content-center"
            onClick={() => {
              fetchCourses(previousCourses);
            }}
          >
            <i className="material-icons text-2xl">arrow_left</i>Previous
          </button>
        ) : null}
        {nextCourses ? (
          <button
            className="next flex items-center pl-2 py-0 px-0 bg-none border-accent_light rounded-lg text-dark place-content-center"
            onClick={() => {
              fetchCourses(nextCourses);
            }}
          >
            Next<i className="material-icons text-2xl">arrow_right</i>
          </button>
        ) : null}
      </div>
      <div className="list xl:grid grid-cols-3 gap-5 xl:mx-10">
        {courses &&
          courses.map((course) => (
            <>
              <Link to={`/course/${course.id}`} className="hidden xl:flex justify-center  ">
                <Card key={course.id} course={course} className="h-96" />
              </Link>
            <a
              className="border-b p-5 xl:hidden flex justify-between focus:bg-gray-300"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/course/${course.id}`);
              }}
            >
              <div className="flex flex-col">
                <h3 className="title text-ellipsis line-clamp-2 h-min pr-2">
                  {course.course_name}
                </h3>
                <div className="tagline flex items-center relative">
                  <p className="tagline text-sm italic text-gray-800">
                    {course.tag_line}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rating flex px-2 w-min items-center rounded-md h-7 bg-amber-500 text-light text-[14px]">
                    <p className="font-semibold pt-1 pr-1">4.9</p>
                    <i className="material-icons text-[18px]">star</i>
                  </div>
                  <div className="duration flex text-sm my-2 text-gray-500 items-center">
                    <p>{course.duration} Hrs</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex price w-min my-3 bg-accent_light rounded-md font-bold text-white px-3 py-1 items-center">
                  <i className="material-icons-outlined text-md">
                    currency_rupee
                  </i>
                  <p className="text-xl">{course.price}</p>
                </div>
                <div className="views flex py-1 pl-2 items-center justify-end text-sm text-gray-500">
                  <p className="pr-1">{course.views}</p>
                  <i className="material-icons-outlined text-accent">
                    visibility
                  </i>
                </div>
              </div>
            </a>
            </>
          ))}
        
      </div>
      <div className="pagination py-2 flex place-content-center">
          {previousCourses ? (
            <button
              className="previous flex items-center pr-2 py-0 px-0 bg-none border-accent_light rounded-lg text-dark place-content-center"
              onClick={() => {
                fetchCourses(previousCourses);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <i className="material-icons text-2xl">arrow_left</i>Previous
            </button>
          ) : null}
          {nextCourses ? (
            <button
              className="next flex items-center pl-2 py-0 px-0 bg-none border-accent_light rounded-lg text-dark place-content-center"
              onClick={() => {
                fetchCourses(nextCourses);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Next<i className="material-icons text-2xl">arrow_right</i>
            </button>
          ) : null}
        </div>
        <div className="spacer h-16"></div>
      <BottomMenu />
    </section>
  );
};

export default CourseList;
