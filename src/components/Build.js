import React, { useEffect, useState } from "react";
import Arrow from "../images/arrow.svg";

// components
import Blurb from "./Blurb";
import About from "./About";
import Sandbox from "../components/Sandbox";

const Build = (props) => {

    const [buildOption, setBuildOption] = useState("about");

    const [colors, setColors] = useState([
        { id: "1", color: "blue" },
        { id: "2", color: "green" },
        { id: "3", color: "orange" },
        { id: "4", color: "red" },
    ]);

    const handleForms = () => {
        switch (buildOption) {
            case "about":
                return <About about={props.about} setAbout={props.setAbout}/>;
            case "blurbs":
                return <Blurb user={props.user} />;
            case "links":
                return <Blurb />;
            case "soundtrack":
                return <Blurb />;
        }
    };

    // For build options
    useEffect(() => {
        const about = document.getElementById("about");
        const blurbs = document.getElementById("blurbs");
        const soundtrack = document.getElementById("soundtrack");
        const links = document.getElementById("links");

        const buildOptions = [about, blurbs, soundtrack, links];
        buildOptions.forEach((opt) => {
            if (opt.id === buildOption) {
                opt.classList.add("build__selected");
            } else {
                if (opt.classList.contains("build__selected")) {
                    opt.classList.remove("build__selected");
                }
            }
        });
    }, [buildOption]);

    // For checkbox
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
            <div className="build__options">
                <div className="build__pillbox">
                    <p
                        onClick={() => setBuildOption("about")}
                        id="about"
                        className="build__pill"
                    >
                        About
                    </p>
                    <p
                        onClick={() => setBuildOption("blurbs")}
                        id="blurbs"
                        className="build__pill"
                    >
                        Blurbs
                    </p>
                    <p
                        onClick={() => setBuildOption("links")}
                        id="links"
                        className="build__pill"
                    >
                        Links
                    </p>
                    <p
                        onClick={() => setBuildOption("soundtrack")}
                        id="soundtrack"
                        className="build__pill"
                    >
                        Soundtrack
                    </p>
                </div>
                <div className="build__form-container">
                    {handleForms()}
                </div>
            </div>

            <Sandbox content={colors} setContent={setColors} about={props.about}/>
        </div>
    );
};

export default Build;
