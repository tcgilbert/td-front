import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
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
}));

const LogIn = (props) => {
    const classes = useStyles();
    const [values, handleChange] = useForm({ username: "", password: "" });
    const [noUser, setNoUser] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const SERVER = process.env.REACT_APP_SERVER;

    const handleSubmit = async () => {
        console.log(`${SERVER}/users/unique/${values.username}`);
        try {
            const checkUsername = await axios.get(`${SERVER}/users/unique/${values.username}`)
            if (noUser) {
                setNoUser(false)
            }
        } catch (error) {
            console.log(error);
            setNoUser(true)
            return;
        }
        const login = await props.handleLogin(values)
        if (login === false) {
            setWrongPassword(true)
        } else {
            setWrongPassword(false)
        }
    };

    return (
        <div className="signup">
            <Navigation />
            <h1 className="signup__heading">Log into your account</h1>
            <div className="signup__form">
                <form>
                    <TextField
                        className={classes.textField}
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.label,
                        }}
                        label="Username"
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={(e) => handleChange(e)}
                        error={noUser}
                        helperText={
                            noUser ? "No user with that username found" : ""
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
                        error={wrongPassword}
                        helperText={wrongPassword ? "Incorrect password" : ""}
                    />
                </form>
                <button onClick={() => handleSubmit()} className="signup__btn">
                    Log In
                </button>
                <p className="signup__text">
                    Don't have an account?{" "}
                    <Link to="/register" className="signup__link">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;
