import { Box, Paper, Typography } from "@mui/material";

export default function TitlePanel(props) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        left: 16,
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          px: 2,
          py: 1,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h6" component="h3">
          {props.title}
        </Typography>
      </Paper>
    </Box>
  );
}
