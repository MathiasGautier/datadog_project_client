import React, { useState } from "react";
import logo from "./logo.png";

function Navbar() {
  const [apiKey, setApikey] = useState("");

  const input = (e) => setApikey(e.target.value);
  const validationButton = (e) => console.log(apiKey);

  return (
    <div>
      <nav className="navbar navbar-light background navHeight p-0">
        <div className="logo-background">
          <div className="container d-flex flex-column align-items-center">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="" height="45" />
            </a>
          </div>
          <div className="container">
            <h4>test_your_logs</h4>
          </div>
        </div>
        <div className="d-flex">
          <p className="me-3 mt-2">API Key</p>
          <input className="apiKey me-3" onChange={input}></input>
          <button
            onClick={validationButton}
            className="btn btn-primary me-4"
            type="button"
          >
            GO
          </button>
        </div>
        <div></div>
      </nav>
    </div>
  );
}

export default Navbar;
