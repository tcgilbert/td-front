import React, { useEffect } from 'react'

const FeedLink = (props) => {

    const { content } = props.ele;
    const url = content.url
    useEffect(() => {

        const link = document.getElementById("link")
        link.addEventListener("click", () => {
            window.open(url, "_blank")
        })

    }, [])

    return (
        <div id="link" className="feedlink">
            <span className="feedlink__title">{content.title}</span>
        </div>
    )
}

export default FeedLink