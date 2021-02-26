import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import axios from "axios";

//  Components
import PrivateNav from "../components/PrivateNav";
import Build from "../components/Build";
import Phone from "../components/Phone"
import Settings from "../components/Settings"

const ManageProfile = (props) => {
    const [location, setLocation] = useState("build");
    const [about, setAbout] = useState("");
    const [content, setContent] = useState(null);
    const [contentLoading, setContentLoading] = useState(true);
    const [spotifyToken, setSpotifyToken] = useState(null);
    const [phoneLoading, setPhoneLoading] = useState(false)
    const history = useHistory()
    const SERVER = process.env.REACT_APP_SERVER;
    const spotifyEndpoint = "https://api.spotify.com/v1/";
    const spotifyId = process.env.REACT_APP_SPOTIFY_ID;
    const spotifySecret = process.env.REACT_APP_SPOTIFY_SECRET;
    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


    // Handle mangage nav
    const handleDisplay = () => {
        if (location === "build") {
            return (
                <Build
                about={about}
                setAbout={setAbout}
                user={props.user}
                content={content}
                setContent={setContent}
                setContentLoading={setContentLoading}
                contentLoading={contentLoading}
                spotifyToken={spotifyToken}
                setPhoneLoading={setPhoneLoading}
                phoneLoading={phoneLoading}
            />
            )
        } else {
            return (
                <Settings user={props.user} setCurrentUser={props.setCurrentUser}/>
            )
        }
    }


    // Logout user once token expires
    useEffect(() => {

        if (props.isAuthenticated === false) {
            history.push("/")
        }

    }, [props.isAuthenticated])


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
            if (contentLoading && props.user.id && spotifyToken) {
                try {
                    setPhoneLoading(true)
                    
                    const apiRes = await axios.get(
                        `${SERVER}/about/${props.user.id}`
                    );
                    const about = apiRes.data.about;
                    setAbout(about);
                    const apiRes2 = await axios.get(
                        `${SERVER}/content/getall/${props.user.id}`
                    );
                    const content = apiRes2.data.userContent;
                    await Promise.all(content.map(async (ele) => {
                        if (ele.type !== "soundtrack" && ele.type !== "book") {
                            return ele
                        } else if (ele.type === "soundtrack") {
                            // console.log(ele.content);
                            let url;
                            if (ele.content.type === "show") {
                                url = `${spotifyEndpoint}${ele.content.type}s/${ele.content.spotifyId}?market=US`
                            } else {
                                url = `${spotifyEndpoint}${ele.content.type}s/${ele.content.spotifyId}`
                            }
                            let apiRes = await axios.get(url, 
                            {
                                method: "GET",
                                headers: {
                                    Authorization: "Bearer " + spotifyToken,
                                },
                            })
                            let newContent = await apiRes.data
                            if (ele.content.type === "album") {
                                ele.content["artists"] = newContent.artists
                                ele.content["name"] = newContent.name
                                ele.content["images"] = newContent.images
                            } else if (ele.content.type === "track"){ 
                                ele.content["artists"] = newContent.artists
                                ele.content["name"] = newContent.name
                                ele.content["images"] = newContent.album.images
                                ele.content["album"] = newContent.album.name
                            } else {
                                ele.content["name"] = newContent.name
                                ele.content["images"] = newContent.images
                            }
                            return ele
                        } else {
                            let googleRes = await axios.get(
                                `https://www.googleapis.com/books/v1/volumes/${ele.content.apiId}?key=${GOOGLE_API_KEY}`
                            );
                            let bookContent = await googleRes.data.volumeInfo
                            console.log(bookContent);
                            ele.content["authors"] = bookContent.authors
                            ele.content["imgUrl"] = bookContent.imageLinks.thumbnail
                            return ele
                        }
                    }))
                    setContent(content);
                    setPhoneLoading(false)
                    setContentLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchContent();
    }, [contentLoading, spotifyToken]);

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
                await axios.put(`${SERVER}/content/update`, {
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
                {handleDisplay()}
                {/* <Build
                    about={about}
                    setAbout={setAbout}
                    user={props.user}
                    content={content}
                    setContent={setContent}
                    setContentLoading={setContentLoading}
                    contentLoading={contentLoading}
                    spotifyToken={spotifyToken}
                    setPhoneLoading={setPhoneLoading}
                    phoneLoading={phoneLoading}
                /> */}
            </div>
            <div className="grid manage__grid4">
                <Phone phoneLoading={phoneLoading} user={props.user} about={about} content={content} contentLoading={contentLoading}/>
            </div>
        </div>
    );
};

export default ManageProfile;
