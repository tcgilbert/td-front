import React, { useState } from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";
import DeleteDiv from "./DeleteDiv";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { TextareaAutosize } from "@material-ui/core";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
    blurb: {
        display: "flex",
        flexDirection: "column",
        padding: ".5rem",
    },
    heading: {
        fontSize: "1.8rem",
        fontWeight: "500",
    },
    content: {
        marginTop: ".5rem",
        resize: "vertical",
    },
    input: {
        fontSize: "2rem",
        fontWeight: "400",
    },
}));

const DndBlurb = (props) => {
    const classes = useStyles();
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [editSelected, setEditSelected] = useState(false);
    const [heading, setHeading] = useState(props.ele.content.heading);
    const [content, setContent] = useState(props.ele.content.content);
    const SERVER = process.env.REACT_APP_SERVER;

    const handleDisplay = () => {
        if (deleteSelected) {
            setDeleteSelected(false);
        } else {
            setDeleteSelected(true);
        }
    };

    const contentChange = (e) => {
        const save = document.getElementById("save-btn");
        setContent(e.target.value);
        if (save.classList.contains("blurb__nochange")) {
            save.classList.remove("blurb__nochange");
            save.classList.add("blurb__save");
        }
        if (save.classList.contains("blurb__save")) {
            if (content === props.ele.content.content) {
                save.classList.remove("blurb__save");
                save.classList.add("blurb__nochange");
            }
        }
    };
    
    const handleSubmit = async () => {
        if (content === props.ele.content.content) {
            return 
        } else {
            const apiRes = await axios.put(`${SERVER}/blurb/update`, {
                id: props.ele.content.id,
                newContent: content,
                newHeading: heading
            })
            if (apiRes) {
                props.setContentLoading(true)
            }
        }
    }

    const handleEdit = () => {
        if (editSelected) {
            return (
                <div className="blurb__container">
                    <TextField
                        type="text"
                        value={heading}
                        inputProps={{ className: classes.heading }}
                    />
                    <TextareaAutosize
                        className={classes.content}
                        id="text-area"
                        type="text"
                        multiline
                        rowsMin={3}
                        variant="outlined"
                        value={content}
                        onChange={(e) => contentChange(e)}
                    />
                    <div className="blurb__btns">
                        <button
                            onClick={() => {
                                setEditSelected(!editSelected);
                                setContent(props.ele.content.content);
                            }}
                            className="blurb__cancel"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSubmit} id="save-btn" className="blurb__nochange">
                            Save
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="blurb__container">
                    <p className="blurb__heading">
                        {props.ele.content.heading}
                    </p>
                    <p className="blurb__content">
                        {props.ele.content.content}
                    </p>
                </div>
            );
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
                    <button
                        className="sandbox__btn-wrap"
                        onClick={() => {
                            setEditSelected(!editSelected);
                            setContent(props.ele.content.content);
                        }}
                    >
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
            {handleEdit()}
            <DeleteDiv
                deleteSelected={deleteSelected}
                ele={props.ele}
                setDeleteSelected={setDeleteSelected}
                setContentLoading={props.setContentLoading}
            />
        </div>
    );
};

export default DndBlurb;
