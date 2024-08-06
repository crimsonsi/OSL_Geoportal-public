import React, { useRef, useState, useEffect } from "react";
import Footer from "../components/Utils/footer";
import Hero from "../components/ContactUs/Hero";
import Button from "../components/Utils/button1";

export default function ContactUsPage(props) {
  const [isErr, setIsErr] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  var jwt = require("jsonwebtoken");

  useEffect(() => {
    const token = localStorage.getItem("cilbup_ksa");
    if (token) {
      try {
        var decoded = jwt.decode(token);
        setCurrentUser(decoded);

        if (Date.now() >= decoded.exp * 1000) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const rfName = useRef();
  const rfEmail = useRef();
  const rfSubject = useRef();
  const rfContent = useRef();

  const [body, updateBody] = useState({
    To: "",
    From: "",
    Subject: "",
    Content: "",
  });

  const postMessage = () => {
    setIsLoading(true);
    let d = body;
    if (currentUser) {
      d.To = currentUser.Email;
      d.From = currentUser.Name;
    } else {
      d.To = rfEmail.current.value;
      d.From = rfName.current.value;
    }
    d.Subject = rfSubject.current.value;
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
            rfSubject.current.value = "";
            rfContent.current.value = "";
          } else if (data.error) {
            setIsErr(data.error);
          } else setIsErr("Oops! Something went wrong!");
        })
        .catch((err) => {
          setIsLoading(false);
          setIsErr("Oops! Something went wrong!");
        });
    }
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
    <div className="ContactUsPage">
      <div className="MainContent">
        <div className="c_hero">
          <Hero
            isAuthenticated={props.isAuthenticated}
            setIsAuthenticated={props.setIsAuthenticated}
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
            parent="Contact Us"
          />
        </div>
        <div className="contactsContent">
          <div className="userMessage">
            <div className="message">
              <h2>How can we help you?</h2>
              <br />
              {!props?.isAuthenticated ? (
                <h5>
                  Kindly login or create an account before sending us a message.
                  <br />
                  Thank you, for your understanding. We look forward to hearing
                  from you!
                </h5>
              ) : (
                <h5>Welcome {props?.currentUser?.Name}</h5>
              )}
              <br />
              <p>
                Thank you for visiting our Geoportal. Might you be having any
                trouble and need our assistance? Well, we are eager to help!
                Just log a message to us and our customer service team will
                respond to your needs as soon as possible.{" "}
              </p>
            </div>
            <div className="form">
              <p>{isErr}</p>
              <div className="input">
                <label htmlFor="">Full Name *</label>
                <input label="Name" placeholder="Full Name" ref={rfName} />
              </div>
              <div className="input">
                <label htmlFor="">Email Address</label>
                <input label="Email" placeholder="Email" ref={rfEmail} />
              </div>

              <div className="input">
                <label htmlFor="">Subject</label>
                <input label="Subject" placeholder="Subject" ref={rfSubject} />
              </div>

              <div className="input">
                <label htmlFor="">Message</label>
                <textarea
                  className="content"
                  placeholder="Write your Message here"
                  label="Content"
                  ref={rfContent}
                  name="Content"
                  id=""
                ></textarea>
              </div>
              <button
                onClick={() => {
                  postMessage();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
