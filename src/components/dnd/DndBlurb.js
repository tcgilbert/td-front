import React, { useState } from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";
import DeleteDiv from "./DeleteDiv";

const DndBlurb = (props) => {
    const [deleteSelected, setDeleteSelected] = useState(false);
    const handleDisplay = () => {
        if (deleteSelected) {
            setDeleteSelected(false);
        } else {
            setDeleteSelected(true);
        }
    };

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
                    <button className="sandbox__btn-wrap">
                        <img
                            className="sandbox__icon"
                            src={Edit}
                            alt="delete"
                        />
                    </button>
                    <button
                        className="sandbox__btn-wrap"
                        onClick={handleDisplay}
                    >
                        <img
                            className="sandbox__icon"
                            src={Trash}
                            alt="delete"
                        />
                    </button>
                </div>
            </div>
            <div className="blurb__container">
                <p className="blurb__heading">{props.ele.content.heading}</p>
                <p className="blurb__content">{props.ele.content.content}</p>
            </div>
            <DeleteDiv deleteSelected={deleteSelected} ele={props.ele} setDeleteSelected={setDeleteSelected} setContentLoading={props.setContentLoading}/>
        </div>
    );
};

export default DndBlurb;
