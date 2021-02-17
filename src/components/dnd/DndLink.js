import React, { useState } from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";
import DeleteDiv from "./DeleteDiv";

const DndLink = (props) => {
    const [deleteSelected, setDeleteSelected] = useState(false);
    const handleDisplay = () => {
        if (deleteSelected) {
            setDeleteSelected(false)
        } else {
            setDeleteSelected(true)
        }
    };

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
            <div className="link__tag">
                <p className="sandbox__label">Link</p>
                <div>
                    <button className="sandbox__btn-wrap">
                        <img
                            className="sandbox__icon"
                            src={Edit}
                            alt="delete"
                        />
                    </button>
                    <button className="sandbox__btn-wrap" onClick={handleDisplay}>
                        <img
                            className="sandbox__icon"
                            src={Trash}
                            alt="delete"
                        />
                    </button>
                </div>
            </div>
            <div className="link__container">
                <p className="link__text">{props.ele.content.url}</p>
                <p className="link__text">{props.ele.content.title}</p>
            </div>
            <DeleteDiv deleteSelected={deleteSelected} />
        </div>
    );
};

export default DndLink;
