import React, { useState, useEffect } from "react";
import axios from "axios"

//  Components
import PrivateNav from "../components/PrivateNav";
import Build from "../components/Build"

const ManageProfile = (props) => {

    const [location, setLocation] = useState("build");
    const [about, setAbout] = useState("")
    const SERVER = process.env.REACT_APP_SERVER;

    // Fetching user content
    useEffect(() => {
        const fetchContent = async () => {
            const content = await axios.get(`${SERVER}/about/${props.user.id}`)
            setAbout(content.data.about)
        }
        fetchContent()
    }, [])

    // DOM elements for nav
    useEffect(() => {
        const build = document.getElementById("line-one");
        const settings = document.getElementById("line-two");

        const handleLocation = () => {
            switch (location) {
                case "build":
                    settings.classList.remove("manage__selected");
                    settings.classList.add("manage__underline");
                    build.classList.remove("manage__underline");
                    build.classList.add("manage__selected");
                    break;
                    case "settings":
                    build.classList.add("manage__underline");
                    build.classList.remove("manage__selected");
                    settings.classList.remove("manage__underline");
                    settings.classList.add("manage__selected");
                    break;
            }
        };
        handleLocation();
    }, [location]);

    const handleAbout = () => {
        let display = []
        if (about.workShow) {
            display.push(about.work)
        }
        if (about.locationShow) {
            display.push(about.location)
        }
        if (about.nameShow) {
            display.push(about.name)
        }
        display.map((ele, idx) => {
            return (
                <p key={idx}>{ele}</p>
            )
        })
    }

    return (
        <div className="manage">
            <PrivateNav user={props.user} handleLogout={props.handleLogout} />
            <div className="grid manage__grid1">
                <ul className="manage__list">
                    <div className="manage__container">
                        <button
                            onClick={() => setLocation("build")}
                            className="manage__nav"
                            to="/manage"
                        >
                            Build
                        </button>
                        <div id="line-one" className="manage__underline"></div>
                    </div>
                    <div className="manage__container">
                        <button
                            onClick={() => setLocation("settings")}
                            className="manage__nav"
                            to="/manage"
                        >
                            Settings
                        </button>
                        <div id="line-two" className="manage__underline"></div>
                    </div>
                </ul>
            </div>
            <div className="grid manage__grid2">
                <p className="manage__text">Your link: <a className="manage__thelink" href={`https://thesedays.io/${props.user.username}`} target="_blank">{`https://thesedays.io/${props.user.username}`}</a></p>
            </div>
            <div className="grid manage__grid3">
                <Build about={about} setAbout={setAbout}/>
            </div>
            <div className="grid manage__grid4">
                <div className="phone">
                    <div className="phone__content">
                        <p className="phone__username">@{props.user.username}</p>
                        {handleAbout()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;
