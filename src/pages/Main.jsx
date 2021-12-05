import React, { useState } from "react";
import LogText from "../components/Log_text.jsx";
import Navbar from "../navbar";
import Sidebar from "../components/Sidebar.jsx";
import CodeBox from "../components/CodeBox";
import Metrics from "../components/Metrics.jsx";

function Main() {
  const [jsonStr, setJsonStr] = useState(null);
  const [jsonError, setJsonError] = useState(null);
  const [warning, setWarning] = useState(false);
  const [isLog, setIsLog] = useState(true);

  return (
    <>
      <Navbar />

      <div className="main">
        <div className="d-flex">
          <Sidebar isLog={isLog} setIsLog={setIsLog} />

          {isLog === true && (
            <div className="flex-column logPart">
              <LogText
                setJsonStr={setJsonStr}
                setJsonError={setJsonError}
                setWarning={setWarning}
              />

              <div className="container pt-2">
                {warning === true && (
                  <div className="alert alert-warning" role="alert">
                    You must enter something before that...
                  </div>
                )}

                {jsonError !== null && (
                  <div className="alert alert-danger" role="alert">
                    There was an error somewhere... Please see the message blow
                    👇
                  </div>
                )}
              </div>
              <CodeBox jsonStr={jsonStr} jsonError={jsonError} />
            </div>
          )}
          {isLog === false && (
            <>
              <Metrics />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
