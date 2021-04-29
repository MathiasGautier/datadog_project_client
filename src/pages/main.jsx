import React from "react";
import LogText from "../components/log_text";
import Navbar from "../navbar"

function main() {
  return (
    <>
    <Navbar/>
    <div className="main">
      <div className="d-flex">
        <LogText/>
        <div className="container border_colored m-4"></div>
      </div>
    </div>
    </>
  );
}

export default main;
