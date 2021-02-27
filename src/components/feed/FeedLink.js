import React, { useEffect } from "react";

const FeedLink = (props) => {
    const { content } = props.ele;

    useEffect(() => {
        const link = document.getElementById(`linkdiv${content.id}`);
        link.addEventListener("click", () => {
            document.getElementById(`link${content.id}`).click();
        });
    }, []);

    const handleDisplay = () => {
        if (props.userpage) {
            return (
                <div id={`linkdiv${content.id}`} className="feedlink-u">
                    <a
                        id={`link${content.id}`}
                        href={content.url}
                        className="feedlink-u__title"
                        target="_blank"
                    >
                        {content.title}
                    </a>
                </div>
            );
        } else {
            return (
                <div id={`linkdiv${content.id}`} className="feedlink">
                    <a
                        id={`link${content.id}`}
                        href={content.url}
                        className="feedlink__title"
                        target="_blank"
                    >
                        {content.title}
                    </a>
                </div>
            );
        }
    };

    return <>{handleDisplay()}</>;
};

export default FeedLink;
