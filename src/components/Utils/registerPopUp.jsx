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

export default function RegisterPopUp(props) {
  const [isError, setIsError] = useState("");
  const [body, updateBody] = useState({
    Email: "",
    Password: "",
    cPassword: "",
    Phone: "",
    Name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const rfEmail = useRef();
  const rfPassword = useRef();
  const rfcPassword = useRef();
  const rfName = useRef();
  const rfPhone = useRef();

  const registerUser = () => {
    const email = rfEmail.current.value.toLowerCase().trim();
    const password = rfPassword.current.value;
    const cPassword = rfcPassword.current.value;
    const name = rfName.current.value;
    const phone = rfPhone.current.value;

    setIsError("");

    if (!name) return setIsError("Name is required!");
    if (!phone || phone.length < 11)
      return setIsError(
        "Phone is required! Include country code e.g. 254790123123"
      );
    if (!validateEmail(email))
      return setIsError("Please enter a valid email address!");
    if (!validatePassword(password))
      return setIsError("Password must be at least 6 characters!");
    if (password !== cPassword) return setIsError("Passwords do not match");

    updateBody({
      Email: email,
      Password: password,
      cPassword,
      Phone: phone,
      Name: name,
    });
    setIsLoading(true);

    fetch("/api/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
        cPassword,
        Phone: phone,
        Name: name,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration failed!!");
        }
      })
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          setIsError(data.success);
          localStorage.setItem("cilbup_ksa", data.token);
          props.setIsAuthenticated(true);
          props.setToggleRegister(false);
        } else {
          setIsError(data.error);
          props.setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsError("Registration failed!");
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
    <Dialog
      open={props.open}
      onClose={() => props.setToggleRegister(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        {isError && (
          <Typography color="error" marginBottom="1rem">
            {isError}
          </Typography>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >
          <TextField
            inputRef={rfName}
            label="Full Name *"
            type="text"
            placeholder="Enter your full name"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            inputRef={rfPhone}
            label="Phone Number *"
            type="tel"
            placeholder="Enter a valid number"
            fullWidth
            margin="normal"
            variant="outlined"
          />
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
          <TextField
            inputRef={rfcPassword}
            label="Confirm Password *"
            type="password"
            placeholder="Confirm Password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Box textAlign="right" marginBottom="1rem">
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                window.location.href = "/terms";
              }}
            >
              Review terms and conditions
            </Link>
          </Box>
          <DialogActions>
            <Button
              onClick={() => props.setToggleRegister(false)}
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
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                props.setToggleLogin(true);
                props.setToggleRegister(false);
              }}
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
