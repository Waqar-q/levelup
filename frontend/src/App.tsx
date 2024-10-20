import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css';
import Explore from "./pages/Test";
import Login from "./pages/Login";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Explore/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    )
}

export default App;