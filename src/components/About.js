import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        display: "inline",
        width: "80%"
    },
    input: {
        fontSize: "1.5rem",
        fontWeight: "300",
    },
}));

const About = (props) => {
    const classes = useStyles();
    const SERVER = process.env.REACT_APP_SERVER;

    const [name, setName] = useState(props.about.name);
    const [location, setLocation] = useState(props.about.location);
    const [work, setWork] = useState(props.about.work);
    const [nameCheck, setNameCheck] = useState(props.about.nameShow);
    const [locationCheck, setLocationCheck] = useState(
        props.about.locationShow
    );
    const [workCheck, setWorkCheck] = useState(props.about.workShow);

    // Update about
    const handleSubmit = async () => {
        if (checkForChange()) {
            const apiRes = await axios.put(`${SERVER}/about/update`, {
                id: props.about.id,
                name: name,
                nameShow: nameCheck,
                location: location,
                locationShow: locationCheck,
                work: work,
                workShow: workCheck,
            });
            props.setAbout(apiRes.data.updatedAbout);
        }
    };

    // For submit button
    const checkForChange = () => {
        let changeMade = false;
        if (props.about.name !== name) {
            changeMade = true;
        }
        if (props.about.location !== location) {
            changeMade = true;
        }
        if (props.about.work !== work) {
            changeMade = true;
        }
        if (props.about.nameShow !== nameCheck) {
            changeMade = true;
        }
        if (props.about.locationShow !== locationCheck) {
            changeMade = true;
        }
        if (props.about.workShow !== workCheck) {
            changeMade = true;
        }
        return changeMade;
    };

    useEffect(() => {
        const button = document.getElementById("about-btn");
        if (checkForChange()) {
            if (button.classList.contains("about__submit")) {
                return;
            } else {
                button.classList.add("about__submit");
            }
        } else {
            if (button.classList.contains("about__submit")) {
                button.classList.remove("about__submit");
            } else {
                return;
            }
        }
    }, [name, nameCheck, location, locationCheck, work, workCheck]);

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={classes.textField}
                        inputProps={{ className: classes.input }}
                    />
                </div>
                <Switch
                    checked={nameCheck}
                    onChange={() => setNameCheck(!nameCheck)}
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
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={classes.textField}
                        inputProps={{ className: classes.input }}
                    />
                </div>
                <Switch
                    checked={locationCheck}
                    onChange={() => setLocationCheck(!locationCheck)}
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
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                        className={classes.textField}
                        inputProps={{ className: classes.input }}
                    />
                </div>
                <Switch
                    checked={workCheck}
                    onChange={() => setWorkCheck(!workCheck)}
                    color="primary"
                    name="showName"
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            </div>
            <button
                id="about-btn"
                onClick={handleSubmit}
                className="about__btn"
            >
                Save Changes
            </button>
        </div>
    );
};

export default About;
