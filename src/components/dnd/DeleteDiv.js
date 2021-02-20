import React from "react";
import axios from "axios";

const DeleteDiv = (props) => {

    const SERVER = process.env.REACT_APP_SERVER;

    const handleDelete = async () => {

        const deleteInfo = {
            contentId: props.ele.id,
            type: props.ele.type,
            typeId: props.ele.content.id,
            index: props.ele.index,
            userId: props.ele.userId
        }
        const apiRes = await axios.delete(`${SERVER}/content/delete`, {
            data: deleteInfo
        })
        if (apiRes) {
            const updatedContent = props.content.filter((ele) => ele.id !== props.ele.id)
            props.setContent(updatedContent);
        }
    }


    const handleDisplay = () => {
        if (props.deleteSelected) {
            return (
                <div id="delete" className="sandbox__delete">
                    <p className="sandbox__rusure">
                        Are you sure you want to delete?
                    </p>
                    <button onClick={() => props.setDeleteSelected(false)} className="sandbox__cancel-btn">Cancel</button>
                    <button onClick={handleDelete} className="sandbox__delete-btn">Delete</button>
                </div>
            );
        } else {
            return <div></div>;
        }
    };

    return (
        <>
            {handleDisplay()}
        </>
    );
};

export default DeleteDiv;
