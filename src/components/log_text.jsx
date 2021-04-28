import React, { useState } from "react";
import axios from "axios";

function Log_text() {
  const [text, setText] = useState("");

  const textInput = (e) => {
    setText(e.target.value);
  };

  const validation = (e) => {
    console.log(text);
    axios.post(process.env.REACT_APP_BACKEND_URL+"/logs/log", text, {
      headers: { "content-type": "application/json", withCredentials: true },
    })
    .then((res)=>{
      console.log("res", res)
    })
    .catch((error)=>{
      console.log(error)
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
        <div class="d-grid">
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
