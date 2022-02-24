import React, { useState, useContext, useEffect, useRef } from "react";

import { useHistory } from "react-router-dom";
import AuthContext from "../auth/UserContext";
import apiHandler from "../services/apiHandler";
import "../prism.css";
import Prism from "prismjs";

function Log_text({ setJsonStr, setJsonError, setWarning }) {
  const authContext = useContext(AuthContext);
  const [text, setText] = useState("");
  const [jsonLog, setJsonLog] = useState(true)
  const [simpleLogSent, setSimpleLogSent] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, [message]);


  const history = useHistory();
  let timerID = useRef(null);

  //push to login if no user context found
  if (authContext.isLoggedIn === false) {
    history.push("/");
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  //get the text from the input field
  const textInput = (e) => {
    setText(e.target.value);
  };

  //authorize to use tab to indent in the textarea
  const preventTab = (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      document.execCommand('insertText', false, "\t");
      e.preventDefault();
      return false;

    }
  }

  const clear = (e) => {
    setText("");
    setJsonError(null);
    setJsonStr(null);
    setWarning(false);
  };

  useEffect(() => {
    if (text === "") {
      setText("");
    }
  }, [text]);

  const validation = (e) => {


    if (jsonLog === true) {
      //check if the textbox is empty or not
      if (text === "") {
        setJsonError(null);
        setJsonStr(null);
        setWarning(true);
        timerID = setTimeout(() => {
          setWarning(false);
        }, 2000);
      } else {
        //JSON Validation
        try {
          //try to parse
          setJsonStr(JSON.parse(text));
          setJsonError(null);
          setWarning(false);
        } catch (e) {
          setJsonError(JSON.stringify(e.message));
          setJsonStr(null);
          setWarning(false);
        }
      }
    } else if (jsonLog === false) {
      if (text === "") {
        setJsonError(null);
        setJsonStr(null);
        setWarning(true);
        timerID = setTimeout(() => {
          setWarning(false);
        }, 2000);
      } else {

        let api = authContext.user.apiKey[0];
        let username = authContext.user.username;
        let logObject = { text, api, username }


        apiHandler.sendSimpleText({ logObject })
          .then((data) => {
            setSimpleLogSent(true);
            setTimeout(() => {
              setSimpleLogSent(false);
            }, 2000);
           // setMessage(JSON.stringify(JSON.parse(data), null, "\t"));
            console.log("response", data);
          })
          .catch((error) => console.log("error", error))

      }
    }


  };

  const jsonLogButton = () => {
    setJsonLog(true)
    clear()
  }

  const freeTextLogButton = () => {
    setJsonLog(false)
    clear()
  }

  return (
    <div className="container pt-4">
      <div className="form-group text-center">
        <button
          onClick={jsonLogButton}
          className={`btn btn-primary m-2 button-width ${jsonLog && `disabled`}`}>
          JSON Logs
        </button>
        <button
          onClick={freeTextLogButton}
          className={`btn btn-primary m-2 button-width ${!jsonLog && `disabled`}`}>
          Free text
        </button>

        <textarea
          className="form-control form mt-2"
          id="textarea"
          rows="3"
          type="text"
          value={text}
          onChange={textInput}
          onKeyDown={preventTab}
        ></textarea>


        <div className="row mt-2 container-fluid">

          {jsonLog &&

            <button
              className="btn btn-primary col-sm m-1"
              type="button"
              onClick={validation}
            >
              Validate JSON
            </button>
          }

          {!jsonLog &&

            <button
              className="btn btn-primary col-sm m-1"
              type="button"
              onClick={validation}
            >
              Send Log
            </button>
          }



          <button
            className="btn btn-danger col-sm m-1"
            type="button"
            onClick={clear}
          >
            Clear
          </button>
        </div>

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

      {simpleLogSent &&
        <>
          <div className="alert alert-success text-center" type="button" disabled>
            🚀 Log SENT! 🚀
          </div>
        </>
      }

    </div>
  );
}

export default Log_text;
