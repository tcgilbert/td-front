import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    text: {
        marginTop: "1rem"
    }
}));

export default function LoadingCircle() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" size={80} />
      <h1 className={classes.text}>Loading...</h1>
    </div>
  );
}