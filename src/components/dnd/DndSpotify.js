import React from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";

const DndSpotify = (props) => {
    return (
        <div
            className="spotify"
            ref={props.provided.innerRef}
            {...props.provided.draggableProps}
            {...props.provided.dragHandleProps}
            style={{
                userSelect: "none",
                backgroundColor: props.snapshot.isDragging
                    ? "rgb(233, 233, 233)"
                    : "white",
                color: "black",
                ...props.provided.draggableProps.style,
            }}
        >
            <p>{props.ele.content.spotifyId}</p>
            <p>{props.ele.content.userId}</p>
        </div>
    );
};

export default DndSpotify;
