import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import AuthContext from "../auth/UserContext";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "../prism.css";

function Log_text() {
  const authContext = useContext(AuthContext);
  const [text, setText] = useState("");
  const [jsonStr, setJsonStr] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [jsonErrorPosition, setJsonErrorPosition] = useState(null);
  const history = useHistory();

  useEffect(() => {
    Prism.highlightAll();
  }, [text]);

  //push to login if no user context found
  if (authContext.isLoggedIn === false) {
    history.push("/");
  }

  //get the text from the input field
  const textInput = (e) => {
    setText(e.target.value);
  };

  const validation = (e) => {
    //JSON Validation
    try {
      //try to parse
      setJsonStr(JSON.parse(text));
    } catch (e) {
      // console.log(">>",JSON.parse(text))
      //if JSON sends an error, get the message and the position

      setJsonError(JSON.stringify(e.message));
      let hasNumber = /\d/;
      if (hasNumber.test(JSON.stringify(e.message)) === true) {
        setJsonErrorPosition(JSON.stringify(e.message).match(/\d+/)[0]);
      } else {
        setJsonErrorPosition(null);
      }
    }

    // let api=authContext.user.apiKey[0];

    // axios
    //   .post(process.env.REACT_APP_BACKEND_URL + "/logs/log", {text, api},  {
    //     headers: { "content-type": "application/json", withCredentials: true },
    //   })
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className="container p-4">
      <div className="form-group text-center">
        <label>Enter you log</label>
        <div className="textInput">
          <textarea
            className="form-control form mt-2"
            id="exampleFormControlTextarea1"
            rows="3"
            type="text"
            onChange={textInput}
          ></textarea>
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary mt-2"
            type="button"
            onClick={validation}
          >
            Validate
          </button>
        </div>
        {jsonError && jsonError}

        <div>
          <pre
            className="language-json"
            data-jsonp="https://api.github.com/repos/leaverou/prism/contents/prism.js"
          >
            <code>{text && text}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Log_text;
