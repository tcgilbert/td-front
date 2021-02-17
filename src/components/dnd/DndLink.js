import React from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";

const DndLink = (props) => {
    return (
        <div
            className="link"
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
            <div className="blurb__tag">
                <p className="blurb__label">Link</p>
                <div>
                    <img className="sandbox__icon" src={Edit} alt="delete" />
                    <img className="sandbox__icon" src={Trash} alt="delete" />
                </div>
            </div>
            <div className="link__container">
                <p>{props.ele.content.url}</p>
                <p>{props.ele.content.title}</p>
            </div>
        </div>
    );
};

export default DndLink;
