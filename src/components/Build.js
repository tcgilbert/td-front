import React from "react";
import Arrow from "../images/arrow.svg"

const Build = () => {
    return (
        <div className="build">
            <div className="build__components">
                <input type="checkbox" name="show" id="show" />
                <p className="build__text">Components</p>
                <img className="build__arrow" src={Arrow} alt="Down Arrow" />
                <div className="build__pillbox"></div>
            </div>
        </div>
    );
};

export default Build;
