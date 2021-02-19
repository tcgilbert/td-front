import React from 'react'

const handleArtists = (array) => {
    if (array.length === 1) {
        return <p className="feedsound__artist">{array[0].name}</p>;
    } else {
        const artists = array.map((artist, idx) => {
            return <p className="feedsound__artist" key={idx}>{artist.name}</p>;
        });
        return artists;
    }
};

const FeedSoundtrack = (props) => {
    const {content} = props.ele
    return (
        <div className="feedsound">
            <img className="feedsound__image" src={content.images[0].url} alt="Album Art"/>
            <p className="feedsound__name">{content.name}</p>
            {handleArtists(content.artists)}
        </div>
    )
}

export default FeedSoundtrack
