import React, { ReactElement, useEffect, useRef } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import Input from "../components/Input_Field";
import googleLogo from "../assets/Google-G-logo.png";
import facebookLogo from "../assets/facebook-logo.png";
import { Course, CourseCategory, User } from "./Test";
import { Link, useFetcher, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import { toast, ToastContainer } from "react-toastify";
import getCookie from "../utilities/getCookie";
import BottomMenu from "../components/Bottom_Menu";

export interface CourseModule {
  id: string;
  module_name: string;
  description: string;
  course: string;
}

export interface Lecture {
  id: string;
  lecture_name: string;
  module: string;
  video_link: string;
  lecture_length: string;
}

const CoursePage: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [course, setCourse] = useState<Course>();
  const [courseState, setCourseState] = useState<Course>();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [instructor, setInstructor] = useState<User>();
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const { id } = useParams<{ id: string }>();
  const [thumbnail, setThumbnail] = useState(new Image());
  const user_id = localStorage.getItem("user_id");
  const csrftoken = getCookie("csrftoken");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogRef2 = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const [isEnrolled, setEnrolled] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [openedModule, setOpenedModule] = useState<string>();
  const [loadingModules, setLoadingModules] = useState(true);
  const navigate = useNavigate();

  const [fieldEdit, setFieldEdit] = useState({
    course_name: false,
    tag_line: false,
    language: false,
    price: false,
    description: false,
    requirements: false,
  });

  useEffect(() => {
    setEnrolled(false);
    setCourse({} as Course);
    setCourseState({} as Course);
    setModules([]);
    setLectures([]);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    if (isEnrolled) {
      fetchCourseModules();
    }
  }, [isEnrolled]);

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      if (!course?.course_name) {
        await fetchData();
        if (user && user.courses.includes(id || "null")) {
          setEnrolled(true);
        }
      }
    };

    fetchDataIfNeeded();
  }, [course, user, isEnrolled]);

  const fetchData = async () => {
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
          if (course.instructor == user_id) {
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
              setRelatedCourses(data.results);
            });

          /* Fetching User Data */
          fetch(
            process.env.REACT_APP_BASE_BACK_URL + `/api/users/${user_id}/`,
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
              setUser(user);
              if (user.courses.includes(id)) {
                setEnrolled(true);
              }
              return user;
            });

          /* Fetching Instructor Data */
          fetch(
            process.env.REACT_APP_BASE_BACK_URL +
              `/api/users/${course.instructor}/`,
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
        });
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  /*Fetching Modules*/
  const fetchCourseModules = () => {
    return fetch(
      process.env.REACT_APP_BASE_BACK_URL +
        "/api/course-modules/by-course/?course_id=" +
        id,
      {
        method: "GET",
        headers: {
          "X-CSRFToken": csrftoken,
          Accept: "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setModules(data["Modules"]);
        return data["Modules"];
      })
      .then((moduleData: CourseModule[]) => {
        if (moduleData) {
          const fetchLectures = () =>
            moduleData.map((moduleSingle) => {
              /*Fetching Lectures*/
              return fetch(
                process.env.REACT_APP_BASE_BACK_URL +
                  "/api/lectures/by-module/?module_id=" +
                  moduleSingle.id,
                {
                  method: "GET",
                  headers: {
                    "X-CSRFToken": csrftoken,
                    Accept: "application/json",
                  },
                  credentials: "include",
                }
              )
                .then((response) => {
                  console.log(response);
                  return response.json();
                })
                .then((data) => {
                  return data["Lectures"];
                });
            });
          Promise.all(fetchLectures()).then((allLecturesArrays) => {
            const combinedLectures = allLecturesArrays.flat();
            setLectures(combinedLectures);
          });
        }
      });
  };

  {
    loadingModules ? <Loader /> : "";
  }

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
    if (dialogRef.current?.open || dialogRef2.current?.open) {
      document.body.classList.remove("no-scroll");
      dialogRef.current?.close();
      dialogRef2.current?.close();
    } else {
      document.body.classList.add("no-scroll");
      dialogRef.current?.showModal();
      dialogRef2.current?.showModal();
    }
  };

  const toggleDeleteDialog = () => {
    if (deleteDialogRef.current?.open || deleteDialogRef.current?.open) {
      document.body.classList.remove("no-scroll");
      deleteDialogRef.current?.close();
      deleteDialogRef.current?.close();
    } else {
      document.body.classList.add("no-scroll");
      deleteDialogRef.current?.showModal();
      deleteDialogRef.current?.showModal();
    }
  };

  const enroll = async (id: string | undefined) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/users/enroll/?id=" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.error("Something went wrong.");
        throw new Error("Enroll response not OK.");
      } else {
        const data = await response.json();
        console.log("enrolled")
        setEnrolled(true);
        toggleEnrollDialog();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id: string | undefined) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + `/api/courses/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.error("Something went wrong.");
        throw new Error("Delete response not OK.");
      } else {
        const text = await response.text();
        console.log(text);
        toggleDeleteDialog();
        toast.success("Course deleted successfully.");
        navigate("/explore");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const extractVideoId = (url: string) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const toggleModule = (module_id: string) => {
    if (openedModule == module_id) {
      setOpenedModule("");
    } else {
      setOpenedModule(module_id);
    }
  };

  return (
    <section className="course-page">
      <ToastContainer />
      {course && (
        <>
          <Header
            page="Course"
            className="z-[900]"
            options={[
              ...(isOwner
                ? [
                    { name: "Edit Modules", link: `/edit-module/${course.id}` },
                    {
                      name: "Delete",
                      link: ``,
                      onclick: () => toggleDeleteDialog(),
                    },
                  ]
                : []),
            ]}
          />
          <dialog
            className="dialog delete-dialog absolute flex-col place-content-center right-1/2 z-[999]"
            ref={deleteDialogRef}
          >
            <p className="my-5 text-center">
              Are you sure you want to delete this Course?
            </p>
            <div className="flex w-full justify-center cursor-pointer">
              <button type="button" onClick={toggleDeleteDialog} autoFocus>
                Cancel
              </button>
              <button onClick={() => deleteCourse(id)}>Delete</button>
            </div>
          </dialog>

          <dialog
                    className="dialog enroll-dialog absolute flex-col place-items-center right-1/2 top-1/2"
                    ref={dialogRef2}
                  >
                    <p className="my-5 text-center">
                      Are you sure you want to Enroll?
                    </p>
                    <div className="flex w-full justify-center cursor-pointer">
                      <button
                        type="button"
                        onClick={toggleEnrollDialog}
                        autoFocus
                      >
                        Cancel
                      </button>
                      <button onClick={() => enroll(id)}>Enroll</button>
                    </div>
                  </dialog>

          <dialog
                    className="dialog z-[999999] enroll-dialog"
                    ref={dialogRef}
                  >
                    <p className="my-5 text-center">
                      Are you sure you want to Enroll?
                    </p>
                    <div className="flex w-full">
                      <button
                        type="button"
                        onClick={toggleEnrollDialog}
                        autoFocus
                      >
                        Cancel
                      </button>
                      <button onClick={() => enroll(id)}>Enroll</button>
                    </div>
                  </dialog>
          <div className="xl:pt-20 xl:pb-0 pb-36 xl:mx-64">
            <div
              className="course-page-thumbnail xl:hidden w-full relative"
              style={{
                backgroundImage: `url(${course.thumbnail})`,
                backgroundAttachment: "fixed",
                backgroundSize: "contain",
                backgroundPosition: "top",
                backgroundOrigin: "content-box",
                backgroundRepeat: "no-repeat",
                height: `${thumbnail.height - 40}px`,
                minHeight: `200px`,
                maxHeight: `280px`,
              }}
            ></div>
            <div className="flex justify-between">
              <img
                src={thumbnail.src}
                className={`course-page-thumbnail max-w-[550px] shadow-lg shadow-accent_light hidden xl:flex relative rounded-xl overflow-clip`}
              ></img>
              <div className="wrapper hidden xl:flex flex-col gap-5 p-5 items-end justify-center ">
                <div className="rating flex py-1 pl-2 items-center text-3xl">
                  <p className="font-semibold pr-1 pt-1">4.9</p>
                  <i className="material-icons text-amber-500">star</i>
                </div>
                <div className="views flex py-1 pl-2 items-center justify-between text-2xl text-gray-500">
                  <p className="pr-1">{course.views}</p>
                  <i className="material-icons-outlined text-2xl">visibility</i>
                </div>

                {fieldEdit.language ? (
                  <div className=" language flex items-center relative">
                    <input
                      name="language"
                      className="flex text-2xl p-1 items-center "
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
                  <div className="flex items-center relative text-2xl">
                    <p className="language flex p-1 items-center ">
                      {course.language}
                    </p>
                    {isOwner && (
                      <span>
                        <button
                          name="language"
                          className="edit-button"
                          onClick={(e) => editClick("language")}
                        >
                          <i className="material-icons-outlined text-accent">
                            edit
                          </i>
                        </button>
                      </span>
                    )}
                    <i className="material-icons-outlined ">language</i>
                  </div>
                )}
                <p className="instructor flex text-2xl my-1 text-gray-500">
                  by{" "}
                  <img
                    className="w-5 h-5 mx-1 justify-self-center rounded-full"
                    src={instructor?.profile_picture || ""}
                    alt=""
                  />{" "}
                  {instructor?.first_name} {instructor?.last_name}
                </p>
              </div>
            </div>
            <div className="course-content xl:bg-blue-200 rounded-xl xl:my-5 p-5">
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
                      <h2 className="title py-2 text-xl xl:text-3xl text-dark">
                        {course.course_name}
                      </h2>
                      {isOwner && (
                        <span>
                          <button
                            name="courseName"
                            className="edit-button"
                            onClick={(e) => editClick("course_name")}
                          >
                            <i className="material-icons-outlined text-accent">
                              edit
                            </i>
                          </button>
                        </span>
                      )}
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
                      {isOwner && (
                        <span>
                          <button
                            name="tagline"
                            className="edit-button"
                            onClick={(e) => editClick("tag_line")}
                          >
                            <i className="material-icons-outlined text-accent">
                              edit
                            </i>
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="wrapper flex flex-col items-end xl:hidden">
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
                      {isOwner && (
                        <span>
                          <button
                            name="language"
                            className="edit-button"
                            onClick={(e) => editClick("language")}
                          >
                            <i className="material-icons-outlined text-accent">
                              edit
                            </i>
                          </button>
                        </span>
                      )}
                      <i className="material-icons-outlined">language</i>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex w-full justify-between items-center my-3 ">
                <div className="duration flex text-sm xl:text-xl my-1 text-gray-500 items-center">
                  <i className="material-icons-outlined pr-2">access_time</i>{" "}
                  <p>{course.duration} Hrs</p>
                </div>
                <>
                  <p className="instructor flex text-sm my-1 text-gray-500 xl:hidden">
                    by{" "}
                    <img
                      className="w-5 h-5 mx-1 justify-self-center rounded-full"
                      src={instructor?.profile_picture || ""}
                      alt=""
                    />{" "}
                    {instructor?.first_name} {instructor?.last_name}
                  </p>
                </>
              </div>

              <div className="flex price xl:text-3xl w-min my-3 bg-secondary_light rounded-md font-bold text-white px-3 py-1 items-center">
                <i className="material-icons-outlined text-md">
                  currency_rupee
                </i>
                {fieldEdit.price ? (
                  <div className="price flex items-center relative">
                    <input
                      name="price"
                      className="border-none "
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
                    <p className="">{course.price}</p>
                    {isOwner && (
                      <span>
                        <button
                          className="edit-button"
                          onClick={(e) => editClick("price")}
                        >
                          <i className="material-icons-outlined text-accent">
                            edit
                          </i>
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="wrapper my-3 ">
                <h4 className="xl:text-2xl">Description</h4>

                {fieldEdit.description ? (
                  <div className="description flex items-center relative xl:text-xl text-sm">
                    <textarea
                      name="description"
                      className="border-none description my-1"
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
                  <div className="flex items-center relative xl:text-xl text-sm">
                    <p className="description my-1">{course.description}</p>
                    {isOwner && (
                      <span>
                        <button
                          name="description"
                          className="edit-button"
                          onClick={(e) => editClick("description")}
                        >
                          <i className="material-icons-outlined text-accent">
                            edit
                          </i>
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="wrapper my-3">
                <h4 className="xl:text-2xl">Requirements</h4>

                {fieldEdit.requirements ? (
                  <div className="requirements flex items-center relative xl:text-xl text-sm">
                    <textarea
                      name="requirements"
                      className="border-none requirements my-1 whitespace-pre-line"
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
                  <div className="flex items-center relative xl:text-xl text-sm">
                    <p className="requirements my-1 whitespace-pre-line">
                      {String(course.requirements).replace(/\\n/g, "\n")}
                    </p>
                    {isOwner && (
                      <span>
                        <button
                          name="requirements"
                          className="edit-button"
                          onClick={(e) => editClick("requirements")}
                        >
                          <i className="material-icons-outlined text-accent">
                            edit
                          </i>
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {!isEnrolled && (
                <div className="xl:flex hidden h-20 items-center justify-self-end w-1/3 px-5">
                  <button
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleEnrollDialog();
                    }}
                  >
                    Enroll Now
                  </button>
                  
                </div>
              )}
              {(isEnrolled || isOwner) && modules?.length > 0 && (
                <div className="wrapper my-3">
                  <h4>Modules</h4>
                  {modules.map((module) => (
                    <div className="module cursor-pointer">
                      <div
                        key={module.module_name}
                        onClick={(e) => toggleModule(module.id)}
                        className="module-box border-b"
                      >
                        <div className="flex justify-between p-5 w-full font-semi-bold bg-gray-00">
                          <p className="module-name ">{module.module_name}</p>
                          <i
                            className={`material-icons justify-items-center transition-all duration-500 ease-in-out ${
                              openedModule == module.id ? "rotate-90" : ""
                            }`}
                          >
                            keyboard_arrow_right
                          </i>
                        </div>
                      </div>
                      <div
                        key={module.id}
                        className={`all-lectures ${
                          openedModule == module.id ? "open" : "close"
                        } transition-all duration-7000 ease-in-out`}
                      >
                        {lectures &&
                          lectures.map(
                            (lecture) =>
                              lecture.module == module.id && (
                                <div key={lecture.id} className="lecture">
                                  <a
                                    className="image-wrapper"
                                    href={lecture.video_link}
                                  >
                                    <img
                                      src={`https://img.youtube.com/vi/${extractVideoId(
                                        lecture.video_link
                                      )}/default.jpg`}
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    className="lecture-name underline"
                                    href={lecture.video_link}
                                  >
                                    {lecture.lecture_name}
                                  </a>
                                </div>
                              )
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isEnrolled && (
                <div className="flex xl:hidden fixed h-20 items-center justify-center border-t bottom-16 left-0 w-full bg-white px-5 ">
                  <button
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleEnrollDialog();
                    }}
                  >
                    Enroll
                  </button>
                  
                </div>
              )}

              {/*---------------------------Sliders----------------------------------*/}
              <div className="related-courses">
                <div className="course-heading-wrapper">
                  <div className="course-heading xl:text-2xl">
                    <h2 className="course-heading-text">Related Courses</h2>
                    <i className="material-icons">auto_awesome</i>
                  </div>
                  <Link
                    to={`/course-list/?filter=category&category=${course.category}`}
                    className="text-gray-500 last"
                  >
                    See all
                  </Link>
                </div>
                <div className="slider flex grid-cols-3 xl:grid min-h-96 xl:overflow-x-clip">
                  {relatedCourses.map((course) => (
                    <Link to={`/course/${course.id}/`} className="xl:scale-90">
                      <Card key={course.id} course={course} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <BottomMenu />
        </>
      )}
    </section>
  );
};

export default CoursePage;
