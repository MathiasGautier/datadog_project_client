import React, { useState, useContext, useEffect, useRef } from "react";
import apiHandler from "../services/apiHandler";
import AuthContext from "../auth/UserContext";
import axios from "axios";
import "../prism.css";
import Prism from "prismjs";

function Metrics() {
  const [metricName, setMetricName] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [repeat, setRepeat] = useState("");
  const [rendomizeBetweenStart, setrendomizeBetweenStart] = useState("");
  const [rendomizeBetweenEnd, setrendomizeBetweenEnd] = useState("");
  const [checkRepeat, setCheckedRepeat] = useState(false);
  const [message, setMessage] = useState(false);
  const [metricSent, setMetricSent] = useState(false);
  const [isRunning, setIsrunning] = useState(false);
  const [tagValue, setNewTagValue] = useState("");
  const [tagKey, setNewTagKey] = useState("");
  const [tagList, setTagsList] = useState("");
  const [errorMessage, setErrorMessage] = useState(false)

  let timerID;
  // let intervalID=useRef(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    Prism.highlightAll();
  }, [message]);

  const checked = (e) => {
    if (checkRepeat === false) {
      setCheckedRepeat(true);
      setMetricValue("");
    }
    if (checkRepeat === true) {
      setCheckedRepeat(false);
      setRepeat("");
      setrendomizeBetweenStart("");
      setrendomizeBetweenEnd("");
    }
  };

  const setMetric = (e) => {
    setMetricName(e.target.value);
  };

  const setValue = (e) => {
    if (checkRepeat === false) {
      setMetricValue(e.target.value);
    }
  };

  const repeatSend = (e) => {
    if (checkRepeat === true) {
      setRepeat(e.target.value);
    } else if (checkRepeat === false) {
      setRepeat(false);
    }
  };

  const randomizeStart = (e) => {
    if (checkRepeat === true) {
      setrendomizeBetweenStart(e.target.value);
    } else if (checkRepeat === false) {
      setRepeat(false);
    }
  };

  const randomizeEnd = (e) => {
    if (checkRepeat === true) {
      setrendomizeBetweenEnd(e.target.value);
    } else if (checkRepeat === false) {
      setRepeat(false);
    }
  };

  const sendMetric = (e) => {
    let username = authContext.user.username;
    let apiKey = authContext.user.apiKey[0];


    if (checkRepeat === false) {
      if (metricName === "" || metricValue === "") {
        setErrorMessage(true);
        timerID = setTimeout(() => {
          setErrorMessage(false);
        }, 2000);
      } else {
        let metricObject = {
          metricName,
          metricValue,
          username,
          apiKey,
          checkRepeat,
          tagList,
        };
        console.log("metricObject", metricObject);
        apiHandler
          .sendMetric({ metricObject })
          .then((data) => {
            setMetricSent(true);
            timerID = setTimeout(() => {
              setMetricSent(false);
            }, 2000);
            setMessage(JSON.stringify(JSON.parse(data), null, "\t"));
            console.log("response", data);
          })
          .catch((error) => console.log("error", error));
      }
    }
    console.log(repeat)
    if (checkRepeat === true) {
      if (!metricName || !rendomizeBetweenStart || !rendomizeBetweenEnd || !repeat || Number(repeat) < 3) {
        setErrorMessage(true);
        timerID = setTimeout(() => {
          setErrorMessage(false);
        }, 2000);
      } else {
        setIsrunning(true);
      }
    }
  }




  useEffect(() => {
    Prism.highlightAll();
    let intervalID;
    if (isRunning) {
      console.log("hiellooo")
      let username = authContext.user.username;
      let apiKey = authContext.user.apiKey[0];

      // if (!metricName || !rendomizeBetweenStart|| !rendomizeBetweenEnd || !repeat) {
      //   setErrorMessage(true);
      //   setTimeout(() => {
      //     setErrorMessage(false);
      //   }, 1000);
      // } else {
      intervalID = setInterval(() => {
        function randomInteger(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let value = randomInteger(
          Number(rendomizeBetweenStart),
          Number(rendomizeBetweenEnd)
        );
        // console.log(value);
        let metricObject = {
          metricName,
          value,
          username,
          apiKey,
          tagList,
          checkRepeat,
        };
        //console.log("metricObject Here", metricObject);


        console.log(metricName, rendomizeBetweenStart, rendomizeBetweenEnd, repeat)


        apiHandler
          .sendMetric({ metricObject })
          .then((data) => {
            setMetricSent(true);
            setTimeout(() => {
              setMetricSent(false);
            }, 2000);
            console.log(data);
            setMessage(JSON.stringify(JSON.parse(data), null, "\t"));
            console.log("response", data);
          })
          .catch((error) => console.log("error", error));

      }, repeat * 1000);
    }
    return () => clearInterval(intervalID);
  }, [
    isRunning,
    repeat,
    // authContext.user.apiKey,
    // authContext.user.username,
    checkRepeat,
    metricName,
    rendomizeBetweenEnd,
    rendomizeBetweenStart,
  ]);

  const stop = () => {
    console.log("stopped");
    setIsrunning(false);
  };

  const clear = () => {
    setMetricName("");
    setMetricValue("");
    setRepeat("");
    setrendomizeBetweenStart("");
    setrendomizeBetweenEnd("");
    setNewTagValue("");
    setNewTagKey("");
    setTagsList("");
    setIsrunning(false);
    setMessage(false)
  }

  const setTagKey = (e) => {
    setNewTagKey(e.target.value);
  };

  const setTagValue = (e) => {
    setNewTagValue(e.target.value);
  };

  const addTags = (e) => {
    setTagsList([...tagList, tagKey + ":" + tagValue]);
    setNewTagValue("");
    setNewTagKey("");
  };

  return (
    <div className="container">
      <div className="bg-form">
        <form className="text-center mt-4">
          <label className="mb-5 mt-3">
            Fill in the details to start sending metrics
          </label>
          <div className="form-group">
            <label htmlFor="username" className="me-1 mb-4">
              Metric Name :
            </label>
            <input
              type="text"
              name="Metric_name"
              value={metricName}
              onChange={setMetric}
              placeholder="Enter Metric name"
            />
          </div>

          {!checkRepeat && (
            <>
              <div className="form-group">
                <label htmlFor="username" className="me-1 mb-4">
                  Metric Value :
                </label>
                <input
                  type="number"
                  name="value"
                  value={metricValue}
                  onChange={setValue}
                  placeholder="Enter Metric value"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="username" className="me-1 mb-4">
              Add tags (optionnal) :
            </label>
            <input
              type="text"
              name="value"
              value={tagKey}
              onChange={setTagKey}
              placeholder="Enter tag key"
            />

            <input
              type="text"
              name="value"
              value={tagValue}
              onChange={setTagValue}
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

          <div className="form-check">
            <input
              type="checkbox"
              id="random"
              name="vehicle1"
              value="random"
              onChange={checked}
            />
            <label
              className="form-check-label mb-4 ms-1"
              htmlFor="flexCheckDefault"
            >
              Repeat (timestamps will always be Date.now())
            </label>
          </div>

          {checkRepeat && (
            <>
              <div className="form-group">
                <label htmlFor="username" className="me-1 mb-4">
                  Every:
                </label>
                <input
                  type="number"
                  className="me-1"
                  name="Metric_name"
                  value={repeat}
                  onChange={repeatSend}
                  //  className="form-control"
                  placeholder="number"
                />
                seconds(minimum 3)
              </div>

              <div className="form-group">
                <label htmlFor="randomize" className="me-1 mb-4">
                  Randomize value between:
                </label>
                <input
                  className="me-1"
                  type="number"
                  name="Metric_name"
                  value={rendomizeBetweenStart}
                  onChange={randomizeStart}
                  //  className="form-control"
                  placeholder="Enter Metric value"
                />
                and
                <input
                  className="ms-1"
                  type="number"
                  name="Metric_name"
                  value={rendomizeBetweenEnd}
                  onChange={randomizeEnd}
                  //  className="form-control"
                  placeholder="Enter Metric value"
                />
              </div>
            </>
          )}
        </form>
      </div>

      <div className="row mt-2 container-fluid ms-3">




        {!errorMessage && !isRunning && (
          <div className="row mt-2 container-fluid ">
            <button
              className="btn btn-primary col-sm m-1"
              type="button"
              onClick={sendMetric}
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
        )}

        {checkRepeat &&
          isRunning &&
          <button
            className="btn btn-danger col-sm m-1"
            type="button"
            onClick={stop}
          >
            stop
          </button>
        }

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

      {metricSent &&
        <>
          <div className="alert alert-success text-center" type="button" disabled>
            🚀 METRIC SENT! 🚀
          </div>
        </>
      }

      {errorMessage &&

        <div className="alert alert-danger text-center">
          Please check that all the fields are correctly filled and validate your API key
        </div>
      }

    </div>
  );
}

export default Metrics;
