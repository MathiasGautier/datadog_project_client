import React, { useState, useContext, useEffect, useRef } from "react";
import apiHandler from "../services/apiHandler";
import AuthContext from "../auth/UserContext";
import { useHistory } from "react-router-dom";

function Register(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordValidation: "",
    role: "user",
    apiKey: "",
  });

  const [message, setMessage] = useState(null);
  const history = useHistory();
  const authContext = useContext(AuthContext);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);


  const login = () => {
    apiHandler
      .login(user)
      .then((data) => {
        console.log(data);
        authContext.setUser(data);

        history.push("/send_logs");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", passwordValidation: "", apiKey: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (
      user.password !== user.passwordValidation ||
      user.username === "" ||
      user.apiKey === ""
    ) {
      setMessage("yes");
      resetForm();
      timerID = setTimeout(() => {
        setMessage(false);
      }, 2000);
    } else {
      apiHandler
        .register(user)
        .then((data) => {
          resetForm();
          setMessage("no");
          timerID = setTimeout(() => {
            login();
          }, 2000);
        })
        .catch((error) => {
          setMessage("yes");
          resetForm();
          timerID = setTimeout(() => {
            setMessage(false);
          }, 2000);
          console.log(error);
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={onSubmit}>
        <h3>Register an account</h3>
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
        <div className="form-group mt-2">
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
        <div className="form-group mt-2">
          <label htmlFor="password">Confirm password :</label>
          <input
            type="password"
            name="passwordValidation"
            autoComplete="on"
            value={user.passwordValidation}
            onChange={onChange}
            className="form-control"
            placeholder="Confirm password"
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="password">Datadog API key :</label>
          <input
            type="password"
            name="apiKey"
            autoComplete="on"
            value={user.apiKey}
            onChange={onChange}
            className="form-control"
            placeholder="Enter API key"
          />
        </div>

        {message === "no" ? (
          <div className="alert alert-success text-center mt-2" role="alert">
            Account successfully created !
          </div>
        ) : null}
        {message === "yes" ? (
          <div className="alert alert-danger text-center mt-2" role="alert">
            We couldn't create your account... please verify your informations.
          </div>
        ) : null}
        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
          Register
        </button>
        <p className="text-right mt-2">
          <button className="btn btn-link" onClick={props.backToLoginBtn}>
            Allready ave an account ?
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
