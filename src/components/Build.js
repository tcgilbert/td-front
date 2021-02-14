import React, { useEffect, useState } from "react";
import Arrow from "../images/arrow.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";




const onDragEnd = (result, setPills) => {
    if (!result.destination) {
        return;
    }
    
}

const Build = () => {

    return (
        <div className="build">
            <div className="build__sandbox">
                <button className="build__btn">Add New Component</button>
            </div>
        </div>
    );
};

export default Build;


