import React from "react";

const handleArtists = (array) => {
    if (array.length === 1) {
        return <p className="feedsound__artist">{array[0].name}</p>;
    } else {
        const artists = array.map((artist, idx) => {
            return (
                <p className="feedsound__artist" key={idx}>
                    {artist.name}
                </p>
            );
        });
        return artists;
    }
};

const FeedSoundtrack = (props) => {
    const { content } = props.ele;

    const handleContentType = () => {
        if (content.type === "show") {
            return (
                <div className="feedsound-pod">
                    <p className="feedsound__type-pod">podcast</p>
                    <img
                        className="feedsound__image"
                        src={content.images[0].url}
                        alt="Album Art"
                    />
                    <p className="feedsound__name">{content.name}</p>
                    {content.artists && handleArtists(content.artists)}
                </div>
            );
        } else {
            return (
                <div className="feedsound">
                    <p className="feedsound__type">{content.type}</p>
                    <img
                        className="feedsound__image"
                        src={content.images[0].url}
                        alt="Album Art"
                    />
                    <p className="feedsound__name">{content.name}</p>
                    {content.artists && handleArtists(content.artists)}
                </div>
            );
        }
    };

    return <>{handleContentType()}</>;
};

export default FeedSoundtrack;
