import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink className="navigation__title" to="/">
                <svg className="navigation__logo" enable-background="new 0 0 511.885 511.885" fill="white" height="30" viewBox="0 0 511.885 511.885" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m246.777 511.885h-158.131c-109.414-3.313-120.356-156.338-14.347-176.787 15.277-57.419 86.739-79.692 131.593-40.19 10.011 8.724 17.714 19.697 22.524 31.866 37.939 4.285 67.253 41.137 60.55 79.644 39.715 37.516 12.739 105.562-42.189 105.467zm-158.822-137.949c-63.844 3.534-63.759 95.344.691 97.949h158.131c22.075-.246 29.249-29.537 9.782-39.932-9.028-4.725-13.061-15.482-9.363-24.977 9.275-18.759-7.126-40.943-27.363-40.733-.388.027-1.338.164-1.976.255-.7.101-1.389.199-2.055.281-10.675 1.321-20.495-6.038-22.208-16.663-9.362-49.288-78.972-45.361-82.08 4.784-.168 10.794-10.04 19.928-20.814 19.275-1.13-.047-2.096-.158-2.745-.239zm265.497 3.725c114.377-91.428 48.96-277.684-97.511-277.776-72.02-1.076-138.934 53.35-152.687 123.903-2.263 10.811 4.666 21.409 15.478 23.672 10.814 2.267 21.411-4.667 23.673-15.479 11.169-53.365 58.919-92.097 113.539-92.097 108.936.069 157.552 138.612 72.491 206.566-8.619 6.909-10.004 19.496-3.096 28.114 3.951 4.929 9.757 7.491 15.618 7.491 4.386.002 8.805-1.436 12.495-4.394zm138.49-101.776h-20c-26.536-1.056-26.516-38.953 0-40h20c26.537 1.056 26.516 38.953 0 40zm-432-20c0-11.046-8.954-20-20-20h-20c-26.536 1.056-26.516 38.953 0 40h20c11.046 0 20-8.954 20-20zm325.833-173.78 10.442-17.058c5.767-9.421 2.805-21.733-6.615-27.5-9.421-5.767-21.733-2.806-27.5 6.615l-10.442 17.059c-5.767 9.421-2.805 21.733 6.615 27.5 3.259 1.995 6.863 2.945 10.423 2.945 6.732 0 13.305-3.399 17.077-9.561zm3.828 393.117c9.42-5.767 12.382-18.079 6.615-27.5l-10.442-17.058c-5.767-9.42-18.08-12.382-27.5-6.615s-12.382 18.079-6.615 27.5l10.442 17.058c3.772 6.162 10.345 9.561 17.077 9.561 3.559-.001 7.164-.952 10.423-2.946zm-231.672-389.072c9.565-5.523 12.842-17.755 7.319-27.321l-10.001-17.32c-5.523-9.566-17.757-12.843-27.321-7.319-9.565 5.523-12.842 17.755-7.319 27.321l10.001 17.32c3.705 6.416 10.427 10.002 17.338 10.002 3.394.001 6.833-.864 9.983-2.683zm320.951 295.341c5.42-9.625 2.011-21.82-7.613-27.24l-17.427-9.813c-9.625-5.42-21.82-2.011-27.24 7.613-5.42 9.625-2.011 21.82 7.613 27.24l17.427 9.813c3.102 1.747 6.472 2.577 9.795 2.577 6.987 0 13.772-3.668 17.445-10.19zm-393.85-221.78c5.419-9.625 2.01-21.821-7.614-27.24l-17.427-9.813c-9.626-5.418-21.82-2.01-27.24 7.614-5.419 9.625-2.01 21.821 7.614 27.24l17.427 9.813c3.103 1.747 6.471 2.576 9.794 2.576 6.988 0 13.773-3.668 17.446-10.19zm369.181 8.451 17.468-9.739c9.647-5.379 13.108-17.56 7.729-27.208-5.378-9.647-17.559-13.109-27.208-7.729l-17.468 9.739c-9.647 5.379-13.108 17.56-7.729 27.208 3.66 6.564 10.469 10.264 17.486 10.264 3.297 0 6.639-.816 9.722-2.535zm-181.271-128.268v-19.999c-1.056-26.536-38.953-26.516-40 0v19.999c0 11.046 8.954 20 20 20s20-8.955 20-20z"/></svg>
                thesedays
                </NavLink>
            <div>
                <ul className="navigation__list">
                    <NavLink className="navigation__link" to="/account">
                        log in
                        <div className="navigation__underline"></div>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Navigation
