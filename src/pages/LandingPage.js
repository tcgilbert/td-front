import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Navigation from '../components/Navigation'

const LandingPage = (props) => {

    const history = useHistory()

    return (
        <div className="landing">
            <Navigation isAuthenticated={props.isAuthenticated} handleLogout={props.handleLogout}/>
            <h1 className="landing__heading">Let the world know what you are up to these days</h1>
            <button className="landing__btn" onClick={() => history.push("/register")}>Get started For Free</button>
        </div>
    )
}

export default LandingPage
