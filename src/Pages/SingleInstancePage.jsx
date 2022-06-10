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

export default function SingleInstancePage(props) {
  const pathname = window.location.pathname.split("/");
  const [service, setService] = useState(null);
  const [prompt, setPrompt] = useState();
  const [isErr, setIsErr] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const instanceId = window.location.pathname.split("/")[5];
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

  useEffect(() => {
    if (props.currentUser) {
      setPrompt("");
    }
  });

  const postComment = () => {
    setIsLoading(true);
    if (props.currentUser) {
      setPrompt("");
      let d = body;
      d.Content = rfContent.current.value;
      d.To = instanceId;
      d.UserID = props.currentUser?.UserID;
      d.From = props.currentUser?.Name;
      updateBody(d);
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
            setSuccessMsg("comment successful");
            setTimeout(() => {
              setSuccessMsg("");
            }, 6000);
            setIsErr(data.success);
            rfContent.current.value = "";
            setRefresh(!refresh);
          } else if (data.error) {
            setIsErr(data.error);
          } else setIsErr("Oops! Something went wrong!");
        })
        .catch((err) => {
          setIsLoading(false);
          setIsErr("Oops! Something went wrong!");
        });
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
          />
        </div>
        <div className="SingleInstancePage">
          <div>
            {pathname[3] === "thematic" && (
              <>
                <ThematicPreview instanceId={instanceId} />
              </>
            )}
            {pathname[3] === "world" && (
              <>
                <WorldDataPreview instanceId={instanceId} />
              </>
            )}
            {pathname[3] === "basemap" && (
              <>
                <BaseMapPreview instanceId={instanceId} />
              </>
            )}
            {pathname[3] === "topo" && (
              <>
                <TopoMapPreview instanceId={instanceId} />
              </>
            )}
          </div>

          <div className="addComment">
            <h3>Leave a Comment</h3>
            <br />
            <p>{prompt}</p>
            <p>{successMsg}</p>
            <div className="comment">
              {props.currentUser?.Name ? (
                <div className="symbol">{props.currentUser.Name.charAt(0)}</div>
              ) : (
                <div className="symbol">A</div>
              )}
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
            <div className="btn">
              <Button
                label="Submit"
                handleClick={() => {
                  postComment();
                }}
              />
            </div>
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
