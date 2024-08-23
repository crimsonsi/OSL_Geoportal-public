import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function UserAccount(props) {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setToggleAccount(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Account Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Name: {props.currentUser.Name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {props.currentUser.Phone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {props.currentUser.Email}
        </Typography>
        {props.currentUser.Status && (
          <Typography variant="body1" gutterBottom>
            Status: Active
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setToggleAccount(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
