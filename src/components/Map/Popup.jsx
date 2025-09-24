import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Divider,
  Grid,
  Fade,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function Popup(props) {
  const [cols, setCols] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.data) {
      let d = { ...props.data };
      delete d.geometry;
      const c = Object.keys(d);
      setCols(c);
      setOpen(true);
    }
  }, [props.data]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      props.setPopup(null);
    }, 300);
  };

  return (
    <Fade in={open} timeout={300}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2000,
          minWidth: 300,
          maxWidth: 500,
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 3,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" component="h3">
              Feature Details
            </Typography>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={1}>
            {cols &&
              cols.map((e, index) => (
                <Grid size={{ xs: 12 }} key={index}>
                  <Box sx={{ py: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ fontWeight: 600 }}>
                      {e.charAt(0).toUpperCase() + e.slice(1)}:{" "}
                    </Typography>
                    <Typography variant="body2" component="span">
                      {props.data[e]}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Box>
    </Fade>
  );
}
