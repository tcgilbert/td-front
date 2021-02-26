import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: "4%",
        left: "8%",
        transform: "translate(-50%, -50%)",
    },
    text: {
        marginTop: "1rem",
    },
}));

export default function LoadingCircle(props) {
    const classes = useStyles();

    const handleClass = () => {
        if (props.settings) {
            return (
                <div>
                    <CircularProgress color="secondary" size={20} />
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <CircularProgress color="secondary" size={20} />
                </div>
            );
        }
    };

    return (
      <>
      {handleClass()}
      </>
    );
}
