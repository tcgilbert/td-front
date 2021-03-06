import React, { useState, useEffect } from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";
import DeleteDiv from "./DeleteDiv";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { TextareaAutosize } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import useDidMount from "../../utils/useDidMount";

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
    const [show, setShow] = useState(props.ele.show);
    const SERVER = process.env.REACT_APP_SERVER;

    // Update save btn onchange
    useEffect(() => {
        if (document.getElementById("save-btn") && editSelected) {
            const save = document.getElementById("save-btn");
            if (save.classList.contains("blurb__nochange")) {
                if (
                    content !== props.ele.content.content ||
                    heading !== props.ele.content.heading
                ) {
                    save.classList.remove("blurb__nochange");
                    save.classList.add("blurb__save");
                }
            }
            if (save.classList.contains("blurb__save")) {
                if (
                    content === props.ele.content.content &&
                    heading === props.ele.content.heading
                ) {
                    save.classList.remove("blurb__save");
                    save.classList.add("blurb__nochange");
                }
            }
        }
    }, [content, heading, editSelected]);

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
        return;
    };

    useDidMount(() => {
        handleShowChange(show, props.ele.id);
    }, [show]);

    const handleDisplay = () => {
        if (deleteSelected) {
            setDeleteSelected(false);
        } else {
            setDeleteSelected(true);
        }
    };

    const contentChange = (e, type) => {
        type === "heading"
            ? setHeading(e.target.value)
            : setContent(e.target.value);
    };

    const handleSubmit = async () => {
        if (
            content === props.ele.content.content &&
            heading === props.ele.content.heading
        ) {
            return;
        } else {
            try {
                props.setPhoneLoading(true)
                const apiRes = await axios.put(`${SERVER}/blurb/update`, {
                    id: props.ele.content.id,
                    newContent: content,
                    newHeading: heading,
                });
                if (apiRes) {
                    const updatedBlurb = await apiRes.data.blurb;
                    const updatedContent = props.content.map((ele) => {
                        if (ele.id === props.ele.id) {
                            ele.content = updatedBlurb;
                        }
                        return ele;
                    });
                    props.setContent(updatedContent);
                    setEditSelected(false);
                    props.setPhoneLoading(false)
                }
            } catch (error) {
                console.log(error);
                props.setPhoneLoading(false)
            }
        }
    };

    const handleEdit = () => {
        if (editSelected) {
            return (
                <div className="blurb__container">
                    <TextField
                        type="text"
                        value={heading}
                        inputProps={{ className: classes.heading }}
                        onChange={(e) => contentChange(e, "heading")}
                    />
                    <TextareaAutosize
                        className={classes.content}
                        id="text-area"
                        type="text"
                        multiline
                        rowsMin={3}
                        variant="outlined"
                        value={content}
                        onChange={(e) => { 
                            if (content.length < 280 || e.nativeEvent.inputType === "deleteContentBackward") {
                                contentChange(e, "content")
                            }
                        }}
                    />
                    <div className="blurb__btns">
                        <button
                            onClick={() => {
                                setEditSelected(!editSelected);
                                setContent(props.ele.content.content);
                                setHeading(props.ele.content.heading);
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
                <div className="sandbox__options-container">
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

export default DndBlurb;
