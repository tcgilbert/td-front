import React, { useState, useEffect } from "react";
import PrivateNav from "../components/PrivateNav";

const ManageProfile = (props) => {
    const [location, setLocation] = useState("build");

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
                <h1>Welcome to you're profileee!!man</h1>
            </div>
            <div className="grid manage__grid4">
                <h1>Welcome to you're profileeee man</h1>
            </div>
        </div>
    );
};

export default ManageProfile;
