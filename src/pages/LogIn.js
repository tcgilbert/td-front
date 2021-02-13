import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../utils/useForm'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '90%',
        marginTop: '2rem',
    },
    input: {
        fontSize: '2rem',
        fontWeight: '300'
    },
    label: {
        fontSize: '1.5rem'
    },
}))

const LogIn = (props) => {
    const classes = useStyles();
    const [values, handleChange] = useForm({username: "", password: ""})
    return (
        <div className="signup">
            <h1 className="signup__heading">Log into your account</h1>
            <div className="signup__form">
                <TextField
                    className={classes.textField}
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                    label="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    className={classes.textField}
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={(e) => handleChange(e)}
                />
                <button onClick={() => props.handleLogin(values)} className="signup__btn">Log In</button>
                <p className="signup__text">Don't have an account? <Link to='/register' className="signup__link">Register</Link></p>
            </div>
        </div>
    );
};

export default LogIn;
