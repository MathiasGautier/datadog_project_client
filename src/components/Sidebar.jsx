import React, { useState, useContext, useRef } from "react";
import apiHandler from "../services/apiHandler.js";
import AuthContext from "../auth/UserContext";
import { useHistory } from "react-router-dom";

function Sidebar({ isLog, setIsLog, isMetrics,  setIsMetrics, isEvents, setIsEvents}) {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const logoutButton = () => {
    apiHandler.logout().then((data) => {
      authContext.removeUser();
      console.log("Disconnected");
      history.push("/");
    });
  };

  const sendLogsButton = () => {
    setIsLog(true);
    setIsMetrics(false);
    setIsEvents (false)
  };

  const sendMetricsButton = () => {
    setIsMetrics(true);
    setIsLog(false);
    setIsEvents(false)
  };

  const sendEventsButton =()=>{
    setIsEvents(true)
    setIsMetrics(false);
    setIsLog(false);
  }

  return (
    <div className="logo-background sideBar text-center">
      <button
        onClick={sendLogsButton}
        className={`btn btn-primary mt-5 button-width ${isLog && "disabled"}`}
        type="button"
      >
        Send Logs
      </button>
      <button
        onClick={sendMetricsButton}
        className={`btn btn-primary mt-4 button-width ${
          isMetrics && "disabled"
        }`}
        type="button"
      >
        Send Metrics
      </button>
      <button
        onClick={sendEventsButton}
        className={`btn btn-primary mt-4 mb-4 button-width ${
          isEvents && "disabled"
        }`}
        type="button"
      >
        Send Events
      </button>
      <button
        onClick={logoutButton}
        className="btn btn-danger m-4 button-width"
        type="button"
      >
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
