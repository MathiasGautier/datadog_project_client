import React, { useState, useContext, useEffect, useRef } from "react";
import apiHandler from "../services/apiHandler";
import AuthContext from "../auth/UserContext";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(false);
  let timerID = useRef(null);
   const history = useHistory();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .login(user)
      .then((data) => {
        setMessage("yes");
        resetForm();
        timerID = setTimeout(() => {
          authContext.setUser(data);

          history.push("/send_logs");
        }, 2000);
      })
      .catch((error) => {
        setMessage("no");
        resetForm();
        timerID = setTimeout(() => {
          setMessage(false);
        }, 2000);
        console.log(error);
      });
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={onSubmit}>
        <h3>Sign in</h3>

        <div className="form-group">
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={onChange}
            className="form-control"
            placeholder="Enter user name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={user.password}
            onChange={onChange}
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        {message === "yes" ? (
          <div className="alert alert-success text-center mt-2" role="alert">
            Welcome !
          </div>
        ) : null}
        {message === "no" ? (
          <div className="alert alert-danger text-center mt-2" role="alert">
            Wrong username or password. Please try again or register a account.
          </div>
        ) : null}
        <button className="btn btn-primary btn-lg btn-block mt-3" type="submit">
          Submit
        </button>
        <p className="text-right mt-2">
          <button className="btn btn-link" onClick={props.createAccountBtn}>
            Or create an account
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
