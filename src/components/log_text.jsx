import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import AuthContext from "../auth/UserContext";

function Log_text() {
  const authContext = useContext(AuthContext);
  const [text, setText] = useState("");
  const history = useHistory();

  const textInput = (e) => {
    setText(e.target.value);
  };
  console.log(authContext);
  if (authContext.isLoggedIn === false) {
    history.push("/");
  }

  console.log(authContext.user&&authContext.user.apiKey[0])
  
  const validation = (e) => {



let textRes= JSON.parse(text);
textRes["ddsource"]="test_your_logs";
textRes=JSON.stringify(textRes);

console.log(textRes)

    let api=authContext.user.apiKey[0];
    
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/logs/log", {textRes, api},  {
        headers: { "content-type": "application/json", withCredentials: true },
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log(error);
      });
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
      </div>
    </div>
  );
}

export default Log_text;
