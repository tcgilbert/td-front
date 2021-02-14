import React, { useEffect, useState } from "react";
import Arrow from "../images/arrow.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
    { id: uuid(), content: "first task" },
    { id: uuid(), content: "second task" },
];

const columnsFromBackend = {
    [uuid()]: {
        name: "Todo",
        items: itemsFromBackend,
    },
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) {
        return
    }
    const { source, destination} = result;
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
        ...columns,
        [source.droppableId]: {
            ...columns,
            items: copiedItems
        }
    })
}

const Build = () => {
    const [columns, setColumns] = useState(columnsFromBackend);

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
            <div className="build__pillbox"></div>
            <div className="build__sandbox">
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <Droppable droppableId={id} key={id}>
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
                                            }}
                                        >
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => {
                                                            return (
                                                                <div
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        userSelect: 'none',
                                                                        padding: 16,
                                                                        margin: '0 0 8px 0',
                                                                        minHeight: '50px',
                                                                        backgroundColor: snapshot.isDragging ? '#263b4a' : "#456c86",
                                                                        color: 'white',
                                                                        ...provided.draggableProps.style
                                                                    }}
                                                                >
                                                                    {item.content }
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
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
};

export default Build;

// <div className="build">
// <input
//     className="build__show"
//     type="checkbox"
//     name="show"
//     id="show"
// />
// <div className="build__components" id="build-container">
//     <p className="build__text">Components</p>
//     <img className="build__arrow" src={Arrow} alt="Down Arrow" />
// </div>
// <div className="build__pillbox">
//     <p className="build__pill">Text</p>
//     <p className="build__pill">Soundtrack</p>
//     <p className="build__pill">Book</p>
//     <p className="build__pill">Podcast</p>
//     <p className="build__pill">Movie</p>
//     <p className="build__pill">Link</p>
// </div>
// <div className="build__sandbox">
//     <div className="build__element">Text</div>
// </div>
// </div>
