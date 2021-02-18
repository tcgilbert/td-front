import React, { useState, useEffect } from "react";
import Trash from "../../images/trash.svg";
import Edit from "../../images/edit.svg";
import DeleteDiv from "./DeleteDiv";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    input: {
        fontSize: "1.5rem",
        fontWeight: "400",
    },
    adornedStart: {
        fontWeight: "600"
    }
}));

const DndLink = (props) => {
    const classes = useStyles();
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [editSelected, setEditSelected] = useState(false);
    const [url, setUrl] = useState(props.ele.content.url);
    const [title, setTitle] = useState(props.ele.content.title);
    const SERVER = process.env.REACT_APP_SERVER;


    useEffect(() => {
        if (document.getElementById("save-btn") && editSelected) {
            const save = document.getElementById("save-btn");
            if (save.classList.contains("blurb__nochange")) {
                if (url !== props.ele.content.url || title !== props.ele.content.title) { 
                    save.classList.remove("blurb__nochange");
                    save.classList.add("blurb__save");
                }
            }
            if (save.classList.contains("blurb__save")) {
                if (url === props.ele.content.url && title === props.ele.content.title) {
                    save.classList.remove("blurb__save");
                    save.classList.add("blurb__nochange");
                }
            }
        }
    }, [url, title, editSelected])



    const handleDisplay = () => {
        if (deleteSelected) {
            setDeleteSelected(false);
        } else {
            setDeleteSelected(true);
        }
    };

    const handleSubmit = async () => {
        if (url === props.ele.content.url && title === props.ele.content.title) {
            return 
        } else {
            const apiRes = await axios.put(`${SERVER}/link/update`, {
                id: props.ele.content.id,
                newUrl: url,
                newTitle: title
            })
            if (apiRes) {
                props.setContentLoading(true)
            }
        }
    }

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
                <div>
                    <button onClick={() => {setEditSelected(!editSelected)}} className="sandbox__btn-wrap">
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
            {/* <div className="link__container">
                <p className="link__text">
                    <span className="link__pretext">Url: </span>
                    {props.ele.content.url}
                </p>
                <p className="link__text">
                    <span className="link__pretext">Title: </span>
                    {props.ele.content.title}
                </p>
            </div> */}
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
