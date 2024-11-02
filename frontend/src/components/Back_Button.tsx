import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="back-button absolute inset-0">
            <a onClick={() => navigate(-1)}><i className="material-icons">arrow_back</i></a>
        </div>
    )
}

export default BackButton;