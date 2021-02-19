import React from "react";
import Work from "../images/portfolio.svg";
import Location from "../images/placeholder.svg";
import FeedBlurb from "./feed/FeedBlurb";
import FeedLink from "./feed/FeedLink";
import FeedSoundtrack from "./feed/FeedSoundtrack";

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
                if (ele.type === "soundtrack") {
                    return <FeedSoundtrack ele={ele} key={idx} />;
                } else if (ele.type === "link") {
                    return <FeedLink ele={ele} key={idx} />;
                } else {
                    return <FeedBlurb ele={ele} key={idx} />;
                }
            });
            return feed;
        }
    };

    return (
        <div className="phone">
            <div className="phone__content">
                <div className="phone__top">
                    <p className="phone__name">
                        {props.about.nameShow ? props.about.name : ""}
                    </p>
                    <p className="phone__username">@{props.user.username}</p>
                </div>
                <div className="phone__about">
                    {handleWork()}
                    {handleLocation()}
                </div>
                <div className="phone__content">{handleContent()}</div>
            </div>
        </div>
    );
};

export default Phone;
