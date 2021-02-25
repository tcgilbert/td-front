import React, { useState, useEffect } from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";
import DeleteDiv from "./DeleteDiv";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { grey } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import useDidMount from "../../utils/useDidMount";

const useStyles = makeStyles((theme) => ({
    input: {
        fontSize: "1.5rem",
        fontWeight: "400",
    },
    adornedStart: {
        fontWeight: "600",
    },
}));

const SwitchBtn = withStyles({
    root: {
        position: "absolute",
        right: "-4.9rem",
    },
    switchBase: {
        color: grey[300],
        opacity: 0.75,
        "&$checked": {
            color: "white",
            opacity: 1,
        },
        "&$checked + $track": {
            backgroundColor: grey[50],
        },
    },
    checked: {},
    track: {},
})(Switch);

const DndComment = (props) => {
    const classes = useStyles();
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [editSelected, setEditSelected] = useState(false);
    const [comment, setComment] = useState(props.ele.content.comment);
    const [show, setShow] = useState(props.ele.show);
    const SERVER = process.env.REACT_APP_SERVER;

    // Button logic and styling for save btn
    useEffect(() => {
        if (document.getElementById("save-btn") && editSelected) {
            const save = document.getElementById("save-btn");
            if (save.classList.contains("blurb__nochange")) {
                if (comment !== props.ele.content.comment) {
                    save.classList.remove("blurb__nochange");
                    save.classList.add("blurb__save");
                }
            }
            if (save.classList.contains("blurb__save")) {
                if (comment === props.ele.content.comment) {
                    save.classList.remove("blurb__save");
                    save.classList.add("blurb__nochange");
                }
            }
        }
    }, [comment, editSelected]);

    // toggle for delete div
    const handleDisplay = () => {
        if (deleteSelected) {
            setDeleteSelected(false);
        } else {
            setDeleteSelected(true);
        }
    };

    // Update show value on switch change
    const handleShowChange = async (bool, id) => {
        try {
            props.setPhoneLoading(true)
            const apiRes = await axios.put(`${SERVER}/content/update/show`, {
                id: props.ele.id,
                show: bool,
            });
            if (apiRes) {
                const updatedContent = props.content.map((ele) => {
                    if (ele.id === props.ele.id) {
                        ele.show = show;
                    }
                    return ele;
                });
                props.setContent(updatedContent);
                props.setPhoneLoading(false)
            }
        } catch (error) {
            console.log(error);
            props.setPhoneLoading(false)
        }
    };

    useDidMount(() => {
        handleShowChange(show, props.ele.id);
    }, [show]);

    const handleSubmit = async () => {
        if (comment === props.ele.content.comment) {
            return;
        } else {
            try {
                props.setPhoneLoading(true)
                const apiRes = await axios.put(`${SERVER}/comment/update`, {
                    id: props.ele.content.id,
                    newComment: comment
                });
                if (apiRes) {
                    const updatedComment = await apiRes.data.comment;
                    const updatedContent = props.content.map((ele) => {
                        if (ele.id === props.ele.id) {
                            ele.content = updatedComment;
                        }
                        return ele;
                    });
                    props.setContent(updatedContent);
                    setEditSelected(false);
                    props.setPhoneLoading(false)
                }
            } catch (error) {
                props.setPhoneLoading(false)
            }
        }
    };

    const handleEdit = () => {
        if (editSelected) {
            return (
                <div className="comment__container">
                    <TextField
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        InputProps={{
                            className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className={classes.adornedStart}>
                                        Comment:
                                    </span>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className="blurb__btns">
                        <button
                            onClick={() => {
                                setEditSelected(!editSelected);
                                setComment(props.ele.content.comment);
                            }}
                            className="blurb__cancel"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            id="save-btn"
                            className="blurb__nochange"
                        >
                            Save
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="comment__container">
                    <p className="comment__text">
                        <span className="comment__pretext">Comment: </span>
                        {props.ele.content.comment}
                    </p>
                </div>
            );
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
            <div className="comment__tag">
                <p className="sandbox__label">Comment</p>
                <div className="sandbox__options-container">
                    <button
                        onClick={() => {
                            setEditSelected(!editSelected);
                        }}
                        className="sandbox__btn-wrap"
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
                    <FormControlLabel
                        control={
                            <SwitchBtn
                                checked={show}
                                onChange={() => setShow(!show)}
                            />
                        }
                    />
                </div>
            </div>
            {handleEdit()}
            <DeleteDiv
                content={props.content}
                setContent={props.setContent}
                deleteSelected={deleteSelected}
                ele={props.ele}
                setDeleteSelected={setDeleteSelected}
                setContentLoading={props.setContentLoading}
                setPhoneLoading={props.setPhoneLoading}
            />
        </div>
    );
};

export default DndComment;
