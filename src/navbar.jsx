import React, { useState, useContext } from "react";
import logo from "./logo.png";
import apiHandler from "./services/apiHandler";
import { useHistory } from "react-router-dom";
import AuthContext from "./auth/UserContext";

function Navbar() {
  const [apiKey, setApikey] = useState("");
  const [validated, setValidation] = useState(false);
  const [hide, setHide] = useState(true);

  const authContext = useContext(AuthContext);
  const history = useHistory();

  const input = (e) => setApikey(e.target.value);

  const logoutButton = () => {
    apiHandler.logout().then((data) => {
      authContext.removeUser();
      console.log("Disconnected");
      history.push("/");
    });
  };

  return (
    <div>
      <nav className="navbar navbar-light background navHeight p-0">
        <div className="logo-background">
          <div className="container d-flex flex-column align-items-center">
            <div className="navbar-brand">
              <img src={logo} alt="" height="45" />
            </div>
          </div>
          <div className="container">
            <h4>test_your_logs</h4>
          </div>
        </div>
        {authContext.user && <h4>Hey {authContext.user.username}!</h4>}
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
        <button
          onClick={logoutButton}
          className="btn btn-danger me-4"
          type="button"
        >
          Log out
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
