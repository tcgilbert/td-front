import React from "react";

const handleAuthors = (array) => {
    if (array.length === 1) {
        return <p className="feedsound__artist">{array[0]}</p>;
    } else {
        const authors = array.map((author, idx) => {
            return (
                <p className="feedsound__artist" key={idx}>
                    {author}
                </p>
            );
        });
        return authors;
    }
};

const FeedSoundtrack = (props) => {
    const { content } = props.ele;


    return (
        <div className="feedbook">
            <img
                className="feedbook__image"
                src={content.imgUrl}
                alt="Cover Art"
            />
            <p className="feedbook__name">{content.title}</p>
            {content.authors && handleAuthors(content.authors)}
        </div>
    );
};

export default FeedSoundtrack;
