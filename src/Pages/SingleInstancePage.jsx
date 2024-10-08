import { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import ThematicPreview from "../components/ThematicMap/ThematicPreview";
import WorldDataPreview from "../components/WorldData/WorldDataPreview";
import BaseMapPreview from "../components/BaseMap/BaseMapPreview";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/footer";
import CommentsSection from "../components/Utils/CommentsSection";
import TimeSeriesPreview from "../components/TimeSeries/TimeSeriesPreview";

export default function SingleInstancePage(props) {
  const pathname = window.location.pathname.split("/");
  const [isErr, setIsErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const instanceId = window.location.pathname.split("/")[3];
  const [refresh, setRefresh] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [changed, setChanged] = useState(false);
  const rfContent = useRef();
  const [body, updateBody] = useState({
    To: instanceId,
    From: "",
    Subject: "",
    Content: "",
    UserID: "",
  });
  const [choice, setChoice] = useState(null);
  const opts = [
    "Agriculture",
    "Climate and Weather",
    "Natural Resources",
    "Spatial Planning",
    "Disaster",
  ];

  useEffect(() => {
    if (props.currentUser) {
      setIsErr("");
    }
    const i = opts.map((e) => e).indexOf(pathname[2].replaceAll("%20", " "));

    if (i !== -1) {
      setChoice("thematic");
    } else {
      if (pathname[2].includes("Raster")) {
        setChoice("raster");
      } else if (pathname[2].includes("General")) {
        setChoice("general");
      } else if (pathname[2].includes("Time")) {
        setChoice("timeseries");
      } else window.location.href = "/portal/maps";
    }
  }, [pathname, opts, props.currentUser]);

  const postComment = () => {
    if (props.currentUser) {
      setIsLoading(true);
      setIsErr("");
      let d = { ...body };
      d.Content = rfContent.current.value;
      d.To = pathname[3];
      d.Subject = pathname[3];
      d.UserID = props.currentUser?.UserID;
      d.From = props.currentUser?.Name;
      updateBody(d);

      if (!body.Content) {
        setIsErr("Enter some text!");
      } else {
        fetch("/api/comments/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else throw Error("");
          })
          .then((data) => {
            setIsLoading(false);
            setChanged(!changed);
            if (data.success) {
              setSuccessMsg("Comment posted successfully!");
              setTimeout(() => {
                setSuccessMsg("");
              }, 2000);
              rfContent.current.value = "";
              setRefresh(!refresh);
            } else if (data.comment) {
              setIsErr(data.comment);
              setTimeout(() => {
                setIsErr("");
              }, 2000);
            } else {
              setIsErr(data.error);
              setTimeout(() => {
                setIsErr("");
              }, 2000);
            }
          })
          .catch(() => {
            setIsLoading(false);
            setIsErr("Please login or register to send a comment!");
            setTimeout(() => {
              setIsErr("");
            }, 2000);
          });
      }
    } else {
      setIsErr("Please login first");
    }
  };

  return (
    <Box className="SingleInstancePage">
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="singleinstance"
      />

      <Container disableGutters>
        <Box my={1}>
          {choice === "thematic" && <ThematicPreview />}
          {choice === "raster" && <BaseMapPreview />}
          {choice === "general" && <WorldDataPreview />}
          {choice === "timeseries" && <TimeSeriesPreview />}
        </Box>
        <Box my={4}>
          {successMsg && <Alert severity="success">{successMsg}</Alert>}
          {isErr && <Alert severity="error">{isErr}</Alert>}
          <Typography variant="h5" gutterBottom>
            Leave a Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            placeholder="Enter your comment"
            inputRef={rfContent}
            onClick={() =>
              !props.isAuthenticated &&
              setIsErr("Please login to send a comment...")
            }
          />
          <Box my={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={postComment}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
        <CommentsSection
          instanceID={body.To}
          refresh={refresh}
          changed={changed}
          currentUser={props.currentUser}
        />
      </Container>

      <Footer />
    </Box>
  );
}
