import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Link,
  Box,
} from "@mui/material";
import ForgotPassword from "./forgotPassword";

export default function LoginPopUp(props) {
  const [isError, setIsError] = useState("");
  const [body, updateBody] = useState({ Email: "", Password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const rfEmail = useRef();
  const rfPassword = useRef();

  const loginUser = () => {
    const email = rfEmail.current.value.toLowerCase().trim();
    const password = rfPassword.current.value;

    setIsError("");

    if (!validateEmail(email))
      return setIsError("Please enter a valid email address!");
    if (!validatePassword(password))
      return setIsError("Password must be at least 6 characters!");

    updateBody({ Email: email, Password: password });
    setIsLoading(true);

    fetch("/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ Email: email, Password: password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
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
      .catch(() => {
        setIsLoading(false);
        setIsError("Login failed!");
        props.setIsAuthenticated(false);
      });
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
      <Dialog
        open={props.open}
        onClose={() => props.setToggleLogin(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {isError && (
            <Typography color="error" marginBottom="1rem">
              {isError}
            </Typography>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginUser();
            }}
            style={{ width: "100%" }}
          >
            <TextField
              inputRef={rfEmail}
              label="Email Address *"
              type="email"
              placeholder="Enter Email Address"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              inputRef={rfPassword}
              label="Password *"
              type="password"
              placeholder="Enter Password"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Box textAlign="right" marginBottom="1rem">
              <Link
                component="button"
                variant="body2"
                onClick={() => setForgot(true)}
              >
                Forgot password?
              </Link>
            </Box>
            <DialogActions>
              <Button
                onClick={() => props.setToggleLogin(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </DialogActions>
          </form>
          <Box marginTop="1rem">
            <Typography>
              Don't have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  props.setToggleLogin(false);
                  props.setToggleRegister(true);
                }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      {forgot && <ForgotPassword setForgot={setForgot} />}
    </>
  );
}
