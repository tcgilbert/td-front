import React, { useEffect, useState } from "react";
import Arrow from "../images/arrow.svg";

// components
import Sandbox from "../components/Sandbox";
import BuildBox from "../components/BuildBox";

const Build = (props) => {
    const [show, setShow] = useState(false);

    const handleLoading = () => {
        if (props.contentLoading) {
            return;
        } else {
            return (
                <Sandbox
                    content={props.content}
                    setContentLoading={props.setContentLoading}
                    setContent={props.setContent}
                    about={props.about}
                />
            );
        }
    };

    const handleDisplay = () => {
        if (show) {
            return (
                <BuildBox
                    content={props.content}
                    setContent={props.setContent}
                    setContentLoading={props.setContentLoading}
                    user={props.user}
                    about={props.about}
                    setAbout={props.setAbout}
                    show={show}
                    setPhoneLoading={props.setPhoneLoading}
                    phoneLoading={props.phoneLoading}
                />
            );
        } else {
            return;
        }
    };

    return (
        <div className="build">
            <div onClick={() => setShow(!show)} className="build__components" id="build-container">
                <p className="build__text">Components</p>
                <img className={show ? "build__arrow" : "build__arrow build__arrow-down"} src={Arrow} alt="Down Arrow" />
            </div>
            {handleDisplay()}
            {handleLoading()}
        </div>
    );
};

export default Build;
