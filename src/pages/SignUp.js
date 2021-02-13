import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '90%',
        marginTop: '1rem,'
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
                    label="Name"
                    type="text"
                    name="name"
                />
            </div>
        </div>
    );
};

export default SignUp;
