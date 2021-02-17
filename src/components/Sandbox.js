import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// dnd functions
const onDragEnd = (result, content, setContent) => {
    if (!result.destination) {
        return;
    }
    const { source, destination } = result;
    const copiedContent = [...content];
    const [removed] = copiedContent.splice(source.index, 1);
    copiedContent.splice(destination.index, 0, removed);
    for (let i = 0; i < copiedContent.length; i++) {
        copiedContent[i].index = i
    }
    setContent(copiedContent);
};

// handle content type
const handleContent = (ele, provided, snapshot) => {
    if (ele.type === "blurb") {
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    minHeight: "50px",
                    backgroundColor: snapshot.isDragging
                        ? "#263b4a"
                        : "#456c86",
                    color: "white",
                    ...provided
                        .draggableProps
                        .style,
                }}
            >
                <p>{ele.content.heading}</p>
                <p>{ele.content.content}</p>
            </div>
        );
    } else if (ele.type === "link") {
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    minHeight: "50px",
                    backgroundColor: snapshot.isDragging
                        ? "#263b4a"
                        : "#456c86",
                    color: "white",
                    ...provided
                        .draggableProps
                        .style,
                }}
            >
                <p>{ele.content.url}</p>
                <p>{ele.content.title}</p>
            </div>
        );
    } else if (ele.type === "soundtrack") {
        return (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                userSelect: "none",
                padding: 16,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: snapshot.isDragging
                    ? "#263b4a"
                    : "#456c86",
                color: "white",
                ...provided
                    .draggableProps
                    .style,
            }}
        >
            <p>{ele.content.spotifyId}</p>
            <p>{ele.content.userId}</p>
        </div>
        )
    }
   
}

const Sandbox = (props) => {
    // console.log(props.content);
    return (
        <div className="sandbox">
            <DragDropContext
                onDragEnd={(result) =>
                    onDragEnd(result, props.content, props.setContent)
                }
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
                                    width: "80%",
                                    height: "auto",
                                    margin: "2rem 0",
                                }}
                            >
                                {props.content.map((ele, idx) => {
                                    console.log(ele.type);
                                    return (
                                        <Draggable
                                            key={ele.id}
                                            draggableId={ele.id.toString()}
                                            index={idx}
                                        >
                                            {(provided, snapshot) => {
                                                return handleContent(ele, provided, snapshot)
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
    );
};

export default Sandbox;
