import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import useForm from '../utils/useForm'

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
    adornedStart: {
        fontSize: '1.8rem',
        color: 'rgb(150, 150, 150)'
    }
}))

const SignUp = () => {
    const classes = useStyles();
    const [values, handleChange] = useForm({username: "", email: "", password: "", confirmPassword: ""})
    return (
        <div className="signup">
            <h1 className="signup__heading">Sign up for your account</h1>
            <div className="signup__form">
                <TextField
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                        startAdornment: <InputAdornment position="start"><span className={classes.adornedStart}>thesedays.io/</span></InputAdornment>
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
                    label="Email"
                    type="text"
                    name="email"
                    value={values.email}
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
                <TextField
                    className={classes.textField}
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange(e)}
                />
                <button className="signup__btn">Create Account</button>
            </div>
        </div>
    );
};

export default SignUp;
