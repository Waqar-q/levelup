import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomMenu from "../components/Bottom_Menu";
import defaultThumbnail from "../assets/default_thumbnail.jpg";
import getCookie from "../utilities/getCookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Course, CourseCategory, CourseSubcategory } from "./Test";

const NewCourse: React.FC = () => {
  const navigate = useNavigate();
  const csrftoken = getCookie("csrftoken");
  const userID = localStorage.getItem("user_id");
  const [newCourse, setNewCourse] = useState<Course>({
    id: "",
    course_name: "",
    instructor: userID || "",
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
  const [categories, setCategories] = useState<CourseCategory[]>();
  const [subcategories, setSubcategories] = useState<CourseSubcategory[]>();

  const [filePreview, setFilePreview] = useState(defaultThumbnail);

  useEffect(() => {}, [newCourse.thumbnail]);

  useEffect(() => {
    fetch(defaultThumbnail)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "default_thumbnail.jpg", {
          type: "image/jpeg",
          lastModified: new Date().getTime(),
        });

        // TypeScript now knows file is definitely a File object
        setNewCourse((prev) => ({
          ...prev,
          thumbnail: file as File, // Explicitly tell TypeScript this is a File
        }));
      });

    const getCategories = async () => {
      const categories: CourseCategory[] = await fetchCategories();
      setNewCourse((prev) => ({
        ...prev,
        category: categories[0].id.toString(),
      }));
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getSubcategories = async () => {
      if (newCourse.category !== "") {
        const subcategories: CourseSubcategory[] = await fetchSubcategories();
        setNewCourse({
          ...newCourse,
          subcategory: subcategories[0].id.toString(),
        });
      }
    };
    getSubcategories();
  }, [newCourse.category]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/course-categories/",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-CSRFToken": csrftoken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL +
          "/api/course-subcategories/get_subcategories_by_category/?category=" +
          `${newCourse.category}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-CSRFToken": csrftoken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSubcategories(data["Subcategories"]);
        return data["Subcategories"];
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setNewCourse({
        ...newCourse,
        thumbnail: file,
      });

      setFilePreview(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: any) => {
    setNewCourse({
      ...newCourse,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("course_name", newCourse.course_name);
    formData.append("instructor", newCourse.instructor);
    formData.append("tag_line", newCourse.tag_line);
    formData.append("description", newCourse.description);
    formData.append("requirements", newCourse.requirements);
    formData.append("duration", newCourse.duration.toString());
    formData.append("price", newCourse.price.toString());
    formData.append("language", newCourse.language);
    formData.append("category", newCourse.category);
    formData.append("subcategory", newCourse.subcategory);

    if (newCourse.thumbnail) {
      formData.append("thumbnail", newCourse.thumbnail);
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_FRONT_URL + "/api/courses/",
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
        toast.success("New Course Created.");
        setNewCourse((prev) => ({
          ...prev,
          id: data.id,
        }));
        if (data.id) {
          setTimeout(() => navigate(`/course/${data.id}`), 500);
        }
      } else {
        console.log(response.json());
      }
    } catch (error) {
      toast.error("Failed to update New Course. Please try again.");
      console.error(error);
    }
  };

  return (
    <section className="new-course">
      <ToastContainer />
      <Header page="New Course" />
      <form action="" className="flex flex-col gap-4 p-5 py-20">
        <label htmlFor="imageThumbnail">Upload Course Thumbnail</label>
        <div>
          <label htmlFor="fileInput">
            <div className="overflow-clip max-h-64 flex items-center rounded-xl">
              <img
                className="rounded-xl"
                src={filePreview}
                alt="Upload Thumbnail"
              />
            </div>
          </label>
          <input
            className="border-none"
            type="file"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <label htmlFor="course_name">Course Name</label>
        <input
          type="text"
          placeholder="Course Name"
          name="course_name"
          onChange={handleInputChange}
          value={newCourse.course_name}
        />
        <label htmlFor="tag_line">Course Tagline</label>
        <input
          type="text"
          placeholder="Tagline"
          name="tag_line"
          onChange={handleInputChange}
          value={newCourse.tag_line}
        />
        <label htmlFor="description">Course Description</label>
        <textarea
          rows={5}
          placeholder="Describe your course"
          name="description"
          onChange={handleInputChange}
          value={newCourse.description}
        />
        <label htmlFor="requirements">Course Requirements</label>
        <textarea
          rows={5}
          placeholder="List down requirements for this course"
          name="requirements"
          onChange={handleInputChange}
          value={newCourse.requirements}
        />
        <label htmlFor="duration">Course Duration (in hours)</label>
        <input
          type="number"
          name="duration"
          placeholder="Enter duration of this course in hours"
          onChange={handleInputChange}
          value={newCourse.duration}
        />
        <label htmlFor="price">Course Price per Subscription</label>
        <input
          type="number"
          name="price"
          placeholder="Course price per subscription"
          onChange={handleInputChange}
          value={newCourse.price}
        />
        <label htmlFor="language">Select Course Language</label>
        <select
          className={`dropdown p-4 bg-sky-200 rounded-xl w-full max-w-96`}
          onChange={handleInputChange}
          name="language"
          value={newCourse.language}
        >
          <option key="language" value="">
            Select Language
          </option>
          <option key="EN" value="EN">
            English
          </option>
          <option key="HI" value="HI">
            Hindi
          </option>
          <option key="AR" value="AR">
            Arabic
          </option>
          <option key="MR" value="MR">
            Marathi
          </option>
          <option key="FR" value="FR">
            French
          </option>
          <option key="ES" value="ES">
            Spanish
          </option>
          <option key="DE" value="DE">
            German
          </option>
          <option key="ZH" value="ZH">
            Chinese
          </option>
          <option key="JA" value="JA">
            Japanese
          </option>
          <option key="KO" value="KO">
            Korean
          </option>
          <option key="PT" value="PT">
            Portuguese
          </option>
          <option key="IT" value="IT">
            Italian
          </option>
          <option key="RU" value="RU">
            Russian
          </option>
          <option key="TR" value="TR">
            Turkish
          </option>
          <option key="FA" value="FA">
            Persian
          </option>
          <option key="UR" value="UR">
            Urdu
          </option>
          <option key="BN" value="BN">
            Bengali
          </option>
          <option key="PA" value="PA">
            Punjabi
          </option>
          <option key="TA" value="TA">
            Tamil
          </option>
          <option key="TE" value="TE">
            Telugu
          </option>
          <option key="ML" value="ML">
            Malayalam
          </option>
          <option key="TH" value="TH">
            Thai
          </option>
          <option key="VI" value="VI">
            Vietnamese
          </option>
          <option key="ID" value="ID">
            Indonesian
          </option>
          <option key="EL" value="EL">
            Greek
          </option>
          <option key="SV" value="SV">
            Swedish
          </option>
          <option key="NL" value="NL">
            Dutch
          </option>
          <option key="HU" value="HU">
            Hungarian
          </option>
          <option key="PL" value="PL">
            Polish
          </option>
          <option key="HE" value="HE">
            Hebrew
          </option>
          <option key="CS" value="CS">
            Czech
          </option>
          <option key="RO" value="RO">
            Romanian
          </option>
          <option key="FI" value="FI">
            Finnish
          </option>
          <option key="NO" value="NO">
            Norwegian
          </option>
          <option key="UK" value="UK">
            Ukrainian
          </option>
          <option key="TL" value="TL">
            Filipino
          </option>
          <option key="MS" value="MS">
            Malay
          </option>
          <option key="SW" value="SW">
            Swahili
          </option>
        </select>

        {categories && (
          <>
            <label htmlFor="category">Select Course Category</label>
            <select
              className={`category-dropdown dropdown p-4 bg-sky-200 rounded-xl w-full max-w-96`}
              onChange={handleInputChange}
              name="category"
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  selected={newCourse.category === category.id.toString()}
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          </>
        )}
        <label htmlFor="subcategory">Select Course Subcategory</label>
        <select
          className={`subcategory-dropdown dropdown p-4 bg-sky-200 rounded-xl w-full max-w-96`}
          onChange={handleInputChange}
          name="subcategory"
        >
          {subcategories &&
            subcategories.map((subcategory) => (
              <option
                key={subcategory.id}
                value={subcategory.id}
                selected={newCourse.category === subcategory.id.toString()}
              >
                {subcategory.subcategory_name}
              </option>
            ))}
        </select>
        <button type="button" onClick={submitForm}>
          Create New Course
        </button>
      </form>
      <BottomMenu />
    </section>
  );
};
export default NewCourse;
