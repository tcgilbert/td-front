import React from "react";
import Trash from "../../images/trash.svg";

const handleArtists = (array) => {
    if (array.length === 1) {
        return <p className="spotify__artist">{array[0].name}</p>;
    } else {
        const artists = array.map((artist, idx) => {
            return (
                <p key={idx}>
                    {artist.name}
                </p>
            );
        });
        return artists;
    }
};

const DndSpotify = (props) => {
    const { artists, name, images, type } = props.ele.content;

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
                <div>
                    <img className="sandbox__icon" src={Trash} alt="delete" />
                </div>
            </div>
            <div className="spotify__container">
                <img className="spotify__img" src={images[0].url} alt="Album Art"/>
                <div>
                    <p className="spotify__lead">{name}</p>
                    <p>{handleArtists(artists)}</p>
                </div>
            </div>
        </div>
    );
};

export default DndSpotify;
