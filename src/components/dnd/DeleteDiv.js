import React from "react";

const DeleteDiv = (props) => {


    


    const handleDisplay = () => {
        if (props.deleteSelected) {
            return (
                <div id="delete" className="sandbox__delete">
                    <p className="sandbox__rusure">
                        Are you sure you want to delete?
                    </p>
                    <button className="sandbox__cancel-btn">Cancel</button>
                    <button className="sandbox__delete-btn">Delete</button>
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
