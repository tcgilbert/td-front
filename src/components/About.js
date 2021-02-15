import React from "react";
import useForm from "../utils/useForm";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        display: "inline",
    },
    input: {
        fontSize: "1.5rem",
        fontWeight: "300",
    },
}));

const About = () => {
    const classes = useStyles();
    const [values, handleChange] = useForm({
        name: "",
        work: "",
        location: "",
    });

    return (
        <div className="about__form">
            <div className="about__input-div">
                <div className="about__input-label">
                    <label htmlFor="name" className="about__label">
                        Name
                    </label>
                    <TextField
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={(e) => handleChange(e)}
                        className={classes.textField}
                        inputProps={{ className: classes.input }}
                    />
                </div>
                <Switch
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    color="primary"
                    name="showName"
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            </div>
            <div className="about__input-div">
                <div className="about__input-label">
                    <label htmlFor="name" className="about__label">
                        Location
                    </label>
                    <TextField
                        id="location"
                        name="location"
                        value={values.location}
                        onChange={(e) => handleChange(e)}
                        className={classes.textField}
                        inputProps={{ className: classes.input }}
                    />
                </div>
                <Switch
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    color="primary"
                    name="showName"
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            </div>
            <div className="about__input-div">
                <div className="about__input-label">
                    <label htmlFor="name" className="about__label">
                        Work
                    </label>
                    <TextField
                        id="work"
                        name="work"
                        value={values.work}
                        onChange={(e) => handleChange(e)}
                        className={classes.textField}
                        inputProps={{ className: classes.input }}
                    />
                </div>
                <Switch
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    color="primary"
                    name="showName"
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            </div>
            <button className="about__submit">Save Changes</button>
        </div>
    );
};

export default About;
