import React from "react";
import useForm from "../utils/useForm";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "90%",
        marginTop: "2rem",
    },
    input: {
        fontSize: "2rem",
        fontWeight: "300",
    },
    label: {
        fontSize: "1.5rem",
    },
}));

const Text = () => {
    const classes = useStyles();
    const [values, handleChange] = useForm({ heading: "", content: "" });

    return (
        <div className="build__form">
            <TextField
                className={classes.textField}
                InputProps={{
                    className: classes.input,
                }}
                // InputLabelProps={{
                //     className: classes.label,
                // }}
                label="Heading"
                type="text"
                name="heading"
                value={values.username}
                onChange={(e) => handleChange(e)}
            />
            <TextareaAutosize
                // aria-label="minimum height"
                rowsMin={3}
                placeholder="Minimum 3 rows"
                value={values.content}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default Text;
