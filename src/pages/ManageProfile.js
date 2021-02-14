import React from 'react'
import PrivateNav from '../components/PrivateNav'

const ManageProfile = (props) => {
    return (
        <div>
            <PrivateNav user={props.user} handleLogout={props.handleLogout}/>
            <h1>Welcome to you're profileeee man</h1>
        </div>
    )
}

export default ManageProfile
