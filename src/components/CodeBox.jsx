import React, { useState, useEffect, useContext, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "../prism.css";
import axios from "axios";
import AuthContext from "../auth/UserContext";

function CodeBox({ jsonError, jsonStr }) {
  const authContext = useContext(AuthContext);
  const [text, setText] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [failure, setFailure] = useState(false);
  const [failureText, setFailureText] = useState("");

  let timerID = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [text]);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  useEffect(() => {
    if (jsonError === null) {
      setText(JSON.stringify(jsonStr, null, "\t"));
    }
    if (jsonStr === null) {
      setText(jsonError);
    }
  }, [jsonStr, jsonError, text]);

  const validation = (e) => {
    let api = authContext.user.apiKey[0];
    let username=authContext.user.username;

    let logToSend = JSON.parse(text);
    logToSend.ddsource = "test-your-stuff";

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/logs/log",
        { logToSend, api, username },
        {
          headers: {
            "content-type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        setSuccess(true);
        setSuccessText(
          `Response: ${res.status}/${res.statusText} (inspect your console for more info)`
        );
        timerID = setTimeout(() => {
          setSuccessText("");
          setSuccess(false);
        }, 2000);

        console.log("result:", res);
      })
      .catch((err) => {
        setFailure(true);
        setFailureText(
          `Failed (have you checked your api key?)`
        );
        timerID = setTimeout(() => {
          setFailureText("");
          setFailure(false);
        }, 2000);

    console.log("result:", err, "---");
      });
  };

  return (
    <div className="container">
      {text !== null && (
        <>
          <pre
            className="language-json"
            data-jsonp="https://api.github.com/repos/leaverou/prism/contents/prism.js"
          >
            <code>{text}</code>
          </pre>
          {jsonStr && (
            <div className="d-grid">
              <button
                className="btn btn-success mt-2"
                type="button"
                onClick={validation}
              >
                🚀 Send your log 🚀
              </button>
              {success && (
                <div className="d-flex justify-content-center">
                  <div
                    className="alert alert-success w-75 text-center mt-3"
                    role="alert"
                  >
                    {successText}
                  </div>
                </div>
              )}
              {failure && (
                <div className="d-flex justify-content-center">
                  <div
                    className="alert alert-danger w-75 text-center mt-3"
                    role="alert"
                  >
                    {failureText}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CodeBox;
