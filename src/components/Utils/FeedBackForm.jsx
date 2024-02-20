import React, {useRef} from "react";
import "../../Styles/Feedbackform.scss";
import { useState } from "react";

export default function FeedBackForm(props) {
  const [isLoading, setIsLoading] = useState(null);
  const [isErr, setIsErr] = useState(null);

  const rfName = useRef();
  const rfEmail = useRef();
  const rfContent = useRef();

  const [body, updateBody] = useState({
    To: "",
    From: "",
    Subject: "FeedBack",
    Content: "",
  });

  const sendFeedBack = () => {
    setIsLoading(true);
    let d = body;
    d.To = rfEmail.current.value;
    d.From = rfName.current.value;
    d.Subject = "FeedBack";
    d.Content = rfContent.current.value;

    updateBody(d);
    setIsErr("");
    if (!validateEmail(body.To))
      return setIsErr("Please enter a valid email address!");
    if (!validateMessage(body.Content))
      return setIsErr("Message can not be blank!");

    if (validateEmail(body.To) && validateMessage(body.Content)) {
      fetch("/api/messages/post", {
        method: "POST",
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
          } else throw Error("");
        })
        .then((data) => {
          setIsLoading(false);
          if (data.success) {
            setIsErr(data.success);
            rfName.current.value = "";
            rfEmail.current.value = "";
            rfContent.current.value = "";
          } else if (data.error) {
            setIsErr(data.error);
          } else setIsErr("Oops! Something went wrong!");
        })
        .catch((err) => {
          setIsLoading(false);
          setIsErr("Oops! Something went wrong!");
        });
    };
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateMessage = (content) => {
    return content.length >= 1;
  };

  return (
    <div className="feedbackform">
      <div className="ff_container">
        <h3>Feedback form</h3>
        <p>We'd like to hear from you!</p>
        <p>{isErr}</p>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input label="Name" placeholder="Full Name" ref={rfName} />

          <input type="text" placeholder="Email" ref={rfEmail} />
          <textarea
            cols="30"
            rows="2"
            placeholder="Message"
            ref={rfContent}
          ></textarea>
          <button
            onClick={() => {
              sendFeedBack();
            }}
          >
            Submit
          </button>
        </form>

        <p
          onClick={() => {
            props.setShowFeedBackForm(false);
          }}
          style={{ cursor: "pointer" }}
        >
          close
        </p>
      </div>
    </div>
  );
};