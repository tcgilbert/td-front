import React, { useEffect, useState } from "react";
import Arrow from "../images/arrow.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Build = () => {
    const [buildOption, setBuildOption] = useState("text");


    // For build options
    useEffect(() => {
        const text = document.getElementById("text");
        const sound = document.getElementById("sound");
        const book = document.getElementById("book");
        const pod = document.getElementById("pod");
        const movie = document.getElementById("movie");
        const link = document.getElementById("link");

        const buildOptions = [text, sound, book, pod, movie, link];
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
                    <p onClick={() => setBuildOption("text")} id="text" className="build__pill">
                        Text
                    </p>
                    <p onClick={() => setBuildOption("link")} id="link" className="build__pill">
                        Link
                    </p>
                    <p onClick={() => setBuildOption("sound")} id="sound" className="build__pill">
                        Soundtrack
                    </p>
                    <p onClick={() => setBuildOption("book")} id="book" className="build__pill">
                        Book
                    </p>
                    <p onClick={() => setBuildOption("pod")} id="pod" className="build__pill">
                        Podcast
                    </p>
                    <p onClick={() => setBuildOption("movie")} id="movie" className="build__pill">
                        Movie
                    </p>
                </div>
                <div className="build__form-container">
                    <div className="build__form">
                        <input type="text" />
                    </div>
                </div>
            </div>
            <div className="build__sandbox">
                <div className="build__element">Text</div>
            </div>
        </div>
    );
};

export default Build;
