import React, { useState, useEffect } from "react";
import axios from "axios";

//  Components
import PrivateNav from "../components/PrivateNav";
import Build from "../components/Build";

const ManageProfile = (props) => {
    const [location, setLocation] = useState("build");
    const [about, setAbout] = useState("");
    const [content, setContent] = useState(null);
    const [contentLoading, setContentLoading] = useState(true);
    const [spotifyToken, setSpotifyToken] = useState(null);
    const SERVER = process.env.REACT_APP_SERVER;
    const spotifyId = process.env.REACT_APP_SPOTIFY_ID;
    const spotifySecret = process.env.REACT_APP_SPOTIFY_SECRET;

    // Fetch spotify token
    useEffect(() => {
        const getToken = async () => {
            try {
                const apiRes = await fetch(
                    "https://accounts.spotify.com/api/token",
                    {   
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": "Basic " + btoa(spotifyId + ":" + spotifySecret)
                        },
                        body: "grant_type=client_credentials",
                    }
                );
                const data = await apiRes.json()
                setSpotifyToken(data.access_token)
                
            } catch (error) {
                console.log(error);
            }
        };

        if (!spotifyToken) {
            getToken();
        }
    }, []);

    // Fetching user content
    useEffect(() => {
        const fetchContent = async () => {
            if (contentLoading && props.user.id) {
                try {
                    const apiRes = await axios.get(
                        `${SERVER}/about/${props.user.id}`
                    );
                    const about = apiRes.data.about;
                    setAbout(about);
                    const apiRes2 = await axios.get(
                        `${SERVER}/content/getall/${props.user.id}`
                    );
                    const content = apiRes2.data.userContent;
                    setContent(content);
                    setContentLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchContent();
    }, [contentLoading]);

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

    // update content order on change
    useEffect(() => {
        const updateContent = async () => {
            try {
                const apiRes = await axios.put(`${SERVER}/content/update`, {
                    content,
                    userId: props.user.id,
                });
            } catch (error) {
                console.log(error);
            }
        };
        if (content !== null) {
            updateContent();
        }
    }, [content]);

    const handleAbout = () => {
        let display = [];
        if (about.workShow) {
            display.push(about.work);
        }
        if (about.locationShow) {
            display.push(about.location);
        }
        if (about.nameShow) {
            display.push(about.name);
        }
        const returnInfo = display.map((ele, idx) => {
            return <p key={idx}>{ele}</p>;
        });
        return returnInfo;
    };



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
                <p className="manage__text">
                    Your link:{" "}
                    <a
                        className="manage__thelink"
                        href={`https://thesedays.io/${props.user.username}`}
                        target="_blank"
                    >{`https://thesedays.io/${props.user.username}`}</a>
                </p>
            </div>
            <div className="grid manage__grid3">
                <Build
                    about={about}
                    setAbout={setAbout}
                    user={props.user}
                    content={content}
                    setContent={setContent}
                    setContentLoading={setContentLoading}
                    contentLoading={contentLoading}
                />
            </div>
            <div className="grid manage__grid4">
                <div className="phone">
                    <div className="phone__content">
                        <p className="phone__username">
                            @{props.user.username}
                        </p>
                        <div className="phone__about">{handleAbout()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;
