import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function ChangePassword(props) {
  const [isError, setIsError] = useState("");
  const [body, updateBody] = useState({
    Password: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const rfOldPassword = useRef();
  const rfNewPassword = useRef();
  const rfConfirmNewPassword = useRef();

  const changePassword = () => {
    if (props.isAuthenticated) {
      let d = body;
      d.Password = rfOldPassword.current.value;
      d.NewPassword = rfNewPassword.current.value;
      d.ConfirmNewPassword = rfConfirmNewPassword.current.value;
      updateBody(d);
      setIsError("");

      if (!body.Password) return setIsError("Old password is required!");
      if (!body.NewPassword || body.NewPassword.length < 6)
        return setIsError("New Password must be at least 6 characters!");
      if (!validatePassword(body.NewPassword, body.ConfirmNewPassword))
        return setIsError("New Password and Confirm New Password do not match");

      if (validatePassword(body.NewPassword, body.ConfirmNewPassword)) {
        setIsLoading(true);
        fetch(`/api/users/${props.currentUser.UserID}`, {
          method: "PUT",
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
            } else throw new Error("Could not Change password!");
          })
          .then((data) => {
            setIsLoading(false);
            if (data.success) {
              setIsError(data.success);
              setTimeout(() => {
                props.setToggleChangePass(false);
              }, 1000);
              localStorage.clear();
              props.setIsAuthenticated(false);
            } else {
              setIsError(data.error);
            }
          })
          .catch(() => {
            setIsLoading(false);
            setIsError("Could not Change password!");
          });
      }
    } else {
      setIsError("You have been logged out! Please login afresh first!");
    }
  };

  const validatePassword = (newPassword, confirmNewPassword) => {
    return confirmNewPassword === newPassword;
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setToggleChangePass(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Change Password for {props.currentUser.Name}
        </Typography>
        {isError && (
          <Typography color="error" marginBottom="1rem">
            {isError}
          </Typography>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changePassword();
          }}
          style={{ width: "100%" }}
        >
          <TextField
            inputRef={rfOldPassword}
            label="Enter Old Password *"
            type="password"
            placeholder="Enter Old Password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            inputRef={rfNewPassword}
            label="Enter New Password *"
            type="password"
            placeholder="New Password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            inputRef={rfConfirmNewPassword}
            label="Confirm New Password *"
            type="password"
            placeholder="Confirm New Password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <DialogActions>
            <Button
              onClick={() => props.setToggleChangePass(false)}
              color="secondary"
            >
              Close
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
      </DialogContent>
    </Dialog>
  );
}
