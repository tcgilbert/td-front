import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import useDeBounce from "../utils/useDeBouce";
import Loading from "./Loading";
import LoadingBar from "./LoadingBar"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        width: "100%",
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

const Book = (props) => {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const SERVER = process.env.REACT_APP_SERVER;
    const searchDebounced = useDeBounce(search, 1000);

    useEffect(() => {
        const handleSearch = async () => {
            let books = [];
            try {
                let axiosRes = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=${search.toLowerCase()}&maxResults=6&key=${API_KEY}`
                );
                let resArray = await axiosRes.data.items;
                console.log(resArray);
                if (resArray !== "undefined") {
                    resArray.forEach((ele) => {
                        if (
                            ele.volumeInfo.title &&
                            ele.volumeInfo.authors &&
                            ele.volumeInfo.publisher &&
                            ele.volumeInfo.imageLinks
                        ) {
                            let book = {
                                apiId: ele.id,
                                title: ele.volumeInfo.title,
                                authors: ele.volumeInfo.authors,
                                publisher: ele.volumeInfo.publisher,
                                publishedDate: ele.volumeInfo.publishedDate,
                                imgUrl: ele.volumeInfo.imageLinks.thumbnail,
                            };
                            books.push(book);
                        }
                    });
                }
                setResults(books);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        if (searchDebounced) {
            handleSearch();
        }
    }, [searchDebounced]);

    useEffect(() => {
        if (search === "") {
            setResults([]);
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [search]);

    const handleAuthors = (array) => {
        if (array.length === 1) {
            return <p className="soundtrack__artist-name">{array[0]}</p>;
        } else {
            const authors = array.map((author, idx) => {
                return (
                    <p className="soundtrack__artist-name" key={idx}>
                        {author}
                    </p>
                );
            });
            return authors;
        }
    };

    const handleSelection = async (ele) => {
        try {
            props.setPhoneLoading(true)
            const apiRes = await axios.post(`${SERVER}/book/create`, {
                userId: props.user.id,
                title: ele.title,
                apiId: ele.apiId,
            });
            const newContent = await apiRes.data.reformatted;
            console.log(newContent);
            let googleRes = await axios.get(
                `https://www.googleapis.com/books/v1/volumes/${newContent.content.apiId}?key=${API_KEY}`
                );
                let bookContent = await googleRes.data.volumeInfo
                console.log(bookContent.imageLinks.thumbnail);
                newContent.content["authors"] = bookContent.authors
                newContent.content["imgUrl"] = bookContent.imageLinks.thumbnail
                const copiedContent = [...props.content, newContent];
                props.setContent(copiedContent);
                props.setPhoneLoading(false)
                props.setShow(false)
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoading = () => {
        if (props.phoneLoading) {
            return <LoadingBar />
        }
    }

    const resultsDisplayed = () => {
        if (loading) {
            return <Loading />;
        } else {
            if (results.length > 0) {
                const resultsDisplayed = results.map((book, idx) => {
                    console.log(book);
                        return (
                            <div key={idx} className="soundtrack__result">
                                <div>
                                    <div className="soundtrack__img-info">
                                        <img
                                            className="soundtrack__result-img-book"
                                            src={book.imgUrl}
                                            alt="Book Image"
                                        />
                                        <div>
                                            {handleAuthors(book.authors)}
                                            <p className="soundtrack__album-name">
                                                {book.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        handleSelection(book, "book")
                                    }
                                    className="soundtrack__btn"
                                >
                                    <p>Add</p>
                                    <p>Book</p>
                                </button>
                            </div>
                        );
                });
                return resultsDisplayed;
            } else {
                let text;
                if (search === "") {
                    text = "Enter Search";
                } else {
                    text = "No Results";
                }
                return <h1 className="soundtrack__noresults">{text}</h1>;
            }
        }
    };

    return (
        <div className="build__form">
            <h1 className="build__prompt">
                Share what you have been reading.
            </h1>
            <div className="soundtrack">
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
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="soundtrack__results">{resultsDisplayed()}</div>
            {handleLoading()}
        </div>
    );
};

export default Book;
