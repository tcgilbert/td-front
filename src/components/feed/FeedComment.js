import React from 'react'
import Arrow from "../../images/angle-arrow1.svg"


const FeedComment = (props) => {

    const { content } = props.ele

    return (
        <div className="feedcomment">
            <img className="feedcomment__arrow" src={Arrow} alt="Arrow"/>
            <p className="feedcomment__text">{content.comment}</p>
        </div>
    )
}

export default FeedComment
