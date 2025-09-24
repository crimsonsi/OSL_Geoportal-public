import { React, useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import theme from "./theme";
import "./App.scss";
// import Aos from "aos";
// import "aos/dist/aos.css";

// Lazy load components
const NotFound = lazy(() => import("./Pages/404"));
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const DataPage = lazy(() => import("./Pages/DataPage"));
const SingleInstancePage = lazy(() => import("./Pages/SingleInstancePage"));
const SingleCollection = lazy(() => import("./Pages/SingleCollection"));
const AboutPage = lazy(() => import("./Pages/AboutPage"));
const ContactUsPage = lazy(() => import("./Pages/ContactUsPage"));
const Terms = lazy(() => import("./Pages/Terms"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const Category = lazy(() => import("./Pages/Category"));
const PublicationsPage = lazy(() => import("./Pages/Publications"));
const StoryMapsPage = lazy(() => import("./Pages/StoryMapPage"));
const FAQs = lazy(() => import("./Pages/FAQs"));
const ApiDocs = lazy(() => import("./Pages/ApiDocs"));

import { jwtDecode } from "jwt-decode";

// Loading component
const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: theme.palette.background.default,
    }}
  >
    <CircularProgress size={60} />
  </Box>
);

function App() {
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
        var decoded = jwtDecode(token);
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
          case "docs":
            setPage("API Documentation");
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <LandingPage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              exact
              path="/Categories/*"
              element={
                <Category
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              exact
              path="/data"
              element={
                <DataPage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              exact
              path="/maps/*"
              element={
                <SingleInstancePage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              exact
              path="/collections/*"
              element={
                <SingleCollection
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              exact
              path="/about"
              element={
                <AboutPage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              exact
              path="/publications"
              element={
                <PublicationsPage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              exact
              path="/knowledgehub/storymap/*"
              element={
                <StoryMapsPage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              exact
              path="/faqs"
              element={
                <FAQs
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              exact
              path="/docs"
              element={
                <ApiDocs
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              exact
              path="/contact"
              element={
                <ContactUsPage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              exact
              path="/terms"
              element={
                <Terms
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              exact
              path="/privacypolicy"
              element={
                <PrivacyPolicy
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
