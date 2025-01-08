import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

interface SidebarProps {
  className?: string;
}


const Sidebar: React.FC<SidebarProps> = ({className}) => {
  const [opened, toggleOpen] = useState(false);

  const toggleSidebar = () => {
    if (opened) {
      toggleOpen(false);
    } else {
      toggleOpen(true);
    }
  };

  return (
    <div className="sidebar inset-0">
      <a onClick={toggleSidebar}>
        <i className="fas fa-bars text-3xl mx-5"></i>
      </a>

      <section
        className={`${
          opened ? "open" : "close"
        } bg-accent text-light absolute left-0 top-0 w-[70%] h-[100vh] max-w-[500px] -translate-x-[80%]`}
      >
        <div className="flex justify-between items-center p-5 bg-light">
          <Logo className="w-14" />
          <a onClick={toggleSidebar}>
            <i className="fas fa-arrow-left text-3xl mx-5 text-accent"></i>
          </a>
        </div>

        <ul className="sidebar-menu">
          <li
            key="Home"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-home px-5"></i>
            <Link to={'/explore'}>Home</Link>
          </li>

          <li
            key="MyCourses"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-book px-5"></i>
            <Link to={'/my-courses'}>My Courses</Link>
          </li>

          <li
            key="MyBadges"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-medal px-5"></i>
            <Link to={'/badges'}>My Badges</Link>
          </li>

          <li
            key="MyResults"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-chart-line px-5"></i>
            <Link to={'/results'}>My Results</Link>
          </li>

          <li
            key="Notifications"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-bell px-5"></i>
            <Link to={'/notifications'}>Notifications</Link>
          </li>

          <li
            key="MyProfile"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-user px-5"></i>
            <Link to={'/profile'}>Profile</Link>
          </li>

          <li
            key="Leaderboard"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-trophy px-5"></i>
            <Link to={'/leaderboard'}>Leaderboard</Link>
          </li>

          <li
            key="Settings"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-cog px-5"></i>
            <Link to={'/settings'}>Settings</Link>
          </li>
        
          <li
            key="Support"
            className="px-7 py-5 hover:bg-accent_light text-2xl font-semibold"
          >
            <i className="fas fa-headset px-5"></i>
            <Link to={'/support'}>Support</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;
