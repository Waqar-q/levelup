import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Explore/>}/>
            </Routes>
        </Router>
    )
}

export default App;