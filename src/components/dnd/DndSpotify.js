import React, { useState } from "react";
import Trash from "../../images/trash.svg";
import DeleteDiv from "./DeleteDiv";
import { grey } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import useDidMount from "../../utils/useDidMount";

const handleArtists = (array) => {
    if (array.length === 1) {
        return <p className="spotify__artist">{array[0].name}</p>;
    } else {
        const artists = array.map((artist, idx) => {
            return <p key={idx}>{artist.name}</p>;
        });
        return artists;
    }
};

const SwitchBtn = withStyles({
    root: {
        position: "absolute",
        right: "-4.9rem",
    },
    switchBase: {
        color: grey[300],
        opacity: 0.75,
        "&$checked": {
            color: "white",
            opacity: 1,
        },
        "&$checked + $track": {
            backgroundColor: grey[50],
        },
    },
    checked: {},
    track: {},
})(Switch);

const DndSpotify = (props) => {
    const { artists, name, images, type } = props.ele.content;
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [show, setShow] = useState(props.ele.show);
    const SERVER = process.env.REACT_APP_SERVER;

    const handleDisplay = () => {
        if (deleteSelected) {
            setDeleteSelected(false);
        } else {
            setDeleteSelected(true);
        }
    };

    // Update show value on switch change
    const handleShowChange = async (bool, id) => {
        try {
            props.setPhoneLoading(true)
            const apiRes = await axios.put(`${SERVER}/content/update/show`, {
                id: props.ele.id,
                show: bool,
            });
            if (apiRes) {
                const updatedContent = props.content.map((ele) => {
                    if (ele.id === props.ele.id) {
                        ele.show = show;
                    }
                    return ele;
                });
                props.setContent(updatedContent);
                props.setPhoneLoading(false)
            }
        } catch (error) {
            console.log(error);
            props.setPhoneLoading(false)
        }
    };

    useDidMount(() => {
        handleShowChange(show, props.ele.id);
    }, [show]);

    const handleSoundtrackType = () => {
        if (type === "show") {
            return (
                <div
                className="spotify"
                ref={props.provided.innerRef}
                {...props.provided.draggableProps}
                {...props.provided.dragHandleProps}
                style={{
                    userSelect: "none",
                    backgroundColor: props.snapshot.isDragging
                        ? "rgb(233, 233, 233)"
                        : "white",
                    color: "black",
                    ...props.provided.draggableProps.style,
                }}
            >
                <div className="spotify__tag-pod">
                    <p className="sandbox__label">Podcast</p>
                    <div className="sandbox__options-container">
                        <button
                            className="sandbox__btn-wrap"
                            onClick={handleDisplay}
                        >
                            <img
                                className="sandbox__icon"
                                src={Trash}
                                alt="delete"
                            />
                        </button>
                        <FormControlLabel
                            control={
                                <SwitchBtn
                                    checked={show}
                                    onChange={() => setShow(!show)}
                                />
                            }
                        />
                    </div>
                </div>
                <div className="spotify__container">
                    <img
                        className="spotify__img"
                        src={images[0].url}
                        alt="Album Art"
                    />
                    <div>
                        <p className="spotify__lead">{name}</p>
                    </div>
                </div>
                <DeleteDiv
                    content={props.content}
                    setContent={props.setContent}
                    deleteSelected={deleteSelected}
                    ele={props.ele}
                    setDeleteSelected={setDeleteSelected}
                    setContentLoading={props.setContentLoading}
                />
            </div>
            )
        } else {
            return (
                <div
                className="spotify"
                ref={props.provided.innerRef}
                {...props.provided.draggableProps}
                {...props.provided.dragHandleProps}
                style={{
                    userSelect: "none",
                    backgroundColor: props.snapshot.isDragging
                        ? "rgb(233, 233, 233)"
                        : "white",
                    color: "black",
                    ...props.provided.draggableProps.style,
                }}
            >
                <div className="spotify__tag">
                    <p className="sandbox__label">Soundtrack - {type}</p>
                    <div className="sandbox__options-container">
                        <button
                            className="sandbox__btn-wrap"
                            onClick={handleDisplay}
                        >
                            <img
                                className="sandbox__icon"
                                src={Trash}
                                alt="delete"
                            />
                        </button>
                        <FormControlLabel
                            control={
                                <SwitchBtn
                                    checked={show}
                                    onChange={() => setShow(!show)}
                                />
                            }
                        />
                    </div>
                </div>
                <div className="spotify__container">
                    <img
                        className="spotify__img"
                        src={images[0].url}
                        alt="Album Art"
                    />
                    <div>
                        <p className="spotify__lead">{name}</p>
                        <p>{handleArtists(artists)}</p>
                    </div>
                </div>
                <DeleteDiv
                    content={props.content}
                    setContent={props.setContent}
                    deleteSelected={deleteSelected}
                    ele={props.ele}
                    setDeleteSelected={setDeleteSelected}
                    setContentLoading={props.setContentLoading}
                    setPhoneLoading={props.setPhoneLoading}
                />
            </div>
            )
        }
    }

    return (
        <>
        {handleSoundtrackType()}
        </>
    );
};

export default DndSpotify;
