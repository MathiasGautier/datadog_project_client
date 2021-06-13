import React, { useState, useContext, useEffect, useRef } from "react";

import { useHistory } from "react-router-dom";
import AuthContext from "../auth/UserContext";

function Log_text({ setJsonStr, setJsonError, setWarning }) {
  const authContext = useContext(AuthContext);
  const [text, setText] = useState("");

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
  };

  return (
    <div className="container pt-4">
      <div className="form-group text-center">
        <label>Enter you log in JSON format</label>

        <textarea
          className="form-control form mt-2"
          id="textarea"
          rows="3"
          type="text"
          value={text}
          onChange={textInput}
        ></textarea>

        <div className="row mt-2 container-fluid">
          <button
            className="btn btn-primary col-sm m-1"
            type="button"
            onClick={validation}
          >
            Validate JSON
          </button>

          <button
            className="btn btn-danger col-sm m-1"
            type="button"
            onClick={clear}
          >
            Clear
          </button>
        </div>

        {/* <pre
            className="language-json"
            data-jsonp="https://api.github.com/repos/leaverou/prism/contents/prism.js"
          >
        {jsonError && jsonError}
        <code>
        {
          jsonError===true?
          jsonError
        :
          text && JSON.stringify(JSON.parse(text), null, "\t")
        
        }
        </code>

         
            {/* <code>{text && JSON.stringify(JSON.parse(text), null, "\t")}</code> */}
        {/*   </pre> */}
      </div>
    </div>
  );
}

export default Log_text;
