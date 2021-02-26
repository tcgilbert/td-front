import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import LoadingPhone from "../components/LoadingPhone"
import axios from "axios";

const Settings = (props) => {
    const [maintain, setMaintain] = useState(null);
    const [loading, setLoading] = useState(true);
    const SERVER = process.env.REACT_APP_SERVER;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (maintain === null) {
                    const apiRes = await axios.get(
                        `${SERVER}/users/unique/${props.user.username}`
                    );
                    if (apiRes) {
                        setMaintain(apiRes.data.maintenance)
                        setLoading(false)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleChange = async (bool) => {
        try {
            const apiRes = await axios.put(
                `${SERVER}/users/update/maintenance`,
                {
                    maintenance: bool,
                    userId: props.user.id,
                }
            );
            if (apiRes) {
                console.log(apiRes);
                setMaintain(bool)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoading = () => {
        if (loading) {
            return <LoadingPhone settings={true}/>
        } else {
            return (
                <Switch
                    checked={maintain}
                    onChange={() => handleChange(!maintain)}
                />
            );
        }
    };

    return (
        <div className="settings">
            <div>
                <p className="settings__text">Maintenance Mode: </p>
                <p>(Hide your site from being seen)</p>
            </div>
            {handleLoading()}
        </div>
    );
};

export default Settings;
