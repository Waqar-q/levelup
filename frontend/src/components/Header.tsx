import React from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  page?: string;
  className?: string;
  options?: {
    name: string;
    link: string;
  }[];
}

const Header: React.FC<HeaderProps> = ({ className = "", page, options }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathWithoutBackButton = ["/explore"];
  const hideBackButton = pathWithoutBackButton.includes(location.pathname);
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <header
      className={`header ${className} grid grid-cols-[20%_60%_20%] xl:grid-cols-[45%_10%_45%] fixed right-0 left-0 items-center justify-center h-16 border-b bg-light border-gray-200`}
    >
      {hideBackButton ? (
        <>
          <Sidebar className="justify-self-start" />
          <Logo className="justify-self-center w-14" />
          <ul className="justify-self-end flex justify-between h-full max-w-full   items-center mx-5">
            <li
              key="notifications"
              className="px-2 hover:text-secondary_light text-md hidden items-center xl:flex"
            >
              <Link to="/notifications" className="flex items-center">
                <i className="material-icons-outlined px-2 font-semibold text-2xl">
                  notifications
                </i>
                Notifications
              </Link>
            </li>
            <li
              key="profile"
              className="px-2 hover:text-secondary_light text-md hidden items-center xl:flex"
            >
              <Link to="/profile" className="flex items-center">
                <i className="material-icons-outlined px-2 font-semibold text-2xl">
                  person
                </i>
                Profile
              </Link>
            </li>
            <li
              key="explore"
              className="px-2 hover:text-secondary_light text-md hidden items-center xl:flex"
            >
              <Link to="/explore" className="flex items-center">
                <i className="material-icons-outlined px-2 font-semibold text-2xl">
                  public
                </i>
                Explore
              </Link>
            </li>
            <li
              key="settings"
              className="px-2 hover:text-secondary_light text-md hidden items-center xl:flex"
            >
              <Link to="/settings" className="flex items-center">
                <i className="material-icons-outlined px-2 font-semibold text-2xl">
                  settings
                </i>
                Settings
              </Link>
            </li>
            <Link
              to={"/course-list/"}
              className="flex items-center hover:text-secondary_light"
            >
              <li className="material-icons xl:text-2xl text-4xl xl:px-2">
                search
              </li>
              <p className="hidden xl:block">Search</p>
            </Link>
          </ul>
        </>
      ) : (
        <>
          <a onClick={() => navigate(-1)}>
            <i className="material-icons px-5 text-3xl cursor-pointer">
              arrow_back
            </i>
          </a>
          <p className="text-2xl">{page}</p>
          <ul className="justify-self-end flex justify-between h-full max-w-full items-center mx-5">
            <li
              key="notifications"
              className="px-2 hover:text-secondary_light text-md hidden items-center xl:flex"
            >
              <Link to="/notifications" className="flex items-center">
                <i className="material-icons-outlined px-2 font-semibold text-2xl">
                  notifications
                </i>
                Notifications
              </Link>
            </li>
            <li
              key="profile"
              className="px-2 hover:text-secondary_light text-md hidden items-center xl:flex"
            >
              <Link to="/profile" className="flex items-center">
                <i className="material-icons-outlined px-2 font-semibold text-2xl">
                  person
                </i>
                Profile
              </Link>
            </li>
            <li
              key="explore"
              className="px-2 hover:text-secondary_light text-md hidden items-center xl:flex"
            >
              <Link to="/explore" className="flex items-center">
                <i className="material-icons-outlined px-2 font-semibold text-2xl">
                  public
                </i>
                Explore
              </Link>
            </li>
            <li
              key="settings"
              className="px-2 hover:text-secondary_light text-md hidden items-center xl:flex"
            >
              <Link to="/settings" className="flex items-center">
                <i className="material-icons-outlined px-2 font-semibold text-2xl">
                  settings
                </i>
                Settings
              </Link>
            </li>
            <Link
              to={"/course-list/"}
              className="items-center hover:text-secondary_light hidden xl:flex"
            >
              <li className="material-icons xl:text-2xl text-4xl xl:px-2">
                search
              </li>
              <p className="hidden xl:block">Search</p>
            </Link>

            {options && (
              <div className="justify-self-center xl:justify-self-end">
                <ul className="hidden px-6">
                  {options.map((option) => (
                    <li
                      className="px-4 text-dark text-sm py-1 hover:text-secondary_light"
                      key={option.name}
                    >
                      <Link to={option.link}>{option.name}</Link>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setOptionsOpen(!optionsOpen)}
                  className=" bg-none xl:px-4 p-0 m-0 rounded-none border-none"
                >
                  <i className="material-icons xl:text-dark text-3xl">more_vert</i>
                </button>
                <span
                  className={`absolute rounded-md shadow-md bg-light top-12 right-4 py-4 ${
                    optionsOpen ? "" : "hidden"
                  }`}
                >
                  <ul>
                    {options.map((option) => (
                      <li
                        className="px-4 text-dark text-lg py-1 border-b border-gray-200"
                        key={option.name}
                      >
                        <Link to={option.link}>{option.name}</Link>
                      </li>
                    ))}
                  </ul>
                </span>
              </div>
            )}
          </ul>
        </>
      )}
    </header>
  );
};

export default Header;
