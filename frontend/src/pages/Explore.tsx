import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Explore: React.FC = () => {
    return (
        <section className="explore">
            <p>Explore</p>
            <Link to="/login">
                <button>Go to login</button>
            </Link>
            <Button value="Button"/>
        </section>
    )
}

export default Explore;