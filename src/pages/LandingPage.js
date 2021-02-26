import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import Alert from "@material-ui/lab/Alert";
import HomePagePhoto from "../images/home-page.png"

const LandingPage = (props) => {
    const history = useHistory();

    const handleAlert = () => {
        if (props.showAlert) {
            return (
                <Alert
                    className="landing__alert"
                    severity="warning"
                    onClose={() => {
                        props.setShowAlert(false);
                    }}
                >
                    <span className="landing__alert-text">
                        Your session has expired.
                    </span>
                </Alert>
            );
        } else {
            return;
        }
    };

    return (
        <div className="landing">
            <Navigation
                isAuthenticated={props.isAuthenticated}
                handleLogout={props.handleLogout}
            />
            {handleAlert()}

            <div className="landing__container">
                <div>
                    <img className="landing__photo" src={HomePagePhoto} alt="Display Preview"/>
                </div>
                <div className="landing__small-container">
                    <h1 className="landing__heading">
                        Let the world know what you are up to these days
                    </h1>
                    <button
                        className="landing__btn"
                        onClick={() => history.push("/register")}
                    >
                        Get started For Free
                    </button>
                    <div className="landing__example">
                        <p className="landing__example-text">thesedays.io/<span className="landing__example-faint">yournamehere</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
