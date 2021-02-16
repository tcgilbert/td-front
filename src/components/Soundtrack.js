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
        alignSelf: "bottom",
    },
    menuItem: {
        fontSize: "1.5rem",
    },
}));

const Soundtrack = (props) => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("album");
    const [resultsAlbum, setResultsAlbum] = useState([]);
    const [resultsTrack, setResultsTrack] = useState([]);
    const SERVER = process.env.REACT_APP_SERVER;
    const spotifyEndpoint = "https://api.spotify.com/v1/search";

    const handleSearch = async () => {
        try {
            const apiRes = await axios.get(
                `${spotifyEndpoint}?q=${query}&type=${searchType}&limit=15 `,
                {
                    method: "GET",
                    headers: { Authorization: "Bearer " + props.spotifyToken },
                }
            );
            console.log(apiRes);
            let searchData;
            switch (searchType) {
                case "album":
                    searchData = await apiRes.data.albums.items;
                    setResultsAlbum(searchData);
                    break;
                case "track":
                    searchData = await apiRes.data.tracks.items;
                    setResultsTrack(searchData);
                    break;
            }
        } catch (error) {
            setResultsAlbum([]);
            setResultsTrack([]);
        }
    };

    const handleArtists = (array) => {
        if (array.length === 1) {
            return <p>{array[0].name}</p>;
        } else {
            array.forEach((artist) => {
                return <p>{artist.name}</p>;
            });
        }
    };

    const resultsDisplayed = () => {
        if (searchType === "album" && resultsAlbum.length > 0) {
            console.log("calledddd");
            const results = resultsAlbum.map((album, idx) => {
                if (album.images[0] && album.artists) {
                    return (
                        <div key={idx} className="soundtrack__result">
                            <img className="soundtrack__result-img" src={album.images[0].url} alt="album Image"/>
                            <div>
                                {handleArtists(album.artists)}
                                <p className="soundtrack__album-name">{album.name}</p>
                            </div>
                        </div>
                    );
                } else {
                    return;
                }
            });
            return results;
        } else {
            return <p>No Results</p>;
        }
    };

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
                        defaultValue="album"
                        className={classes.select}
                        onChange={(e) => {
                            setSearchType(e.target.value);
                            setQuery("");
                        }}
                    >
                        <MenuItem className={classes.menuItem} value="album">
                            Album
                        </MenuItem>
                        <MenuItem className={classes.menuItem} value="track">
                            Song
                        </MenuItem>
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
            <div className="soundtrack__results">{resultsDisplayed()}</div>
            <button
                onClick={handleSearch}
                id="sound-btn"
                className="build__btn"
            >
                Add Soundtrack
            </button>
        </div>
    );
};

export default Soundtrack;
