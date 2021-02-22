import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// components
import DndBlurb from "./dnd/DndBlurb";
import DndLink from "./dnd/DndLink";
import DndSpotify from "./dnd/DndSpotify";

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
        copiedContent[i].index = i;
    }
    setContent(copiedContent);
};


const Sandbox = (props) => {
    
    // handle content type
    const handleContent = (ele, provided, snapshot) => {
        if (ele.type === "blurb") {
            return <DndBlurb content={props.content} setContent={props.setContent} provided={provided} snapshot={snapshot} ele={ele} setContentLoading={props.setContentLoading}/>;
        } else if (ele.type === "link") {
            return <DndLink content={props.content} setContent={props.setContent} provided={provided} snapshot={snapshot} ele={ele} setContentLoading={props.setContentLoading}/>;
        } else if (ele.type === "soundtrack") {
            return <DndSpotify content={props.content} setContent={props.setContent} provided={provided} snapshot={snapshot} ele={ele} setContentLoading={props.setContentLoading}/>;
        }
    };
    
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
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    width: "80%",
                                    height: "auto",
                                    margin: "2rem 0",
                                    borderRadius: '1rem'
                                }}
                            >
                                {props.content.map((ele, idx) => {
                                    return (
                                        <Draggable
                                            key={ele.id}
                                            draggableId={ele.id.toString()}
                                            index={idx}
                                        >
                                            {(provided, snapshot) => {
                                                return handleContent(
                                                    ele,
                                                    provided,
                                                    snapshot
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
    );
};

export default Sandbox;
