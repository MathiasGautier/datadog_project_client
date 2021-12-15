import React, { useState, useContext, useEffect, useRef } from "react";
import apiHandler from "../services/apiHandler";
import AuthContext from "../auth/UserContext";
import "../prism.css";
import Prism from "prismjs";

function Events() {

    const authContext = useContext(AuthContext);

    const [eventTitle, setEventTitle] = useState("");
    const [eventText, setEventText] = useState("");
    const [tagValue, setNewTagValue] = useState("");
    const [tagKey, setNewTagKey] = useState("");
    const [tagList, setTagsList] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [eventSent, setEventSent] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        Prism.highlightAll();
      }, [message]);

    const addeventTitle = (e) => {
        setEventTitle(e.target.value)
    }

    const addeventText = (e) => {
        setEventText(e.target.value)
    }

    const addtagValue = (e) => {
        setNewTagValue(e.target.value)
    }

    const addtagKey = (e) => {
        setNewTagKey(e.target.value)
    }


    const addTags = () => {
        setTagsList([...tagList, tagKey + ":" + tagValue]);
        setNewTagValue("");
        setNewTagKey("");
    }

    const sendEvent = (e) => {
        let username = authContext.user.username;
        let apiKey = authContext.user.apiKey[0];

        if (!eventTitle || !eventText) {
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, 2000);
        } else {

            let eventObject = {
                eventTitle,
                eventText,
                tagList,
                username,
                apiKey
            };
            apiHandler.sendEvent({ eventObject })
                .then((data) => {
                    setEventSent(true);
                    setTimeout(() => {
                        setEventSent(false);
                    }, 2000);
                    setMessage(JSON.stringify(JSON.parse(data), null, "\t"));
                    console.log("response", data);
                })
                .catch((error) => console.log("error", error));

        }
    }

    const clear = (e) => {
        setEventTitle("");
        setEventText("");
        setTagsList("")
    }


    return (
        <div className="container">
            <div className="bg-form">
                <form className="text-center mt-4">
                    <label className="mb-5 mt-3">
                        Fill in the details to start sending Events
                    </label>


                    <div className="form-group">
                        <label htmlFor="username" className="me-1 mb-4">
                            Event title :
                        </label>
                        <input
                            type="text"
                            name="event_title"
                            value={eventTitle}
                            onChange={addeventTitle}
                            placeholder="Enter Event title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username" className="me-1 mb-4">
                            Text :
                        </label>
                        <input
                            type="text"
                            name="event_text"
                            value={eventText}
                            onChange={addeventText}
                            placeholder="Enter your text"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username" className="me-1 mb-4">
                            Add tags (optionnal) :
                        </label>
                        <input
                            type="text"
                            name="value"
                            value={tagKey}
                            onChange={addtagKey}
                            placeholder="Enter tag key"
                        />

                        <input
                            type="text"
                            name="value"
                            value={tagValue}
                            onChange={addtagValue}
                            placeholder="Enter tag value"
                        />
                        <button
                            className="btn btn-primary col-sm m-1"
                            type="button"
                            onClick={addTags}
                        >
                            +
                        </button>
                    </div>

                    {tagList &&

                        <div className="alert alert-primary"> <h5>Tags:</h5> {tagList && tagList.map((x) => x + ",  ")}</div>
                    }
                </form>
            </div>


            <div className="row mt-2 container-fluid ">
                <button
                    className="btn btn-primary col-sm m-1"
                    type="button"
                    onClick={sendEvent}
                >
                    Send
                </button>

                <button
                    className="btn btn-warning col-sm m-1"
                    type="button"
                    onClick={clear}
                >
                    Clear
                </button>
            </div>

            {message && (

                <>
                    <pre
                        className="language-json"
                        data-jsonp="https://api.github.com/repos/leaverou/prism/contents/prism.js"
                    >
                        <code>{message}</code>
                    </pre>
                </>

            )}

            {eventSent &&
                <>
                    <div className="alert alert-success text-center" type="button" disabled>
                        🚀 Event SENT! 🚀
                    </div>
                </>
            }

            {errorMessage &&

                <div className="alert alert-danger text-center">
                    Please check that all the fields are correctly filled and validate your API key
                </div>
            }
        </div>

    )
}

export default Events
