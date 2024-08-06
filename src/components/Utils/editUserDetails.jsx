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

export default function EditUserDetails(props) {
  const [isError, setIsError] = useState("");
  const [body, updateBody] = useState({
    Phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const rfPhone = useRef();

  const editDetails = () => {
    if (props.isAuthenticated) {
      let d = body;
      d.Phone = rfPhone.current.value;
      updateBody(d);
      setIsError("");

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
          } else throw new Error("Change of details failed");
        })
        .then((data) => {
          setIsLoading(false);
          if (data.success) {
            localStorage.clear();
            props.setIsAuthenticated(false);
          } else {
            setIsError(data.error);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setIsError("Change of details failed!");
        });
    } else {
      setIsError("You have been logged out! Please login afresh first!");
    }
  };

  const placeholder = `Current phone no: ${props.currentUser.Phone}`;

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setToggleEditDetails(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Edit Account Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Edit Account Details for {props.currentUser.Name}
        </Typography>
        {isError && (
          <Typography color="error" marginBottom="1rem">
            {isError}
          </Typography>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editDetails();
          }}
          style={{ width: "100%" }}
        >
          <TextField
            inputRef={rfPhone}
            label="Change Phone Number"
            type="number"
            placeholder={placeholder}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <DialogActions>
            <Button
              onClick={() => props.setToggleEditDetails(false)}
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
        <Typography variant="body2" marginTop="1rem">
          Change your password?{" "}
          <Button
            onClick={() => {
              props.setToggleEditDetails(false);
              props.setToggleChangePass(true);
            }}
            color="primary"
          >
            Click here
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
