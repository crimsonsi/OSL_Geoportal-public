import { React, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "./App.scss";
// import Aos from "aos";
// import "aos/dist/aos.css";
import NotFound from "./Pages/404";
import LandingPage from "./Pages/LandingNew";
import DataPage from "./Pages/DataPage";
import SingleInstancePage from "./Pages/SingleInstancePage";
import SingleCollection from "./Pages/SingleCollection";
import AboutPage from "./Pages/AboutPage";
import ContactUsPage from "./Pages/ContactUsPage";
import Terms from "./Pages/Terms";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Category from "./Pages/Category";
import PublicationsPage from "./Pages/Publications";
import StoryMapsPage from "./Pages/StoryMapPage";
import FAQs from "./Pages/FAQs";

function App() {
  // useEffect(() => {
  //   Aos.init();
  // }, []);

  var jwt = require("jsonwebtoken");

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  // const history = useHistory();
  const [page, setPage] = useState();
  const [instancePage, setInstancePage] = useState();
  const [body, updateBody] = useState({
    Page: null,
    Adress: null,
    Keywords: null,
    OtherInfo: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("cilbup_ksa");
    if (token) {
      try {
        var decoded = jwt.decode(token);
        //window.location.reload(false)
        setCurrentUser(decoded);

        if (Date.now() >= decoded.exp * 1000) {
          setIsAuthenticated(false);
        } else {
          //window.location.reload(false)
          setIsAuthenticated(true);
        }
      } catch (error) {
        //window.location.reload(false)
        setIsAuthenticated(false);
      }
    } else {
      //window.location.reload(false)
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    trackPageView(); // To track the first pageview upon load
  }, []);

  function trackPageView() {
    const pathDirectories = window.location.pathname.split("/");
    if (pathDirectories.length > 2) {
      if (pathDirectories.includes("maps")) {
        setPage(pathDirectories[2].replaceAll("%20", " "));
        setInstancePage(pathDirectories[2].replaceAll("%20", " "));
      }
    } else {
      if (pathDirectories.length === 2) {
        switch (pathDirectories[1]) {
          case "":
            setPage("Home");
            break;
          case "contact":
            setPage("Contact Us");
            break;
          case "about":
            setPage("About Us");
            break;
          case "data":
            setPage("Data");
            break;
        }
      } else {
        setPage(pathDirectories[1]);
      }
    }
  }

  useEffect(() => {
    let d = body;
    d.Page = page;
    d.Keywords = instancePage ? instancePage : null;
    d.OtherInfo = window.location.pathname;
    updateBody(d);
    page &&
      fetch("/api/stats/create", {
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
        .catch((err) => {});
  }, [page]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/Categories/*">
          <Category
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>

        <Route exact path="/data">
          <DataPage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>

        <Route exact path="/maps/*">
          <SingleInstancePage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/collections/*">
          <SingleCollection
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/about">
          <AboutPage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/publications">
          <PublicationsPage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/knowledgehub/storymap/*">
          <StoryMapsPage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/faqs">
          <FAQs
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/contact">
          <ContactUsPage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/terms">
          <Terms
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/privacypolicy">
          <PrivacyPolicy
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
