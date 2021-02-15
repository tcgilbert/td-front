import React, { useEffect, useState } from "react";
import Arrow from "../images/arrow.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// components
import Text from "../components/Text";

// dnd functions
const onDragEnd = (result, colors, setColors) => {
    if (!result.destination) {
        return;
    }
    const { source, destination } = result;
    const copiedColors = [...colors]
    const [removed] = copiedColors.splice(source.index, 1)
    copiedColors.splice(destination.index, 0, removed)
    setColors(copiedColors)
};

const Build = () => {
    const [buildOption, setBuildOption] = useState("text");
    const [colors, setColors] = useState([
        { id: "1", color: "blue" },
        { id: "2", color: "green" },
        { id: "3", color: "orange" },
        { id: "4", color: "red" },
    ]);

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
                    <p
                        onClick={() => setBuildOption("text")}
                        id="text"
                        className="build__pill"
                    >
                        Text
                    </p>
                    <p
                        onClick={() => setBuildOption("link")}
                        id="link"
                        className="build__pill"
                    >
                        Link
                    </p>
                    <p
                        onClick={() => setBuildOption("sound")}
                        id="sound"
                        className="build__pill"
                    >
                        Soundtrack
                    </p>
                    <p
                        onClick={() => setBuildOption("book")}
                        id="book"
                        className="build__pill"
                    >
                        Book
                    </p>
                    <p
                        onClick={() => setBuildOption("pod")}
                        id="pod"
                        className="build__pill"
                    >
                        Podcast
                    </p>
                    <p
                        onClick={() => setBuildOption("movie")}
                        id="movie"
                        className="build__pill"
                    >
                        Movie
                    </p>
                </div>
                <div className="build__form-container">
                    <Text />
                </div>
            </div>
            <div className="build__sandbox">
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, colors, setColors)}
                >
                    <Droppable droppableId="sandbox">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver
                                            ? "lightblue"
                                            : "lightgrey",
                                        padding: 4,
                                        width: 250,
                                        minHeight: 500,
                                        marginRight: 10,
                                    }}
                                >
                                    {colors.map((color, idx) => {
                                        return (
                                            <Draggable
                                                key={color.id}
                                                draggableId={color.id}
                                                index={idx}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect:
                                                                    "none",
                                                                padding: 16,
                                                                margin:
                                                                    "0 0 8px 0",
                                                                minHeight:
                                                                    "50px",
                                                                backgroundColor: snapshot.isDragging
                                                                    ? "#263b4a"
                                                                    : "#456c86",
                                                                color: "white",
                                                                ...provided
                                                                    .draggableProps
                                                                    .style,
                                                            }}
                                                        >
                                                            {color.color}
                                                        </div>
                                                    );
                                                }}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            );
                        }}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Build;
