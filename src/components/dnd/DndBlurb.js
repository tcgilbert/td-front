import React from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";

const DndBlurb = (props) => {
    return (
        <div
            className="blurb"
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
                <p className="blurb__label">Blurb</p>
                <div>
                    <img className="sandbox__icon" src={Edit} alt="delete" />
                    <img className="sandbox__icon" src={Trash} alt="delete" />
                </div>
            </div>
            <div className="blurb__container">
                <p className="blurb__heading">{props.ele.content.heading}</p>
                <p className="blurb__content">{props.ele.content.content}</p>
            </div>
        </div>
    );
};

export default DndBlurb;
