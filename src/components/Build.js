import React, { useEffect, useState } from "react";
import Arrow from "../images/arrow.svg";
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

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
            <div className="build__options">
                <div className="build__pillbox">
                    <p className="build__pill">Text</p>
                    <p className="build__pill">Soundtrack</p>
                    <p className="build__pill">Book</p>
                    <p className="build__pill">Podcast</p>
                    <p className="build__pill">Movie</p>
                    <p className="build__pill">Link</p>
                </div>
                <div className="build__form-container">
                    <div className="build__form">
                        <input type="text"/>
                        <input type="text"/>
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
