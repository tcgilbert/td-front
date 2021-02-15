import React from "react";
import useForm from "../utils/useForm";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
        alignSelf: "center"
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
        fontWeight: "300"
    },
    textArea: {
        marginTop: '1rem',
        width: "100%",
        alignSelf: "center"
    }
}));

const Blurb = () => {
    const classes = useStyles();
    const [values, handleChange] = useForm({ heading: "", content: "" });

    return (
        <div className="build__form">
            <h1 className="build__prompt">What have you been up to?</h1>
            <TextField
                className={classes.textField}
                InputProps={{
                    className: classes.inputHeading,
                }}
                InputLabelProps={{
                    className: classes.label,
                }}
                variant="outlined"
                label="Heading"
                type="text"
                name="heading"
                value={values.username}
                onChange={(e) => handleChange(e)}
            />
            <TextField
                className={classes.textArea}
                rows={3}
                multiline
                variant="outlined"
                placeholder="Content"
                value={values.content}
                InputProps={{
                    className: classes.input,
                }}
                name="content"
                onChange={(e) => handleChange(e)}
            />
            <button className="build__submit">Add Blurb</button>
        </div>
    );
};

export default Blurb;
