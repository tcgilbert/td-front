import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import LoadingBar from "./LoadingBar";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
        alignSelf: "center",
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
        fontSize: "1.5rem",
        opacity: ".7",
        fontWeight: "300",
    },
    textArea: {
        marginTop: "1rem",
        width: "100%",
        alignSelf: "center",
    },
}));

const Blurb = (props) => {
    const classes = useStyles();
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [currentChars, setCurrentChars] = useState(0);
    const [contentError, setContentError] = useState(false)
    const SERVER = process.env.REACT_APP_SERVER;

    useEffect(() => {
        setCurrentChars(content.length)
        if (content.length > 280) {
            setContentError(true)
        } else {
            if (contentError) {
                setContentError(false)
            }
        }
        const button = document.getElementById("blurb-btn");
        if (heading !== "" || content !== "") {
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
    }, [heading, content]);

    const handleSubmit = async () => {
        if (heading !== "" || content !== "") {
            if (contentError) {
                return;
            }
            try {
                props.setPhoneLoading(true);
                const apiRes = await axios.post(`${SERVER}/blurb/create`, {
                    userId: props.user.id,
                    heading: heading,
                    content: content,
                });
                const newContent = await apiRes.data.reformatted;
                console.log(newContent);
                const copiedContent = [...props.content, newContent];
                props.setContent(copiedContent);
                setHeading("");
                setContent("");
                props.setPhoneLoading(false);
                props.setShow(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    };

    const handleLoading = () => {
        if (props.phoneLoading) {
            return <LoadingBar />;
        }
    };

    return (
        <div className="build__form">
            <h1 className="build__prompt">
                What have you been up to these days?
            </h1>
            <div className="blurb__relative">
                <p className="blurb__charlimit">{currentChars}/280</p>
            </div>
            <TextField
                className={classes.textField}
                InputProps={{
                    className: classes.inputHeading,
                }}
                InputLabelProps={{
                    className: classes.label,
                }}
                variant="outlined"
                label="Heading (optional)"
                type="text"
                name="heading"
                size="small"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
            />
            <TextField
                className={classes.textArea}
                rows={3}
                multiline
                variant="outlined"
                placeholder="Content"
                value={content}
                InputProps={{
                    className: classes.input,
                }}
                name="content"
                onChange={(e) => setContent(e.target.value)}
                error={contentError}
                helperText={contentError ? "Blurb must be less than 280 characters" : ""}
            />
            <button
                onClick={handleSubmit}
                id="blurb-btn"
                className="build__btn"
            >
                Add Blurb
            </button>
            {handleLoading()}
        </div>
    );
};

export default Blurb;
