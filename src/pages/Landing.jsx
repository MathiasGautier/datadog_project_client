import React, { useState, useContext } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Redirect, } from "react-router-dom";
import AuthContext from "../auth/UserContext";
import logo from "../logo.png";

function Landing() {
  const [registerForm, setRegisterForm] = useState(false);
  const createAccountBtn = (e) => {
    e.preventDefault();
    setRegisterForm(true);
  };
  const backToLoginBtn = (e) => {
    e.preventDefault();
    setRegisterForm(false);
  };
  const authContext = useContext(AuthContext);
  
    console.log(authContext)
    if (authContext.isLoggedIn === true) {return <Redirect to="/send_logs" /> }


  return (
    <>
      <header>
        <nav className="navbar navbar-light background navHeight p-0">
          <div className="logo-background">
            <div className="container d-flex flex-column align-items-center">
              <div className="navbar-brand">
                <img src={logo} alt="" height="45" />
              </div>
            </div>
            <div className="container">
              <h4>test_your_stuff</h4>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
      {/* <div claccName="col">HELLO</div> */}
      <div className="col-sm mt-5">
     
        {registerForm === true ? (
                <Register backToLoginBtn={backToLoginBtn} />
              ) : (
                <Login createAccountBtn={createAccountBtn} />
              )}
      </div>
      </div>
    </>
  );
}
export default Landing;
