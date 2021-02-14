import React, { useEffect } from "react";
import Arrow from "../images/arrow.svg"

const Build = () => {


    useEffect(() => {
        const check = document.getElementById("show")
        const container = document.getElementById("build-container")

        container.addEventListener("click", () => {
            if (check.getAttribute("checked")) {
                check.removeAttribute("checked")
            } else {
                check.setAttribute("checked", true)
            }
        })
    }, [])



    return (
        <div className="build">
            <div className="build__components" id="build-container">
                <p className="build__text">Components</p>
                <input className="build__show" type="checkbox" name="show" id="show"/>
                <img className="build__arrow" src={Arrow} alt="Down Arrow" />
                <div className="build__pillbox"></div>
            </div>
        </div>
    );
};

export default Build;
