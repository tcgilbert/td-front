import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    return (
        <div className="signup">
            <h1 className="signup__heading">Sign Up for your account</h1>
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
                    type="text"
                    name="password"
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
                    type="text"
                    name="confirmPassword"
                />
                <button className="signup__btn">Create Account</button>
            </div>
        </div>
    );
};

export default SignUp;
