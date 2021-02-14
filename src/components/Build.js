import React, { useEffect } from "react";
import Arrow from "../images/arrow.svg";

const Build = () => {
    useEffect(() => {
        const check = document.getElementById("show");
        const container = document.getElementById("build-container");

        container.addEventListener("click", () => {
            if (check.getAttribute("checked")) {
                check.removeAttribute("checked");
            } else {
                check.setAttribute("checked", true);
            }
        });
    }, []);

    return (
        <div className="build">
            <input
                className="build__show"
                type="checkbox"
                name="show"
                id="show"
            />
            <div className="build__components" id="build-container">
                <p className="build__text">Components</p>
                <img className="build__arrow" src={Arrow} alt="Down Arrow" />
            </div>
            <div className="build__pillbox">
                <p className="build__pill">Text</p>
                <p className="build__pill">Soundtrack</p>
                <p className="build__pill">Book</p>
                <p className="build__pill">Podcast</p>
                <p className="build__pill">Movie</p>
            </div>
        </div>
    );
};

export default Build;
