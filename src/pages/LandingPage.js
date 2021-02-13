import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const LandingPage = () => {

    const history = useHistory()

    return (
        <div className="landing">
            <h1 className="landing__heading">Let the world know what you are up to these days</h1>
            <button className="landing__btn" onClick={() => history.push("/account")}>Get started For Free</button>
        </div>
    )
}

export default LandingPage
