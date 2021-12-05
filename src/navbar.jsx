import React, { useState, useContext, useRef } from "react";
import logo from "./logo.png";
import apiHandler from "./services/apiHandler";
import { useHistory } from "react-router-dom";
import AuthContext from "./auth/UserContext";

function Navbar() {
  const [hide, setHide] = useState(true);
  const [apiOk, setApiOk] = useState(false);
  const [apiBad, setApBad] = useState(false);
  const [updateAPI, setUpdateApi] = useState(false);
  const [apiKeyField, setApiKeyField] = useState("");

  let timerID = useRef(null);

  const authContext = useContext(AuthContext);
  const history = useHistory();


  const validateApiKeyButton = () => {
    let apiKey = { apiKey: authContext.user.apiKey[0] };
    apiHandler.validateApi(apiKey).then((data) => {
      if (data === "OK") {
        setApiOk(true);
        timerID = setTimeout(() => {
          setApiOk(false);
        }, 2000);
      }
      if (data === "error") {
        setApBad(true);
        timerID = setTimeout(() => {
          setApBad(false);
        }, 2000);
      }
      console.log(data);
    });
  };

  const confirmChangeApi = (e) => {
    e.preventDefault();
    let apiKey = { apiKey: apiKeyField };
    let id = authContext.user._id;
    if (apiKeyField === "") {
      console.log("API Key field is empty");
    }
    if (apiKeyField !== "") {
      apiHandler.updateApiKey(apiKey, id).then((data) => {
        console.log(data);
        authContext.user.apiKey[0] = apiKeyField;
        setUpdateApi(false);
      });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-light background navHeight p-0">
        <div className="logo-background">
          <div className="container d-flex flex-column align-items-center">
            <div className="navbar-brand">
              <img src={logo} alt="" height="60" />
            </div>
          </div>
          <div className="container">
            <h4>test_your_stuff</h4>
          </div>
        </div>

        <>
          {updateAPI ? (
            true && (
              <form className="row g-5">
                <div className="col-auto">
                  <p className="navbar">New API key</p>
                </div>
                <div className="col-auto">
                  <label htmlFor="textApiKey" className="visually-hidden">
                    API key
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputApikey"
                    placeholder="API Key"
                    onChange={(e) => setApiKeyField(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-primary mb-3"
                    onClick={confirmChangeApi}
                  >
                    Confirm
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger mb-3 ms-2"
                    onClick={() => setUpdateApi(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )
          ) : (
            <>
             
                {authContext.user && <h4>Hey {authContext.user.username}!</h4>}
    
              <div className="d-flex">
                <div className="d-flex mt-3">
                  <p className="bg-apiKey py-2 px-3">API Key</p>
                  {authContext.user && (
                    <div
                      onMouseOver={() => setHide(false)}
                      onMouseLeave={() => setHide(true)}
                    >
                      {hide === false ? (
                        <p className="apiKey me-3 bg-apiKeyBis py-2 px-3">
                          {authContext.user.apiKey[0]}
                        </p>
                      ) : (
                        <p className="apiKey me-3 bg-apiKeyBis py-2 px-3 hoverToSee">
                          Hover to see API Key
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {authContext.user && apiOk === false && apiBad === false && (
                  <div>
                  <button
                    onClick={validateApiKeyButton}
                    className="btn btn-primary m-3"
                    type="button"
                  >
                    Validate API
                  </button>

                  <button
                  className="btn btn-primary mb-3 mt-3 me-3"
                  onClick={() => setUpdateApi(true)}
                >
                  Update API key
                </button>
                </div>
                )}

                {authContext.user && apiOk === true && (
                  <button className="btn btn-success m-3" type="button">
                    Valid!
                  </button>
                )}

                {authContext.user && apiBad === true && (
                  <button className="btn btn-danger m-3" type="button">
                    Not valid
                  </button>
                )}
              </div>
            </>
          )}
        </>
      </nav>
    </div>
  );
}

export default Navbar;
