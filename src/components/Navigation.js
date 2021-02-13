import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className="navigation">
            <p className="navigation__title">thesedays</p>
            <div>
                <ul>
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
