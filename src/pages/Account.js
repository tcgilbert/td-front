import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import LoadingBar from "../components/LoadingBar";
import axios from "axios";

const Account = (props) => {
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const SERVER = process.env.REACT_APP_SERVER;
    const history = useHistory();

    const handleDelete = async () => {
        try {    
            setLoading(true)        
            const apiRes = await axios.delete(
                `${SERVER}/users/delete/${props.user.id}`
            );
            if (apiRes) {
                setLoading(false)
                props.handleLogout()
                history.push("/")
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };

    const handleButtons = () => {
        if (deleteSelected) {
            return (
                <>
                    <p className="account__rusure">
                        Are you sure? This action cannot be reversed
                    </p>
                    <button
                        onClick={() => setDeleteSelected(false)}
                        className="account__cancel-btn"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="account__delete-btn"
                    >
                        Confirm Delete
                    </button>
                </>
            );
        } else {
            return (
                <button
                    onClick={() => setDeleteSelected(true)}
                    className="account__delete-btn"
                >
                    Delete Account
                </button>
            );
        }
    };

    const handleLoading = () => {
        if (loading) {
            return <LoadingBar />;
        } else {
            return;
        }
    };

    return (
        <div className="account">
            <Navigation
                isAuthenticated={props.isAuthenticated}
                handleLogout={props.handleLogout}
            />
            <h1 className="account__heading">My Account</h1>
            <div className="account__info">
                {handleButtons()}
                {handleLoading()}
            </div>
        </div>
    );
};

export default Account;
