import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import LoadingBar from "./LoadingBar"

const useStyles = makeStyles((theme) => ({
    textField: {
        display: "inline",
        width: "80%",
    },
    input: {
        fontSize: "1.5rem",
        fontWeight: "300",
    },
}));

const About = (props) => {
    const classes = useStyles();
    const SERVER = process.env.REACT_APP_SERVER;
    const [fileName, setFileName] = useState(props.about.fileName);
    const [name, setName] = useState(props.about.name);
    const [location, setLocation] = useState(props.about.location);
    const [work, setWork] = useState(props.about.work);
    const [nameCheck, setNameCheck] = useState(props.about.nameShow);
    const [locationCheck, setLocationCheck] = useState(
        props.about.locationShow
    );
    const [workCheck, setWorkCheck] = useState(props.about.workShow);
    const [profilePictureFile, setProfilePictureFile] = useState(null);

    // Update about
    const handleSubmit = async () => {
        if (checkForChange()) {
            if (checkForChangeText()) {
                props.setPhoneLoading(true)
                try {
                    const apiRes = await axios.put(`${SERVER}/about/update`, {
                        id: props.about.id,
                        name: name,
                        nameShow: nameCheck,
                        location: location,
                        locationShow: locationCheck,
                        work: work,
                        workShow: workCheck,
                    });
                    if (apiRes) {
                        props.setAbout(apiRes.data.updatedAbout);
                        props.setPhoneLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            if (profilePictureFile) {
                props.setPhoneLoading(true)
                const cloudinaryRes = await uploadImage(profilePictureFile);
                if (cloudinaryRes) {
                    setFileName(cloudinaryRes.data.about.fileName)
                    setProfilePictureFile(null)
                    props.setPhoneLoading(false)
                }
            }
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfilePictureFile(reader.result);
            setFileName(e.target.files[0].name);
        };
        return;
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const apiRes = await axios.post(
                `${SERVER}/cloudinary/profile-pic`,
                {
                    base64EncodedImage,
                    fileName,
                    userId: props.user.id,
                    publicId: props.about.pictureId
                }
            );
            return apiRes;
        } catch (error) {
            console.log(error);
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
        if (profilePictureFile) {
            changeMade = true;
        }
        return changeMade;
    };

    const checkForChangeText = () => {
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
    }, [
        name,
        nameCheck,
        location,
        locationCheck,
        work,
        workCheck,
        profilePictureFile,
    ]);

    const handleLoading = () => {
        if (props.phoneLoading) {
            return <LoadingBar />
        }
    }

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
                    onChange={() => {
                        name !== ""
                            ? setNameCheck(!nameCheck)
                            : setNameCheck(nameCheck);
                    }}
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
                    onChange={() => {
                        location !== ""
                            ? setLocationCheck(!locationCheck)
                            : setLocationCheck(locationCheck);
                    }}
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
                    onChange={() => {
                        work !== ""
                            ? setWorkCheck(!workCheck)
                            : setWorkCheck(workCheck);
                    }}
                    color="primary"
                    name="showName"
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            </div>
            <div className="about__input-div">
                <div className="about__file-container">
                    <label htmlFor="profile-pic" className="about__label">
                        Profile Picture -
                    </label>
                    <p className="about__filename">( {fileName} )</p>
                    <input
                        type="file"
                        name="profile-pic"
                        id="profile-pic"
                        onChange={handleFileInput}
                        className="about__profile-pic"
                        style={{ display: "none" }}
                    />
                </div>
                <button
                    onClick={() => {
                        document.getElementById("profile-pic").click();
                    }}
                    className="about__change-pic"
                >
                    Choose File
                </button>
            </div>
            <button
                id="about-btn"
                onClick={handleSubmit}
                className="about__btn"
            >
                Save Changes
            </button>
            {handleLoading()}
        </div>
    );
};

export default About;
