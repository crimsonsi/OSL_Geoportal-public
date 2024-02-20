import { useRef, useEffect } from "react";
import "../Styles/SingleInstancePage.scss";
import ThematicPreview from "../components/ThematicMap/ThematicPreview";
import WorldDataPreview from "../components/WorldData/WorldDataPreview";
import BaseMapPreview from "../components/BaseMap/BaseMapPreview";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/footer";
import { useState } from "react";
import Button from "../components/Utils/ButtonMain";
import CommentsSection from "../components/Utils/CommentsSection";
import TopoMapPreview from "../components/Topo/TopoMapPreview";
import TimeSeriesPreview from "../components/TimeSeries/TimeSeriesPreview";

export default function SingleInstancePage(props) {
  const pathname = window.location.pathname.split("/");
  const [service, setService] = useState(null);
  const [prompt, setPrompt] = useState();
  const [isErr, setIsErr] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const instanceId = window.location.pathname.split("/")[3];
  const [refresh, setRefresh] = useState(true);
  //
  const [successMsg, setSuccessMsg] = useState();
  const [changed, setChanged] = useState(false);
  const rfContent = useRef();
  const rfName = useRef();
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
      setPrompt("");
    }
    const i = opts
      .map((e) => {
        return e;
      })
      .indexOf(pathname[2].replaceAll("%20", " "));

    if (i !== -1) {
      setChoice("thematic");
    } else {
      if (pathname[2].includes("Raster")) {
        setChoice("raster");
      } else if (pathname[2].includes("General")) {
        setChoice("general");
      }
      else if (pathname[2].includes("Time")) {
        setChoice("timeseries")
      }
      else window.location.href = "/portal/maps";
    }
  });

  const postComment = () => {
    setIsLoading(true);
    if (props.currentUser) {
      setPrompt("");
      let d = body;
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
              setIsErr("comment successful");
              setTimeout(() => {
                setIsErr("");
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
          .catch((err) => {
            setIsLoading(false);
            setIsErr("Please login or register to send a comment!");
            setTimeout(() => {
              setIsErr("");
            }, 2000);
          });
      }
    } else {
      setPrompt("Please login first");
    }
  };

  return (
    <div className="wrapper">
      <div className="MainContent">
        <div className="headings">
          <Header
            isAuthenticated={props.isAuthenticated}
            setIsAuthenticated={props.setIsAuthenticated}
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
            parent="singleinstance"
          />
        </div>
        <div className="SingleInstancePage">
          <div>
            {choice && choice === "thematic" && <ThematicPreview />}
            {choice && choice === "raster" && <BaseMapPreview />}
            {choice && choice === "general" && <WorldDataPreview />}
            {choice && choice === "timeseries" && <TimeSeriesPreview />}
          </div>

          <div className="addComment">
            <p>{successMsg}</p>
            <span className="err">{isErr}</span>
            <div className="input">
              <label htmlFor="">Leave a Comment</label>
              <textarea
                onClick={() =>
                  !props.isAuthenticated &&
                  setPrompt("Please login to send a comment...")
                }
                ref={rfContent}
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <button
              onClick={() => {
                postComment();
              }}
            >
              Submit
            </button>
          </div>
          <div className="comments">
            <CommentsSection
              instanceID={body.To}
              refresh={refresh}
              changed={changed}
              currentUser={props.currentUser}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
