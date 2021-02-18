import React from "react";
import Work from "../images/portfolio.svg";
import Location from "../images/placeholder.svg";

const Phone = (props) => {
    const handleAbout = () => {
        let display = [];
        if (props.about.workShow) {
            display.push(props.about.work);
        }
        if (props.about.locationShow) {
            display.push(props.about.location);
        }
        const returnInfo = display.map((ele, idx) => {
            return <p key={idx}>{ele}</p>;
        });
        return returnInfo;
    };

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
                <div className="phone__content">
                    
                </div>
            </div>
        </div>
    );
};

export default Phone;
