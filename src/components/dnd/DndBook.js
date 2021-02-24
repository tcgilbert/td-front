import React, { useState } from "react";
import Trash from "../../images/trash.svg";
import DeleteDiv from "./DeleteDiv";
import { grey } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import useDidMount from "../../utils/useDidMount";

const SwitchBtn = withStyles({
    root: {
        position: "absolute",
        right: "-4.9rem",
    },
    switchBase: {
        color: grey[300],
        opacity: 0.75,
        "&$checked": {
            color: "white",
            opacity: 1,
        },
        "&$checked + $track": {
            backgroundColor: grey[50],
        },
    },
    checked: {},
    track: {},
})(Switch);

const handleAuthors = (array) => {
    if (array.length === 1) {
        return <p className="spotify__artist">{array[0]}</p>;
    } else {
        const authors = array.map((author, idx) => {
            return <p key={idx}>{author}</p>;
        });
        return authors;
    }
};

const DndBook = (props) => {
    const { authors, title, imgUrl } = props.ele.content;
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [show, setShow] = useState(props.ele.show);
    const SERVER = process.env.REACT_APP_SERVER;

    const handleDisplay = () => {
        if (deleteSelected) {
            setDeleteSelected(false);
        } else {
            setDeleteSelected(true);
        }
    };

    // Update show value on switch change
    const handleShowChange = async (bool, id) => {
        try {
            const apiRes = await axios.put(`${SERVER}/content/update/show`, {
                id: props.ele.id,
                show: bool,
            });
            if (apiRes) {
                const updatedContent = props.content.map((ele) => {
                    if (ele.id === props.ele.id) {
                        ele.show = show;
                    }
                    return ele;
                });
                props.setContent(updatedContent);
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(imgUrl);

    useDidMount(() => {
        handleShowChange(show, props.ele.id);
    }, [show]);

    return (
        <div
            className="spotify"
            ref={props.provided.innerRef}
            {...props.provided.draggableProps}
            {...props.provided.dragHandleProps}
            style={{
                userSelect: "none",
                backgroundColor: props.snapshot.isDragging
                    ? "rgb(233, 233, 233)"
                    : "white",
                color: "black",
                ...props.provided.draggableProps.style,
            }}
        >
            <div className="spotify__tag-book">
                <p className="sandbox__label">Book</p>
                <div className="sandbox__options-container">
                    <button
                        className="sandbox__btn-wrap"
                        onClick={handleDisplay}
                    >
                        <img
                            className="sandbox__icon"
                            src={Trash}
                            alt="delete"
                        />
                    </button>
                    <FormControlLabel
                        control={
                            <SwitchBtn
                                checked={show}
                                onChange={() => setShow(!show)}
                            />
                        }
                    />
                </div>
            </div>
            <div className="spotify__container">
                <img
                    className="spotify__img"
                    src={imgUrl}
                    alt="Album Art"
                />
                <div>
                    <p className="spotify__lead">{title}</p>
                    <p>{handleAuthors(authors)}</p>
                </div>
            </div>
            <DeleteDiv
                content={props.content}
                setContent={props.setContent}
                deleteSelected={deleteSelected}
                ele={props.ele}
                setDeleteSelected={setDeleteSelected}
                setContentLoading={props.setContentLoading}
            />
        </div>
    );
};

export default DndBook;
