import React from "react";
import Arrow from "../../images/angle-arrow1.svg";

const FeedComment = (props) => {
    const { content } = props.ele;

    const handleDisplay = () => {
        if (props.userpage) {
            return (
                <div className="feedcomment-u">
                    <img
                        className="feedcomment-u__arrow"
                        src={Arrow}
                        alt="Arrow"
                    />
                    <p className="feedcomment-u__text">{content.comment}</p>
                </div>
            );
        } else {
            return (
                <div className="feedcomment">
                    <img
                        className="feedcomment__arrow"
                        src={Arrow}
                        alt="Arrow"
                    />
                    <p className="feedcomment__text">{content.comment}</p>
                </div>
            );
        }
    };

    return <>{handleDisplay()}</>;
};

export default FeedComment;
