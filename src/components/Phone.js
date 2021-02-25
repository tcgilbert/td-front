import React from "react";
import Work from "../images/portfolio.svg";
import Location from "../images/placeholder.svg";
import FeedBlurb from "./feed/FeedBlurb";
import FeedLink from "./feed/FeedLink";
import FeedComment from "./feed/FeedComment";
import FeedSoundtrack from "./feed/FeedSoundtrack";
import FeedBook from "./feed/FeedBook";
import User from "../images/user.svg";
import LoadingPhone from "./LoadingPhone";
import Logo from "../images/logo.svg";

const Phone = (props) => {
    const handleWork = () => {
        if (props.about.workShow) {
            return (
                <div className="phone__icon-container">
                    <img className="phone__icon" src={Work} alt="Work Icon" />
                    <p className="about__text">{props.about.work}</p>
                </div>
            );
        }
    };

    const handleLocation = () => {
        if (props.about.locationShow) {
            return (
                <div className="phone__icon-container">
                    <img
                        className="phone__icon"
                        src={Location}
                        alt="Location Icon"
                    />
                    <p className="about__text">{props.about.location}</p>
                </div>
            );
        }
    };

    const handleContent = () => {
        if (props.content !== null) {
            const feed = props.content.map((ele, idx) => {
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

    const handleLoading = () => {
        if (props.phoneLoading) {
            return <LoadingPhone />;
        }
    };

    const handleProfilePic = () => {
        if (props.about.picture) {
            return (
                <img
                    className="phone__profile-pic"
                    src={props.about.picture}
                    alt="Profile Picture"
                />
            );
        } else {
            return (
                <img
                    className="phone__profile-pic-default"
                    src={User}
                    alt="Profile Picture"
                />
            );
        }
    };

    return (
        <div className="phone">
            {handleLoading()}
            <div className="phone__content-container">
                <div className="phone__content">
                    <div className="phone__wrapper">
                        <div className="phone__top">
                            {handleProfilePic()}
                            <p className="phone__name">
                                {props.about.nameShow ? props.about.name : ""}
                            </p>
                            <p className="phone__username">
                                @{props.user.username}
                            </p>
                        </div>
                        <div className="phone__about">
                            {handleWork()}
                            {handleLocation()}
                        </div>
                        <div className="phone__content">{handleContent()}</div>
                        <div className="phone__push"></div>
                    </div>
                    <div className="phone__logo-container">
                        <img className="phone__logo" src={Logo} alt="logo" />
                        <p className="phone__logo-text">thesedays</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Phone;
