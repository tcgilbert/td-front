import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import useDeBounce from "../utils/useDeBouce";
import Loading from "./Loading";
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
    const [loading, setLoading] = useState(false);
    const [selectionMade, setSelectionMade] = useState(false);
    const SERVER = process.env.REACT_APP_SERVER;
    const spotifyEndpoint = "https://api.spotify.com/v1/search";
    const searchDebounced = useDeBounce(query, 1000);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const apiRes = await axios.get(
                    `${spotifyEndpoint}?q=${query}&type=${searchType}&limit=15 `,
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + props.spotifyToken,
                        },
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
                setLoading(false);
            } catch (error) {
                setResultsAlbum([]);
                setResultsTrack([]);
            }
        };

        if (searchDebounced) {
            handleSearch();
        }
    }, [searchDebounced]);

    useEffect(() => {
        if (query === "") {
            setResultsAlbum([]);
            setResultsTrack([]);
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [query]);

    const handleArtists = (array) => {
        if (array.length === 1) {
            return <p className="soundtrack__artist-name">{array[0].name}</p>;
        } else {
            const artists = array.map((artist, idx) => {
                return <p className="soundtrack__artist-name" key={idx}>{artist.name}</p>;
            });
            return artists
        }
    };

    const handleSelection = async (ele, type) => {
        console.log(ele);
        const apiRes = await axios.post(`${SERVER}/soundtrack/create`, {
            userId: props.user.id,
            type: type,
            spotifyId: ele.id,
            comment: ""
        })
        if (apiRes) {
            props.setContentLoading(true)
        }
        return;
    };

    const resultsDisplayed = () => {
        if (loading) {
            return <Loading />;
        } else {
            if (searchType === "album" && resultsAlbum.length > 0) {
                const results = resultsAlbum.map((album, idx) => {
                    if (album.images[0] && album.artists) {
                        return (
                            <div key={idx} className="soundtrack__result">
                                <div>
                                    <div className="soundtrack__img-info">
                                        <img
                                            className="soundtrack__result-img"
                                            src={album.images[0].url}
                                            alt="album Image"
                                        />
                                        <div>
                                            {handleArtists(album.artists)}
                                            <p className="soundtrack__album-name">
                                                {album.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        handleSelection(album, "album")
                                    }
                                    className="soundtrack__btn"
                                >
                                    <p>Add</p>
                                    <p>Album</p>
                                </button>
                            </div>
                        );
                    } else {
                        return;
                    }
                });
                return results;
            } else if (searchType === "track" && resultsTrack.length > 0) {
                const results = resultsTrack.map((track, idx) => {
                    if (track.album.artists && track.album.images[0]) {
                        return (
                            <div key={idx} className="soundtrack__result">
                                <div>
                                    <div className="soundtrack__img-info">
                                        <img
                                            className="soundtrack__result-img"
                                            src={track.album.images[0].url}
                                            alt="Album Image"
                                        />
                                        <div>
                                            {handleArtists(track.album.artists)}
                                            <p className="soundtrack__album-name">
                                                {track.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        handleSelection(track, "track")
                                    }
                                    className="soundtrack__btn"
                                >
                                    <p>Add</p>
                                    <p>Track</p>
                                </button>
                            </div>
                        );
                    } else {
                        return;
                    }
                });
                return results;
            } else {
                let text;
                if (query === "") {
                    text = "Enter Search";
                } else {
                    text = "No Results";
                }
                return <h1 className="soundtrack__noresults">{text}</h1>;
            }
        }
    };

    // const selectionDisplayed = () => {
    //     setQuery("");
    //     setResultsTrack([]);
    //     setResultsAlbum([]);
    //     if (selection !== null && selection[0].type === "track") {
    //         return (
    //             <div className="soundtrack__selection">
    //                 <div className="soundtrack__img-info">
    //                     <img
    //                         className="soundtrack__selection-img"
    //                         src={selection[0].data.album.images[0].url}
    //                         alt="Album Image"
    //                     />
    //                     <div>
    //                         {handleArtists(selection[0].data.album.artists)}
    //                         <p className="soundtrack__album-name">{selection[0].data.name}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     } else if (selection !== null){
    //         return (
    //             <div className="soundtrack__selection">
    //                 <div className="soundtrack__img-info">
    //                     <img
    //                         className="soundtrack__selection-img"
    //                         src={selection[0].data.images[0].url}
    //                         alt="Album Image"
    //                     />
    //                     <div>
    //                         {handleArtists(selection[0].data.artists)}
    //                         <p className="soundtrack__album-name">{selection[0].data.name}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     }
    // };

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
                            setResultsTrack([]);
                            setResultsAlbum([]);
                        }}
                    >
                        <MenuItem className={classes.menuItem} value="album">
                            Album
                        </MenuItem>
                        <MenuItem className={classes.menuItem} value="track">
                            Track
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
        </div>
    );
};

export default Soundtrack;