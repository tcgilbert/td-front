import React, { useEffect, useState } from "react";
import axios from 'axios'
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
        alignSelf: "center",
    },
    textFieldTwo: {
        width: "100%",
        alignSelf: "center",
        marginTop: "1.3rem"
    },
    inputHeading: {
        fontSize: "2rem",
        fontWeight: "300",
    },
    input: {
        fontSize: "1.5rem",
        fontWeight: "300",
    },
    label: {
        fontSize: "1.7rem",
        opacity: ".7",
        fontWeight: "300",
    },
}));


const Link = (props) => {

    const classes = useStyles();
    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");
    const SERVER = process.env.REACT_APP_SERVER;

    // Classes for btn
    useEffect(() => {
        const button = document.getElementById("link-btn");
        if (link !== "" && title !== "") {
            if (button.classList.contains("build__submit")) {
                return;
            } else {
                button.classList.add("build__submit");
            }
        } else {
            if (button.classList.contains("build__submit")) {
                button.classList.remove("build__submit");
            } else {
                return;
            }
        }
    }, [link, title]);

    const handleSubmit = async () => {
        if (link === "" || title === "") {
            return
        } else {
            const apiRes = await axios.post(`${SERVER}/link/create`, {
                url: link,
                title: title,
                userId: props.user.id
            })
            if (apiRes) {
                props.setContentLoading(true)
            }
        }
    };

    return (
        <div className="build__form">
            <h1 className="build__prompt">
                Link to something cool.
            </h1>
            <TextField
                className={classes.textField}
                InputProps={{
                    className: classes.inputHeading,
                }}
                InputLabelProps={{
                    className: classes.label,
                }}
                size="small"
                variant="outlined"
                label="Url"
                type="text"
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <TextField
                className={classes.textFieldTwo}
                InputProps={{
                    className: classes.inputHeading,
                }}
                InputLabelProps={{
                    className: classes.label,
                }}
                size="small"
                variant="outlined"
                value={title}
                label="Title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleSubmit} id="link-btn" className="build__btn">
                Add Link
            </button>
        </div>
    )
}

export default Link
