import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        width: "85%",
        marginLeft: "1rem",
        marginRight: "1rem",
    },
    input: {
        fontSize: "1.8rem",
        fontWeight: "300",
    },
    label: {
        fontSize: "1.7rem",
        opacity: ".7",
        fontWeight: "300",
    },
    select: {
        width: "100%",
        fontSize: "1.5rem",
        marginTop: ".4rem",
        alignSelf: "bottom"
    },
    menuItem: {
        fontSize: "1.5rem"
    }

}));

const Soundtrack = (props) => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const SERVER = process.env.REACT_APP_SERVER;

    // useEffect(() => {
    //     const button = document.getElementById("blurb-btn");
    //     if (heading !== "" || content !== "") {
    //         if (button.classList.contains("build__submit")) {
    //             return;
    //         } else {
    //             button.classList.add("build__submit");
    //         }
    //     } else {
    //         if (button.classList.contains("build__submit")) {
    //             button.classList.remove("build__submit");
    //         } else {
    //             return;
    //         }
    //     }
    // }, [heading, content]);

    const handleSubmit = async () => {
        return;
    };

    return (
        <div className="build__form">
            <h1 className="build__prompt">
                Share what you have been listening to.
            </h1>
            <div className="soundtrack">
                <FormControl size="small" className={classes.formControl}>
                    <Select
                        variant="outlined"
                        id="select-menu"
                        defaultValue="Artist"
                        className={classes.select}
                    >
                        <MenuItem className={classes.menuItem} value="Artist">Artist</MenuItem>
                        <MenuItem className={classes.menuItem} value="Album">Album</MenuItem>
                        <MenuItem className={classes.menuItem} value="Song">Song</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        className: classes.label,
                    }}
                    label="Search"
                    type="text"
                    name="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="soundtrack__results">
                
            </div>
            <button
                onClick={handleSubmit}
                id="sound-btn"
                className="build__btn"
            >
                Add Soundtrack
            </button>
        </div>
    );
};

export default Soundtrack;
