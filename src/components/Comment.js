import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingBar from "./LoadingBar"
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

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
        fontSize: "1.7rem",
        opacity: ".7",
        fontWeight: "300",
    },
}));

const Comment = (props) => {
    const classes = useStyles();
    const [comment, setComment] = useState("");
    const SERVER = process.env.REACT_APP_SERVER;

    // Classes for btn
    useEffect(() => {
        const button = document.getElementById("link-btn");
        if (comment !== "") {
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
    }, [comment]);

    const handleSubmit = async () => {
        if (comment === "") {
            return;
        } else {
            try {
                props.setPhoneLoading(true)
                const apiRes = await axios.post(`${SERVER}/comment/create`, {
                    comment: comment,
                    userId: props.user.id,
                });
                const newContent = await apiRes.data.reformatted;
                const copiedContent = [...props.content, newContent];
                props.setContent(copiedContent);
                props.setPhoneLoading(false)
                props.setShow(false)
                setComment("")
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleLoading = () => {
        if (props.phoneLoading) {
            return <LoadingBar />
        }
    }

    return (
        <div className="build__form">
            <h1 className="build__prompt">Add a comment to any of your posts</h1>
            <TextField
                InputProps={{
                    className: classes.inputHeading,
                }}
                InputLabelProps={{
                    className: classes.label,
                }}
                size="small"
                variant="outlined"
                value={comment}
                label="Comment"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleSubmit} id="link-btn" className="build__btn">
                Add Comment
            </button>
        </div>
    );
};

export default Comment;