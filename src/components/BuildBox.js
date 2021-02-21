import React, { useEffect, useState } from "react";
import Blurb from "./Blurb";
import About from "./About";
import Link from "./Link";
import Soundtrack from "./Soundtrack";

const BuildBox = (props) => {
    const [buildOption, setBuildOption] = useState("about");

    // For build options
    useEffect(() => {
        if (props.show) {
            const about = document.getElementById("about");
            const blurbs = document.getElementById("blurbs");
            const soundtrack = document.getElementById("soundtrack");
            const links = document.getElementById("links");

            const buildOptions = [about, blurbs, soundtrack, links];
            buildOptions.forEach((opt) => {
                if (opt.id === buildOption) {
                    opt.classList.add("build__selected");
                } else {
                    if (opt.classList.contains("build__selected")) {
                        opt.classList.remove("build__selected");
                    }
                }
            });
        }
    }, [buildOption]);

    const handleForms = () => {
        if (props.contentLoading) {
            return;
        } else {
            switch (buildOption) {
                case "about":
                    return (
                        <About
                            phoneLoading={props.phoneLoading}
                            setPhoneLoading={props.setPhoneLoading}
                            user={props.user}
                            about={props.about}
                            setAbout={props.setAbout}
                        />
                    );
                case "blurbs":
                    return (
                        <Blurb
                            user={props.user}
                            setContentLoading={props.setContentLoading}
                            setContent={props.setContent}
                            content={props.content}
                        />
                    );
                case "links":
                    return (
                        <Link
                            user={props.user}
                            setContentLoading={props.setContentLoading}
                            setContent={props.setContent}
                            content={props.content}
                        />
                    );
                case "soundtrack":
                    return (
                        <Soundtrack
                            user={props.user}
                            setContentLoading={props.setContentLoading}
                            spotifyToken={props.spotifyToken}
                            setContent={props.setContent}
                            content={props.content}
                        />
                    );
            }
        }
    };

    return (
        <div className="build__options">
            <div className="build__pillbox">
                <p
                    onClick={() => setBuildOption("about")}
                    id="about"
                    className="build__pill"
                >
                    About
                </p>
                <p
                    onClick={() => setBuildOption("blurbs")}
                    id="blurbs"
                    className="build__pill"
                >
                    Blurbs
                </p>
                <p
                    onClick={() => setBuildOption("links")}
                    id="links"
                    className="build__pill"
                >
                    Links
                </p>
                <p
                    onClick={() => setBuildOption("soundtrack")}
                    id="soundtrack"
                    className="build__pill"
                >
                    Soundtrack
                </p>
            </div>
            <div className="build__form-container">{handleForms()}</div>
        </div>
    );
};

export default BuildBox;
