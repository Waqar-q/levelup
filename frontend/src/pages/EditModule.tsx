import React, {
  ChangeEvent,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import defaultThumbnail from "../assets/default_thumbnail.jpg";
import getCookie from "../utilities/getCookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Course, CourseCategory, CourseSubcategory, User } from "./Test";
import { CourseModule, Lecture } from "./Course";

const EditModule: React.FC = () => {
  const navigate = useNavigate();
  const csrftoken = getCookie("csrftoken");
  const { id: course_id } = useParams();
  const user_id = localStorage.getItem("user_id");
  const [user, setUser] = useState<User>();
  const [isOwner, setIsOwner] = useState(false);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);

  const [course, setCourse] = useState<Course>({
    id: "",
    course_name: "",
    instructor: user_id || "",
    tag_line: "",
    description: "",
    requirements: "",
    duration: 0,
    date_of_creation: new Date(),
    thumbnail: new File([""], "default_thumbnail.jpg"),
    price: 0,
    language: "EN",
    category: "",
    subcategory: "",
    progress: 0,
  });

  const [newModule, setNewModule] = useState<CourseModule>({
    id: "",
    module_name: "",
    description: "",
    course: course_id || "",
  });
  const [newLecture, setNewLecture] = useState<Lecture>({
    id: "",
    lecture_name: "",
    video_link: "",
    module: "",
    lecture_length: "",
  });
  const [openedModule, setOpenedModule] = useState<string>();

  const [addModule, setAddModule] = useState(false);
  const [addLecture, setAddLecture] = useState("");

  const [filePreview, setFilePreview] = useState("");

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    fetchCourseModules();
    if (course.thumbnail.size > 0) {
      extractImageURL();
    }
  }, [course]);

  //Fetching the Course
  const fetchCourse = async () => {
    const response = await fetch(
      process.env.REACT_APP_BASE_BACK_URL + `/api/courses/${course_id}/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      
      setCourse(data);
      if (data.instructor == user_id) {
        setIsOwner(true);
        return data;
      } else {
        console.log("User is not the creator of this course.");
      }
    } else {
      console.log(response.statusText);
    }
  };

  /*Fetching Modules*/
  const fetchCourseModules = () => {
    return fetch(
      process.env.REACT_APP_BASE_BACK_URL +
        "/api/course-modules/by-course/?course_id=" +
        course_id,
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

  const handleModuleInputChange = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.target) {
      setNewModule({
        ...newModule,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleLectureInputChange = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.target) {
      setNewLecture({
        ...newLecture,
        [event.target.name]: event.target.value,
      });
    }
  };

  const submitModule = async () => {
    const formData = new FormData();
   
    formData.append("module_name", newModule.module_name);
    formData.append("description", newModule.description);
    formData.append("course", newModule.course);

    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/course-modules/",
        {
          method: "POST",
          body: formData,
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        toast.success("New Module Created.");
        setNewModule((prev) => ({
          ...prev,
          id: data.id,
        }));
        if (course.id) {
          navigate(0);
        }
      } else {
        console.log(response.json());
      }
    } catch (error) {
      toast.error("Failed to update New Module. Please try again.");
      console.error(error);
    }
  };

  const submitLecture = async () => {
    const formData = new FormData();
    
    formData.append("lecture_name", newLecture.lecture_name);
    formData.append("video_link", newLecture.video_link);
    formData.append("module", newLecture.module);

    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/lectures/",
        {
          method: "POST",
          body: formData,
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        toast.success("New Lecture Created.");
        setNewLecture((prev) => ({
          ...prev,
          id: data.id,
        }));
        if (course.id) {
          navigate(0);
        }
      } else {
        console.log(response.json());
      }
    } catch (error) {
      toast.error("Failed to update New Lecture. Please try again.");
      console.error(error);
    }
  };

  const toggleModule = (module_id: string) => {
    if (openedModule == module_id) {
      setOpenedModule("");
    } else {
      setOpenedModule(module_id);
    }
  };

  const extractVideoId = (url: string) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const toggleAddModule = (e: MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement;
    if (addModule) {
      setAddModule(false);
      button.classList.remove("rotate-45");
    } else {
      setAddModule(true);
      button.classList.add("rotate-45");
    }
  };

  const toggleAddLecture = (e: MouseEvent, module_id: string) => {
    const button = e.currentTarget as HTMLButtonElement;
    if (addLecture) {
      button.classList.remove("rotate-45");
      setAddLecture("");
    } else {
      button.classList.add("rotate-45");
      setAddLecture(module_id);
      setNewLecture((prev) => ({
        ...prev,
        module: module_id,
      }));
    }
  };

  const extractImageURL = () => {
    const reader = new FileReader();
    reader.readAsDataURL(course.thumbnail);
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
  };

  return (
    <section className="edit-module">
      <ToastContainer />
      <Header page="Edit Modules" />
      <div className="flex xl:flex-row flex-col gap-4 p-5 py-20">
        <div
          className="edit-module-thumbnail xl:hidden w-full h-44 rounded-lg"
          style={{
            backgroundImage: `url(${course.thumbnail})`,
            backgroundAttachment: "fixed",
            backgroundSize: "contain",
            backgroundPosition: "top",
            backgroundOrigin: "content-box",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <img
          src={course.thumbnail.toString()}
          className={`course-page-thumbnail shadow-accent_light shadow-lg hidden xl:flex relative h-[350px] rounded-xl `}
        ></img>
        <div className="flex flex-col xl:w-1/2 xl:p-10 xl:bg-blue-200 rounded-xl ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">{course.course_name}</h1>
            <button
              className="bg-none border-none rounded-none text-dark p-0 transition-transform duration-500 ease-in-out"
              onClick={(e) => {
                e.preventDefault();
                toggleAddModule(e);
              }}
            >
              <i className="material-icons text-4xl">add</i>
            </button>
          </div>
          {isOwner && (
            <>
              {modules?.length > 0 && (
                <div className="wrapper my-3">
                  <h2>Modules</h2>
                  {modules.map((module) => (
                    <div className="module">
                      <div
                        key={module.module_name}
                        className="module-box border-b flex"
                      >
                        <div
                          className="flex justify-between p-5 w-full font-semi-bold bg-gray-00"
                          onClick={(e) => toggleModule(module.id)}
                        >
                          <p className="module-name ">{module.module_name}</p>
                          <i
                            className={`material-icons transition-all duration-500 ease-in-out ${
                              openedModule == module.id ? "rotate-90" : ""
                            }`}
                          >
                            keyboard_arrow_right
                          </i>
                        </div>
                        <button
                          className="bg-none border-none rounded-none text-dark p-0 transition-transform duration-500 ease-in-out"
                          data-id={module.id}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleAddLecture(e, module.id);
                          }}
                        >
                          <i className="material-icons text-2xl">add</i>
                        </button>
                      </div>
                      <div
                        key={module.id}
                        className={`all-lectures ${
                          openedModule == module.id ? "open" : "close"
                        } transition-all duration-7000 ease-in-out`}
                      >
                        {Array.isArray(lectures) &&
                          lectures &&
                          lectures
                            .filter((lecture) => lecture.module == module.id)
                            .map((lecture) => (
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
                            ))}
                      </div>
                      {/*ADD LECTURE FORM*/}

                      {addLecture == module.id && (
                        <div
                          className=" flex flex-col gap-4 mt-4"
                          data-module={module.id}
                        >
                          <label htmlFor="lecture_name">New Lecture Name</label>
                          <input
                            type="text"
                            placeholder="Lecture Name"
                            name="lecture_name"
                            onChange={(e) => handleLectureInputChange(e)}
                            value={newLecture.lecture_name}
                          />
                          <label htmlFor="link">New Lecture Link</label>
                          <input
                            placeholder="Add youtube link"
                            name="video_link"
                            onChange={(e) => handleLectureInputChange(e)}
                            value={newLecture.video_link}
                          />

                          <button
                            type="button"
                            onClick={(e) => submitLecture(e)}
                            className="max-w-96"
                          >
                            Add Lecture
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {addModule && (
                <form className="new-module-form flex flex-col gap-4 pt-4">
                  <label htmlFor="module_name">New Module Name</label>
                  <input
                    type="text"
                    placeholder="Module Name"
                    name="module_name"
                    onChange={(e) => handleModuleInputChange(e)}
                    value={newModule.module_name}
                  />
                  <label htmlFor="description">New Module Description</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your module"
                    name="description"
                    onChange={(e) => handleModuleInputChange(e)}
                    value={newModule.description}
                  />

                  <button type="button" onClick={submitModule} className="max-w-96">
                    Add Module
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
      <BottomMenu />
    </section>
  );
};
export default EditModule;
