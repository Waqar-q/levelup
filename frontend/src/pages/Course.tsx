import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import Input from "../components/Input_Field";
import googleLogo from "../assets/Google-G-logo.png";
import facebookLogo from "../assets/facebook-logo.png";
import { Course, CourseCategory, User } from "./Test";
import { Link, useFetcher, useParams } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import { toast } from "react-toastify";
import getCookie from "../utilities/getCookie";

const CoursePage: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [course, setCourse] = useState<Course>();
  const [courseState, setCourseState] = useState<Course>();
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const { id } = useParams<{ id: string }>();
  const [thumbnail, setThumbnail] = useState(new Image());
  const user_id = localStorage.getItem("user_id");
  const csrftoken = getCookie("csrftoken");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isEnrolled, setEnrolled] = useState(false);
  const [isOwner, setIsOwner] = useState(false);


  const [fieldEdit, setFieldEdit] = useState({
    course_name: false,
    tag_line: false,
    language: false,
    price: false,
    description: false,
    requirements: false,
  });


  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    try {
      /* Fetching THE Course*/
      fetch(process.env.REACT_APP_BASE_BACK_URL + `/api/courses/${id}/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          setCourse(data);
          return data;
        })
        .then((course) => {
          thumbnail.src = course.thumbnail;
          if (course.instructor == user_id){
            setIsOwner(true);
          }

          {
            /*Assigning course values to state variables*/
          }
          setCourseState(course);

          {
            /* Fetching Related Courses*/
          }
          fetch(
            process.env.REACT_APP_BASE_BACK_URL +
              `/api/courses/related/?category=${course.category}`,
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
            .then((data) => {
              console.log("Related Courses:", data);
              setRelatedCourses(data.results);
            });
        
        /* Fetching User Data*/
        fetch(
          process.env.REACT_APP_BASE_BACK_URL +
            `/api/users/${user_id}/`,
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
          .then((user) => {
            console.log("User:", user);
            setUser(user);
            if (user.courses.includes(id))
            {setEnrolled(true);}
          });

          });
      
    } catch (error) {
      console.log(error);
    }
  };

  const editClick = (field: string) => {
    setFieldEdit({
      course_name: false,
      tag_line: false,
      language: false,
      price: false,
      description: false,
      requirements: false,
      [field]: true,
    });
  };

  const tickClick = async (pname: string, value: string) => {
    try {
      console.log("stringify:", JSON.stringify({ [pname]: value }));

      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/courses/" + id + "/",
        {
          method: "PATCH",
          body: JSON.stringify({ [pname]: value }),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFieldEdit({ ...fieldEdit, [pname]: false });
        toast.success("Saved.");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to update course. Please try again.");
      console.error(error);
    }
  };

  const toggleEnrollDialog = () => {
    
    if (dialogRef.current?.open){
      document.body.classList.remove('no-scroll');
        dialogRef.current?.close();}

    else {
      document.body.classList.add('no-scroll');
        dialogRef.current?.showModal()};
  }

  const enroll =async (id: string | undefined) => {
    try{
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/users/enroll/?id=" + id,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: 'include',
      })
      
      if(!response.ok){
        toast.error("Something went wrong.")
        throw new Error("Enroll response not OK.")
      }
      else{
        const data = await response.json()
        console.log("Enroll:",data)
        toggleEnrollDialog()
        
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <section className="course-page">
      {course && (
        <>
          <Header
            page="Course"
            className="z-[900]"
            options={[
              { name: "Edit", link: `/edit/?course=${course.id}` },
              { name: "Delete", link: `/delete/?course=${course.id}` },
            ]}
          />
          <div className="pb-16">
            <div
              className="course-page-thumbnail w-full relative"
              style={{
                backgroundImage: `url(${course.thumbnail})`,
                backgroundAttachment: "fixed",
                backgroundSize: "contain",
                backgroundPosition: "top",
                backgroundOrigin: "content-box",
                backgroundRepeat: "no-repeat",
                minHeight: `${thumbnail.height - 40}px`,
              }}
            ></div>
            <div className="course-content p-5">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  {fieldEdit.course_name ? (
                    <div className="course-name flex items-center relative">
                      <input
                        name="course_name"
                        className="font-semibold text-xl text-dark"
                        autoFocus
                        type="text"
                        onChange={(e) =>
                          setCourseState({
                            ...course,
                            [e.currentTarget.name]: e.target.value,
                          })
                        }
                        value={courseState?.course_name}
                      />
                      <span>
                        <button
                          className="tick-button"
                          onClick={(e) =>
                            tickClick(
                              e.currentTarget
                                .closest(".course-name")
                                ?.querySelector("input")?.name || "",
                              e.currentTarget
                                .closest(".course-name")
                                ?.querySelector("input")?.value || ""
                            )
                          }
                        >
                          <i className="material-icons text-green-500">check</i>
                        </button>
                      </span>
                      <span>
                        <button
                          className="close-button"
                          onClick={(e) => editClick("")}
                        >
                          <i className="material-icons text-red-500">close</i>
                        </button>
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center relative">
                      <h2 className="title py-2 text-xl text-dark">
                        {course.course_name}
                      </h2>
                      {isOwner && <span>
                        <button
                          name="courseName"
                          className="edit-button"
                          onClick={(e) => editClick("course_name")}
                        >
                          <i className="material-icons-outlined text-accent">
                            edit
                          </i>
                        </button>
                      </span>}
                    </div>
                  )}

                  {fieldEdit.tag_line ? (
                    <div className="tagline flex items-center relative">
                      <input
                        name="tag_line"
                        className="text-sm italic text-gray-800"
                        autoFocus
                        type="text"
                        onChange={(e) =>
                          setCourseState({
                            ...course,
                            [e.currentTarget.name]: e.target.value,
                          })
                        }
                        value={courseState?.tag_line}
                      />
                      <span>
                        <button
                          className="tick-button"
                          onClick={(e) =>
                            tickClick(
                              e.currentTarget
                                .closest(".tagline")
                                ?.querySelector("input")?.name || "",
                              e.currentTarget
                                .closest(".tagline")
                                ?.querySelector("input")?.value || ""
                            )
                          }
                        >
                          <i className="material-icons text-green-500">check</i>
                        </button>
                      </span>
                      <span>
                        <button
                          className="close-button"
                          onClick={(e) => editClick("")}
                        >
                          <i className="material-icons text-red-500">close</i>
                        </button>
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center relative">
                      <p className="tagline text-sm italic text-gray-800">
                        {course.tag_line}
                      </p>
                      {isOwner && <span>
                        <button
                          name="tagline"
                          className="edit-button"
                          onClick={(e) => editClick("tag_line")}
                        >
                          <i className="material-icons-outlined text-accent">
                            edit
                          </i>
                        </button>
                      </span>}
                    </div>
                  )}
                </div>
                <div className="wrapper flex flex-col items-end">
                  <div className="rating flex py-1 pl-2 items-center">
                    <p className="font-semibold pr-1 pt-1">4.9</p>
                    <i className="material-icons text-amber-500">star</i>
                  </div>
                  <div className="views flex py-1 pl-2 items-center justify-between text-sm text-gray-500">
                    <p className="pr-1">{course.views}</p>
                    <i className="material-icons-outlined">visibility</i>
                  </div>

                  {fieldEdit.language ? (
                    <div className=" language flex items-center relative">
                      <input
                        name="language"
                        className="flex text-sm p-1 items-center "
                        autoFocus
                        type="text"
                        onChange={(e) =>
                          setCourseState({
                            ...course,
                            [e.currentTarget.name]: e.target.value,
                          })
                        }
                        value={courseState?.language}
                      />
                      <span>
                        <button
                          className="tick-button"
                          onClick={(e) =>
                            tickClick(
                              e.currentTarget
                                .closest(".language")
                                ?.querySelector("input")?.name || "",
                              e.currentTarget
                                .closest(".language")
                                ?.querySelector("input")?.value || ""
                            )
                          }
                        >
                          <i className="material-icons text-green-500">check</i>
                        </button>
                      </span>
                      <span>
                        <button
                          className="close-button"
                          onClick={(e) => {
                            editClick("");
                          }}
                        >
                          <i className="material-icons text-red-500">close</i>
                        </button>
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center relative">
                      <p className="language flex text-sm p-1 items-center ">
                        {course.language}
                      </p>
                      {isOwner && <span>
                        <button
                          name="language"
                          className="edit-button"
                          onClick={(e) => editClick("language")}
                        >
                          <i className="material-icons-outlined text-accent">
                            edit
                          </i>
                        </button>
                      </span>}
                    </div>
                  )}

                  <i className="material-icons-outlined">language</i>
                </div>
              </div>

              <div className="flex w-full justify-between items-center my-3 ">
                <div className="duration flex text-sm my-1 text-gray-500 items-center">
                  <i className="material-icons-outlined pr-2">access_time</i>{" "}
                  <p>{course.duration} Hrs</p>
                </div>
                <p className="instructor text-sm my-1 text-gray-500">
                  by Raj Kapoor
                </p>
              </div>

              <div className="flex price w-min my-3 bg-secondary_light rounded-md font-bold text-white px-3 py-1 items-center">
                <i className="material-icons-outlined text-md">
                  currency_rupee
                </i>
                {fieldEdit.price ? (
                  <div className="price flex items-center relative">
                    <input
                      name="price"
                      className="border-none text-xl"
                      autoFocus
                      type="text"
                      onChange={(e) =>
                        setCourseState({
                          ...course,
                          [e.currentTarget.name]: e.target.value,
                        })
                      }
                      value={courseState?.price}
                    />
                    <span>
                      <button
                        className="tick-button"
                        onClick={(e) =>
                          tickClick(
                            e.currentTarget
                              .closest(".price")
                              ?.querySelector("input")?.name || "",
                            e.currentTarget
                              .closest(".price")
                              ?.querySelector("input")?.value || ""
                          )
                        }
                      >
                        <i className="material-icons text-green-500">check</i>
                      </button>
                    </span>
                    <span>
                      <button
                        className="close-button"
                        onClick={(e) => {
                          editClick("");
                        }}
                      >
                        <i className="material-icons text-red-500">close</i>
                      </button>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center relative">
                    <p className="text-xl">{course.price}</p>
                    {isOwner && <span>
                      <button
                        className="edit-button"
                        onClick={(e) => editClick("price")}
                      >
                        <i className="material-icons-outlined text-accent">
                          edit
                        </i>
                      </button>
                    </span>}
                  </div>
                )}
              </div>

              <div className="wrapper my-3">
                <h4>Description</h4>

                {fieldEdit.description ? (
                  <div className="description flex items-center relative">
                    <textarea
                      name="description"
                      className="border-none description my-1 text-sm"
                      autoFocus
                      onChange={(e) =>
                        setCourseState({
                          ...course,
                          [e.currentTarget.name]: e.target.value,
                        })
                      }
                      value={courseState?.description}
                    />
                    <span>
                      <button
                        className="tick-button"
                        onClick={(e) =>
                          tickClick(
                            e.currentTarget
                              .closest(".description")
                              ?.querySelector("textarea")?.name || "",
                            e.currentTarget
                              .closest(".description")
                              ?.querySelector("textarea")?.value || ""
                          )
                        }
                      >
                        <i className="material-icons text-green-500">check</i>
                      </button>
                    </span>
                    <span>
                      <button
                        className="close-button"
                        onClick={(e) => editClick("")}
                      >
                        <i className="material-icons text-red-500">close</i>
                      </button>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center relative">
                    <p className="description my-1 text-sm">
                      {course.description}
                    </p>
                    {isOwner && <span>
                      <button
                        name="description"
                        className="edit-button"
                        onClick={(e) => editClick("description")}
                      >
                        <i className="material-icons-outlined text-accent">
                          edit
                        </i>
                      </button>
                    </span>}
                  </div>
                )}
              </div>
              <div className="wrapper my-3">
                <h4>Requirements</h4>

                {fieldEdit.requirements ? (
                  <div className="requirements flex items-center relative">
                    <textarea
                      name="requirements"
                      className="border-none requirements my-1 text-sm whitespace-pre-line"
                      autoFocus
                      onChange={(e) =>
                        setCourseState({
                          ...course,
                          [e.currentTarget.name]: e.target.value,
                        })
                      }
                      value={courseState?.requirements}
                    />
                    <span>
                      <button
                        className="tick-button"
                        onClick={(e) =>
                          tickClick(
                            e.currentTarget
                              .closest(".requirements")
                              ?.querySelector("textarea")?.name || "",
                            e.currentTarget
                              .closest(".requirements")
                              ?.querySelector("textarea")?.value || ""
                          )
                        }
                      >
                        <i className="material-icons text-green-500">check</i>
                      </button>
                    </span>
                    <span>
                      <button
                        className="close-button"
                        onClick={(e) => {
                          editClick("");
                        }}
                      >
                        <i className="material-icons text-red-500">close</i>
                      </button>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center relative">
                    <p className="requirements my-1 text-sm whitespace-pre-line">
                      {String(course.requirements).replace(/\\n/g, "\n")}
                    </p>
                    {isOwner && <span>
                      <button
                        name="requirements"
                        className="edit-button"
                        onClick={(e) => editClick("requirements")}
                      >
                        <i className="material-icons-outlined text-accent">
                          edit
                        </i>
                      </button>
                    </span>}
                  </div>
                )}
              </div>

              { !isEnrolled && (
              <div className="flex fixed h-20 items-center justify-center border-t bottom-0 left-0 w-full bg-white px-5">
                <button className="w-full" onClick={(e) => {e.preventDefault(); toggleEnrollDialog()}}>Enroll</button>
                <dialog className="dialog enroll-dialog z-[999]" ref={dialogRef}>
                <p className="my-5 text-center">Are you sure you want to Enroll?</p>
                <div className="flex w-full">
                    <button type="button" onClick={toggleEnrollDialog} autoFocus>Cancel</button>
                    <button onClick={() => enroll(id)}>Enroll</button>
                    </div>
                </dialog>
              </div>)
      }

              {/*---------------------------Sliders----------------------------------*/}
              <div className="related-courses">
                <div className="course-heading-wrapper">
                  <div className="course-heading">
                    <h2 className="course-heading-text">Related Courses</h2>
                    <i className="material-icons">auto_awesome</i>
                  </div>
                  <Link to="/category" className="text-gray-500 last">
                    See all
                  </Link>
                </div>
                <div className="slider flex min-h-96 overflow-x-scroll">
                  {relatedCourses.map((course) => (
                    <Link to={`/course/${course.id}/`} className="">
                      <Card key={course.id} course={course} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CoursePage;
