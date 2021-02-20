import React from 'react'

const FeedBlurb = (props) => {

    const { content } = props.ele

    return (
        <div className="feedblurb">
            <p className="feedblurb__heading">{content.heading}</p>
            <p className="feedblurb__content">{content.content}</p>
        </div>
    )
}

export default FeedBlurb