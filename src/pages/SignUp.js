import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import useForm from "../utils/useForm";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import axios from "axios";

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
    adornedStart: {
        fontSize: "1.8rem",
        color: "rgb(150, 150, 150)",
    },
}));

const SignUp = (props) => {
    const classes = useStyles();
    const [values, handleChange] = useForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [usernameEmpty, setUsernameEmpty] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const SERVER = process.env.REACT_APP_SERVER;

    const signupValidation = async () => {
        let errorPresent = false;
        if (emptyStrings()) {
            errorPresent = true;
        }
        const usernameRes = await checkForUsername();
        if (usernameRes) {
            errorPresent = true;
            setUsernameTaken(true);
        } else {
            setUsernameTaken(false);
        }
        if (values.password !== values.confirmPassword) {
            errorPresent = true;
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }
        if (!validateEmail(values.email)) {
            errorPresent = true;
            setInvalidEmail(true);
        } else {
            setInvalidEmail(false);
        }
        if (values.password.length < 8) {
            errorPresent = true;
            setPasswordLengthError(true);
        } else {
            setPasswordLengthError(false);
        }
        if (errorPresent) {
            return
        } else {
            props.handleSignUp(values)
        }
    };

    const checkForUsername = async () => {
        try {
            const apiRes = await axios.get(
                `${SERVER}/users/validate/${values.username}`
            );
            const isTaken = await apiRes.data.usernameTaken;
            if (apiRes) {
                return isTaken;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const emptyStrings = () => {
        let errorPresent = false;
        if (values.username === "") {
            errorPresent = true;
            setUsernameEmpty(true);
        } else {
            setUsernameEmpty(false);
        }
        if (values.email === "") {
            errorPresent = true;
            setEmailEmpty(true);
        } else {
            setEmailEmpty(false);
        }
        return errorPresent;
    };

    return (
        <div className="signup">
            <Navigation />
            <h1 className="signup__heading">Sign up for your account</h1>
            <div className="signup__form">
                <TextField
                    autoFocus
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <span className={classes.adornedStart}>
                                    thesedays.io/
                                </span>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        className: classes.label,
                    }}
                    label="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={(e) => handleChange(e)}
                    error={usernameTaken || usernameEmpty}
                    helperText={
                        usernameTaken
                            ? "Username not available"
                            : usernameEmpty
                            ? "Username is required"
                            : ""
                    }
                />
                <TextField
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        className: classes.label,
                    }}
                    label="Email"
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e)}
                    error={invalidEmail || emailEmpty}
                    helperText={
                        invalidEmail
                            ? "Invalid email address"
                            : emailEmpty
                            ? "Email is required"
                            : ""
                    }
                />
                <TextField
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        className: classes.label,
                    }}
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={(e) => handleChange(e)}
                    error={passwordLengthError || passwordMatchError}
                    helperText={
                        passwordLengthError
                            ? "Password must be at least 8 characters"
                            : passwordMatchError
                            ? "Passwords do not match"
                            : ""
                    }
                />
                <TextField
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        className: classes.label,
                    }}
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange(e)}
                    error={passwordLengthError || passwordMatchError}
                    helperText={
                        passwordLengthError
                            ? "Password must be at least 8 characters"
                            : passwordMatchError
                            ? "Passwords do not match"
                            : ""
                    }
                />
                <button
                    className="signup__btn"
                    onClick={() => signupValidation()}
                >
                    Create Account
                </button>
                {/* <button onClick={() => props.handleSignUp(values)} className="signup__btn">Create Account</button> */}
                <p className="signup__text">
                    Already have an account?{" "}
                    <Link to="/login" className="signup__link">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
