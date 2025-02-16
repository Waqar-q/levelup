import React, { useEffect, useRef, useState } from "react";
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
import defaultDp from "../assets/default_dp.jpg";
import getCookie from "../utilities/getCookie";
import { User } from "./Test";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const user_id = localStorage.getItem("user_id");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const csrftoken = getCookie("csrftoken");

  useEffect(() => {
    fetchData();
  }, []);

  //Fetching User Data
  const fetchData = () =>
    fetch(process.env.REACT_APP_BASE_BACK_URL + `/api/users/${user_id}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
        return user;
      });

  const toggleLogoutDialog = () => {
    if (dialogRef.current?.open) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.showModal();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_BACK_URL + "/api/auth/logout/",
        {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Logout successful!");
        navigate("/login");
      } else {
        console.error("Logout failed:", response.statusText);
        console.error("Response:", response);
      }
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("logged");
    localStorage.removeItem("user_id");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("age");
    localStorage.removeItem("gender");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
  };

  if (localStorage.getItem("logged") == "true") {
    return (
      <section className="settings">
        <Header page="Settings" />
        <div className="flex xl:flex-row flex-col pt-20">
          <div className="flex flex-col xl:mx-3 xl:rounded-lg xl:bg-blue-200">
            <h1 className="name xl:hidden flex text-xl font-semibold px-10 place-self-center">
              {user?.first_name} {user?.last_name}
            </h1>

            <div className="profile-picture-edit flex flex-col justify-center items-center p-5 xl:w-64">
              <img
                className="w-28  rounded-full ring-4 ring-secondary_light"
                src={user?.profile_picture || defaultDp}
                alt="Display Picture"
                sizes=""
              />
              <p className="my-5">Change Profile Picture</p>
            </div>

            <h1 className="name hidden xl:flex text-xl font-semibold px-10 place-self-center">
              {user?.first_name} {user?.last_name}
            </h1>
          </div>

          <ul className="profile-settings w-full">
            <p className="profile-settings-heading">Account & Security</p>

            <Link to={"/profile"}>
              <li className="setting-item">
                <i className="material-icons-outlined">person</i>
                <p>Profile</p>
              </li>
            </Link>

            <Link to={"/change-password"}>
              <li className="setting-item">
                <i className="material-icons-outlined">lock</i>
                <p>Change Password</p>
              </li>
            </Link>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleLogoutDialog();
              }}
            >
              <li className="setting-item">
                <i className="material-icons-outlined">exit_to_app</i>
                <p>Logout</p>
              </li>
            </a>
            <dialog className="dialog logout-dialog z-[99999] absolute " ref={dialogRef}>
              <p className="my-5 text-center">
                Are you sure you want to log out?
              </p>
              <div className="flex w-full justify-center">
                <button type="button" onClick={toggleLogoutDialog}>
                  Cancel
                </button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </dialog>

            <p className="profile-settings-heading">Display and Appearance</p>

            <Link to={"/theme"}>
              <li className="setting-item">
                <i className="material-icons-outlined">brightness_4</i>
                <p>Dark Mode / Light Mode</p>
              </li>
            </Link>

            <Link to={"/font-settings"}>
              <li className="setting-item">
                <i className="material-icons-outlined">text_fields</i>
                <p>Font Size and Style</p>
              </li>
            </Link>

            <Link to={"/language"}>
              <li className="setting-item">
                <i className="material-icons-outlined">language</i>
                <p>Language Preferences</p>
              </li>
            </Link>

            <p className="profile-settings-heading">Course Settings</p>

            <Link to={"/download-preferences"}>
              <li className="setting-item">
                <i className="material-icons-outlined">cloud_download</i>
                <p>Download Preferences</p>
              </li>
            </Link>

            <Link to={"/playback"}>
              <li className="setting-item">
                <i className="material-icons-outlined">play_circle_outline</i>
                <p>Playback Settings</p>
              </li>
            </Link>

            <Link to={"/progress-assessment"}>
              <li className="setting-item">
                <i className="material-icons-outlined">track_changes</i>
                <p>Assessment and Progress</p>
              </li>
            </Link>

            <p className="profile-settings-heading">
              Subscription and Payment Settings
            </p>

            <Link to={"/subscription-plan"}>
              <li className="setting-item">
                <i className="material-icons-outlined">credit_card</i>
                <p>Subscription Plan</p>
              </li>
            </Link>

            <Link to={"/billing-history"}>
              <li className="setting-item">
                <i className="material-icons-outlined">receipt</i>
                <p>Billing History</p>
              </li>
            </Link>

            <Link to={"/update-payment-method"}>
              <li className="setting-item">
                <i className="material-icons-outlined">payment</i>
                <p>Update Payment Method</p>
              </li>
            </Link>

            <p className="profile-settings-heading">Data and Storage</p>

            <Link to={"/clear-cache"}>
              <li className="setting-item">
                <i className="material-icons-outlined">delete_outline</i>
                <p>Clear Cache</p>
              </li>
            </Link>

            <Link to={"/data-export"}>
              <li className="setting-item">
                <i className="material-icons-outlined">save_alt</i>
                <p>Data Export</p>
              </li>
            </Link>

            <Link to={"/data-usage"}>
              <li className="setting-item">
                <i className="material-icons-outlined">data_usage</i>
                <p>Data Usage</p>
              </li>
            </Link>

            <p className="profile-settings-heading">Help & Support</p>

            <Link to={"/faqs"}>
              <li className="setting-item">
                <i className="material-icons-outlined">help_outline</i>
                <p>FAQs</p>
              </li>
            </Link>

            <Link to={"/contact-support"}>
              <li className="setting-item">
                <i className="material-icons-outlined">support_agent</i>
                <p>Contact Support</p>
              </li>
            </Link>

            <Link to={"/feedback"}>
              <li className="setting-item">
                <i className="material-icons-outlined">feedback</i>
                <p>Feedback</p>
              </li>
            </Link>

            <p className="profile-settings-heading">
              Optional / Extra Settings
            </p>

            <Link to={"/goal-setting"}>
              <li className="setting-item">
                <i className="material-icons-outlined">flag</i>
                <p>Goal Setting</p>
              </li>
            </Link>

            <Link to={"/personalization"}>
              <li className="setting-item">
                <i className="material-icons-outlined">palette</i>
                <p>Personalization</p>
              </li>
            </Link>
          </ul>
        </div>
        <BottomMenu />
      </section>
    );
  } else {
    navigate("/login");
    return null;
  }
};
export default Settings;
