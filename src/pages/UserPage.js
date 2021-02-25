import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import Loading from "../components/Loading";
import axios from "axios";

// Components
import FeedBlurb from "../components/feed/FeedBlurb";
import FeedLink from "../components/feed/FeedLink";
import FeedComment from "../components/feed/FeedComment";
import FeedSoundtrack from "../components/feed/FeedSoundtrack";
import FeedBook from "../components/feed/FeedBook";

//  Images
import User from "../images/user.svg";
import Work from "../images/portfolio.svg";
import Location from "../images/placeholder.svg";
import Logo from "../images/logo.svg";

const UserPage = (props) => {
    const [username, setUsername] = useState(props.match.params.username);
    const [about, setAbout] = useState("");
    const [content, setContent] = useState(null);
    const [contentLoading, setContentLoading] = useState(true);
    const [spotifyToken, setSpotifyToken] = useState(null);
    const history = useHistory()
    const SERVER = process.env.REACT_APP_SERVER;
    const spotifyEndpoint = "https://api.spotify.com/v1/";
    const spotifyId = process.env.REACT_APP_SPOTIFY_ID;
    const spotifySecret = process.env.REACT_APP_SPOTIFY_SECRET;
    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

    // Fetch spotify token
    useEffect(() => {
        const getToken = async () => {
            try {
                const apiRes = await fetch(
                    "https://accounts.spotify.com/api/token",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization:
                                "Basic " +
                                btoa(spotifyId + ":" + spotifySecret),
                        },
                        body: "grant_type=client_credentials",
                    }
                );
                const data = await apiRes.json();
                setSpotifyToken(data.access_token);
            } catch (error) {
                console.log(error);
            }
        };

        if (!spotifyToken) {
            getToken();
        }
    }, []);

    // Fetch the user's content
    useEffect(() => {
        const fetchContent = async () => {
            if (username && spotifyToken) {
                try {
                    const getUser = await axios.get(
                        `${SERVER}/users/unique/${username}`
                    );
                    const userId = await getUser.data.userId;
                    console.log(userId);
                    const apiRes = await axios.get(`${SERVER}/about/${userId}`);
                    const about = apiRes.data.about;
                    setAbout(about);
                    const apiRes2 = await axios.get(
                        `${SERVER}/content/getall/${userId}`
                    );
                    const content = apiRes2.data.userContent;
                    console.log(content);
                    await Promise.all(
                        content.map(async (ele) => {
                            if (
                                ele.type !== "soundtrack" &&
                                ele.type !== "book"
                            ) {
                                return ele;
                            } else if (ele.type === "soundtrack") {
                                let url;
                                if (ele.content.type === "show") {
                                    url = `${spotifyEndpoint}${ele.content.type}s/${ele.content.spotifyId}?market=US`;
                                } else {
                                    url = `${spotifyEndpoint}${ele.content.type}s/${ele.content.spotifyId}`;
                                }
                                let apiRes = await axios.get(url, {
                                    method: "GET",
                                    headers: {
                                        Authorization: "Bearer " + spotifyToken,
                                    },
                                });
                                let newContent = await apiRes.data;
                                if (ele.content.type === "album") {
                                    ele.content["artists"] = newContent.artists;
                                    ele.content["name"] = newContent.name;
                                    ele.content["images"] = newContent.images;
                                } else if (ele.content.type === "track") {
                                    ele.content["artists"] = newContent.artists;
                                    ele.content["name"] = newContent.name;
                                    ele.content["images"] =
                                        newContent.album.images;
                                    ele.content["album"] =
                                        newContent.album.name;
                                } else {
                                    ele.content["name"] = newContent.name;
                                    ele.content["images"] = newContent.images;
                                }
                                return ele;
                            } else {
                                let googleRes = await axios.get(
                                    `https://www.googleapis.com/books/v1/volumes/${ele.content.apiId}?key=${GOOGLE_API_KEY}`
                                );
                                let bookContent = await googleRes.data
                                    .volumeInfo;
                                console.log(bookContent);
                                ele.content["authors"] = bookContent.authors;
                                ele.content["imgUrl"] =
                                    bookContent.imageLinks.thumbnail;
                                return ele;
                            }
                        })
                    );
                    setContent(content);
                    setContentLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchContent();
    }, [spotifyToken]);

    // Grab the logo div from DOM
    useEffect(() => {
        const logoLink = document.getElementById("logo-link")
        logoLink.addEventListener("click", () => {
            history.push("/")
        })
    }, [])

    const handleLodaing = () => {
        if (contentLoading) {
            return <Loading />;
        } else {
            return handleContent();
        }
    };

    const handleContent = () => {
        if (content !== null) {
            const feed = content.map((ele, idx) => {
                if (ele.type === "soundtrack" && ele.show) {
                    return <FeedSoundtrack ele={ele} key={idx} />;
                } else if (ele.type === "link" && ele.show) {
                    return <FeedLink ele={ele} key={idx} />;
                } else if (ele.type === "blurb" && ele.show) {
                    return <FeedBlurb ele={ele} key={idx} />;
                } else if (ele.type === "comment" && ele.show) {
                    return <FeedComment ele={ele} key={idx} />;
                } else if (ele.type === "book" && ele.show) {
                    return <FeedBook ele={ele} key={idx} />;
                } else {
                    return;
                }
            });
            return feed;
        }
    };

    const handleWork = () => {
        if (about.workShow) {
            return (
                <div className="phone__icon-container">
                    <img className="phone__icon" src={Work} alt="Work Icon" />
                    <p className="about__text">{about.work}</p>
                </div>
            );
        }
    };

    const handleLocation = () => {
        if (about.locationShow) {
            return (
                <div className="phone__icon-container">
                    <img
                        className="phone__icon"
                        src={Location}
                        alt="Location Icon"
                    />
                    <p className="about__text">{about.location}</p>
                </div>
            );
        }
    };

    return (
        <div className="userpage">
            <div className="userpage__feed">
                <div className="phone__top">
                    <img
                        className="phone__profile-pic"
                        src={about.picture ? about.picture : User}
                        alt="Profile Picture"
                    />
                    <p className="phone__name">
                        {about.nameShow ? about.name : ""}
                    </p>
                    <p className="phone__username">@{username}</p>
                </div>
                <div className="phone__about">
                    {handleWork()}
                    {handleLocation()}
                </div>
                {handleLodaing()}
                <div id="logo-link" className="phone__logo-container">
                    <img className="phone__logo" src={Logo} alt="logo" />
                    <p className="phone__logo-text">thesedays</p>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
