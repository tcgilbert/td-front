import React, { useEffect } from 'react'

const FeedLink = (props) => {

    const { content } = props.ele;
    
    useEffect(() => {

        const link = document.getElementById(`linkdiv${content.id}`)
        link.addEventListener("click", () => {
            document.getElementById(`link${content.id}`).click()
        })

    }, [])

    return (
        <div id={`linkdiv${content.id}`}className="feedlink">
            <a id={`link${content.id}`} href={content.url} className="feedlink__title" target="_blank">{content.title}</a>
        </div>
    )
}

export default FeedLink