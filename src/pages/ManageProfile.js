import React, { useState } from 'react'
import PrivateNav from '../components/PrivateNav'


const ManageProfile = (props) => {

    const [location, setLocation] = useState("build")

    return (
        <div className="manage">
            <PrivateNav user={props.user} handleLogout={props.handleLogout}/>
            <div className="grid manage__grid1">
                <ul className="manage__nav">
                    <div className="manage__container">
                        <button className="manage__nav" to="/manage">Build</button>
                        <div className="manage__underline"></div>
                    </div>
                    <div className="manage__container">
                        <button  className="manage__nav" to="/manage">Settings</button>
                        <div className="manage__underline"></div>
                    </div>
                </ul>
            </div>
            <div className="grid manage__grid2">

                <h1>Welcome to you're profileeee man</h1>
            </div>
            <div className="grid manage__grid3">

                <h1>Welcome to you're profileeee man</h1>
            </div>
            <div className="grid manage__grid4">

                <h1>Welcome to you're profileeee man</h1>
            </div>
            
        </div>
    )
}

export default ManageProfile
