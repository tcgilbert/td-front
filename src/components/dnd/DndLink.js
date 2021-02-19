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
        right: "3.6rem",
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

const DndLink = (props) => {
    const classes = useStyles();
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [editSelected, setEditSelected] = useState(false);
    const [url, setUrl] = useState(props.ele.content.url);
    const [title, setTitle] = useState(props.ele.content.title);
    const [show, setShow] = useState(props.ele.show);
    const SERVER = process.env.REACT_APP_SERVER;


    // Button logic and styling for save btn
    useEffect(() => {
        if (document.getElementById("save-btn") && editSelected) {
            const save = document.getElementById("save-btn");
            if (save.classList.contains("blurb__nochange")) {
                if (
                    url !== props.ele.content.url ||
                    title !== props.ele.content.title
                ) {
                    save.classList.remove("blurb__nochange");
                    save.classList.add("blurb__save");
                }
            }
            if (save.classList.contains("blurb__save")) {
                if (
                    url === props.ele.content.url &&
                    title === props.ele.content.title
                ) {
                    save.classList.remove("blurb__save");
                    save.classList.add("blurb__nochange");
                }
            }
        }
    }, [url, title, editSelected]);

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
            const apiRes = await axios.put(`${SERVER}/content/update/show`, {
                id: props.ele.id,
                show: bool,
            });
            if (apiRes) {
                props.setContentLoading(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useDidMount(() => {
        handleShowChange(show, props.ele.id);
    }, [show]);

    const handleSubmit = async () => {
        if (
            url === props.ele.content.url &&
            title === props.ele.content.title
        ) {
            return;
        } else {
            const apiRes = await axios.put(`${SERVER}/link/update`, {
                id: props.ele.content.id,
                newUrl: url,
                newTitle: title,
            });
            if (apiRes) {
                props.setContentLoading(true);
            }
        }
    };

    const handleEdit = () => {
        if (editSelected) {
            return (
                <div className="link__container">
                    <TextField
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        InputProps={{
                            className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className={classes.adornedStart}>
                                        Url:
                                    </span>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputProps={{
                            className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className={classes.adornedStart}>
                                        Title:
                                    </span>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className="blurb__btns">
                        <button
                            onClick={() => {
                                setEditSelected(!editSelected);
                                setUrl(props.ele.content.url);
                                setTitle(props.ele.content.title);
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
                <div className="link__container">
                    <p className="link__text">
                        <span className="link__pretext">Url: </span>
                        {props.ele.content.url}
                    </p>
                    <p className="link__text">
                        <span className="link__pretext">Title: </span>
                        {props.ele.content.title}
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
            <div className="link__tag">
                <p className="sandbox__label">Link</p>
                <div className="sandbox__options-container">
                    <FormControlLabel
                        control={
                            <SwitchBtn
                                checked={show}
                                onChange={() => setShow(!show)}
                            />
                        }
                    />
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

export default DndLink;
