import React, { useRef, useState } from "react";
import InputMap from "../maps/InputMap";
import Button from "./ButtonMain";
import Loading from "./Loading";
import ForgotPassword from "./forgotPassword";

export default function LoginPopUp(props) {
  const [isError, setIsError] = useState("");
  const [body, updateBody] = useState({
    Email: null,
    Password: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const rfEmail = useRef();
  const rfPassword = useRef();

  const loginUser = () => {
    let d = body;
    d.Email = rfEmail.current.value.toLowerCase().trim();
    d.Password = rfPassword.current.value;
    updateBody(d);
    setIsError("");

    if (!validateEmail(body.Email))
      return setIsError("Please enter a valid email address!");
    if (!validatePassword(body.Password))
      return setIsError("Password must be at least 6 characters!");

    if (validateEmail(body.Email) && validatePassword(body.Password)) {
      setIsLoading(true);
      fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else throw Error("Login failed");
        })
        .then((data) => {
          setIsLoading(false);
          if (data.success) {
            props.setIsAuthenticated(true);
            props.setToggleLogin(false);
            localStorage.setItem("cilbup_ksa", data.token);
          } else {
            setIsError(data.error);
          }
        })
        .catch((err) => {
          props.setIsAuthenticated(false);
          setIsLoading(false);
          setIsError("Login failed!");
        });
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <h3>Login</h3>
          <h4>{isError}</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <InputMap
              ref={rfEmail}
              label="Email Address *"
              type="email"
              placeholder="Enter Email Address"
            />
            <InputMap
              ref={rfPassword}
              label="Password *"
              type="password"
              placeholder="Enter Password"
            />
            <p>
              Forgot password?{" "}
              <span
                onClick={() => {
                  setForgot(true);
                }}
              >
                Click here
              </span>
            </p>
            <Button label="Submit" handleClick={loginUser} />
          </form>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                props.setToggleLogin(false);
                props.setToggleRegister(true);
              }}
            >
              Register here
            </span>
          </p>
          <h4
            onClick={() => {
              props.setToggleLogin(false);
              props.setToggleRegister(false);
            }}
          >
            Cancel
          </h4>
          {isLoading && <Loading />}
        </div>
      </div>
      {forgot && <ForgotPassword setForgot={setForgot} />}
    </>
  );
}
