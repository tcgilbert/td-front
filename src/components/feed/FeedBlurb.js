import React from "react";

const FeedBlurb = (props) => {
    const { content } = props.ele;

    const handleDisplay = () => {
        if (props.userpage) {
            return (
                <div className="feedblurb-u">
                    <p className="feedblurb-u__heading">{content.heading}</p>
                    <p className="feedblurb-u__content">{content.content}</p>
                </div>
            );
        } else {
            return (
                <div className="feedblurb">
                    <p className="feedblurb__heading">{content.heading}</p>
                    <p className="feedblurb__content">{content.content}</p>
                </div>
            );
        }
    };

    return (
        <>
        {handleDisplay()}
        </>
    );
};

export default FeedBlurb;
