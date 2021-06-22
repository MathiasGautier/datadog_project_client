import React, { useState } from "react";
import LogText from "../components/Log_text.jsx";
import Navbar from "../navbar";
import CodeBox from "../components/CodeBox";

function Main() {
  const [jsonStr, setJsonStr] = useState(null);
  const [jsonError, setJsonError] = useState(null);
  const [warning, setWarning] = useState(false);



  return (
    <>
      <Navbar />
      <div className="main">
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
              There was an error somewhere... Please see the message blow 👇
            </div>
          )}
        </div>
        <CodeBox jsonStr={jsonStr} jsonError={jsonError} />
      </div>
    </>
  );
}

export default Main;
