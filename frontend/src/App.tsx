import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css';
import Explore from "./pages/Test";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DeleteData from "./pages/Delete-data";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import CoursePage from "./pages/Course";
import Signup from "./pages/Sign Up";
import Role from "./pages/Role";
import NewCourse from "./pages/NewCourse";
import NewModule from "./pages/EditModule";
import EditModule from "./pages/EditModule";
import CourseList from "./pages/CourseList";

declare global{
    interface Window{
      FB: any;
      fbAsyncInit: () => void;
    }
  }

const App: React.FC = () => {

    useEffect(() => {
        try {
                window.FB.init({
                    appId: '1267604421156993',
                    cookie: true,
                    xfbml: true,
                    version: 'v21.0'
                });
                console.log('FB SDK initialized successfully');
            } catch (error) {
                console.error('Failed to initialize FB SDK:', error);
            }
    },[])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Explore/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/role" element={<Role/>}/>
                <Route path="/privacy" element={<Privacy/>}/>
                <Route path="/terms" element={<Terms/>}/>
                <Route path="/delete-data" element={<DeleteData/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/notifications" element={<Notifications/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/course/:id" element={<CoursePage/>}/>
                <Route path="/new-course/" element={<NewCourse/>}/>
                <Route path="/edit-module/:id" element={<EditModule/>}/>
                <Route path="/course-list/" element={<CourseList/>}/>
            </Routes>
        </Router>
    )
}

export default App;