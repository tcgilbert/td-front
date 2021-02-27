import React from "react";

const handleAuthors = (array) => {
    if (array.length === 1) {
        return <p className="feedbook__artist">{array[0]}</p>;
    } else {
        const authors = array.map((author, idx) => {
            return (
                <p className="feedbook__artist" key={idx}>
                    {author}
                </p>
            );
        });
        return authors;
    }
};

const FeedBook = (props) => {
    const { content } = props.ele;

    const handleDisplay = () => {
        if (props.userpage) {
            return (
                <div className="feedbook-u">
                    <p className="feedbook-u__type">book</p>
                    <img
                        className="feedbook-u__image"
                        src={content.imgUrl}
                        alt="Cover Art"
                    />
                    <p className="feedbook-u__name">{content.title}</p>
                    {content.authors && handleAuthors(content.authors)}
                </div>
            );
        } else {
            return (
                <div className="feedbook">
                    <p className="feedbook__type">book</p>
                    <img
                        className="feedbook__image"
                        src={content.imgUrl}
                        alt="Cover Art"
                    />
                    <p className="feedbook__name">{content.title}</p>
                    {content.authors && handleAuthors(content.authors)}
                </div>
            );
        }
    };

    return <>{handleDisplay()}</>;
};

export default FeedBook;
