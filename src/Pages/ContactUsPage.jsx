import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import {
  Send as SendIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import { jwtDecode } from "jwt-decode";
import contactBackground from "../assets/imgs/about_1_background.jpg";
import Swal from "sweetalert2";

export default function ContactUsPage(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("cilbup_ksa");
    if (token) {
      try {
        var decoded = jwtDecode(token);
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

  const showLoading = () => {
    Swal.fire({
      title: "Sending Message...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const closeLoading = () => {
    Swal.close();
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      confirmButtonColor: "#1976d2",
    });
  };

  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: message,
      confirmButtonColor: "#1976d2",
    });
  };

  const validateForm = () => {
    const name = rfName.current.value.trim();
    const email = rfEmail.current.value.trim();
    const subject = rfSubject.current.value.trim();
    const content = rfContent.current.value.trim();

    if (!name) {
      showError("Please enter your full name!");
      rfName.current.focus();
      return false;
    }

    if (!email) {
      showError("Please enter your email address!");
      rfEmail.current.focus();
      return false;
    }

    if (!validateEmail(email)) {
      showError("Please enter a valid email address!");
      rfEmail.current.focus();
      return false;
    }

    if (!subject) {
      showError("Please enter a subject for your message!");
      rfSubject.current.focus();
      return false;
    }

    if (!content) {
      showError("Please enter your message!");
      rfContent.current.focus();
      return false;
    }

    if (content.length < 10) {
      showError("Message must be at least 10 characters long!");
      rfContent.current.focus();
      return false;
    }

    return true;
  };

  const postMessage = () => {
    if (!validateForm()) {
      return;
    }

    showLoading();

    let d = body;
    if (currentUser) {
      d.To = currentUser.Email;
      d.From = currentUser.Name;
    } else {
      d.To = rfEmail.current.value.trim();
      d.From = rfName.current.value.trim();
    }
    d.Subject = rfSubject.current.value.trim();
    d.Content = rfContent.current.value.trim();
    updateBody(d);

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
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        closeLoading();
        if (data.success) {
          showSuccess(
            "Your message has been sent successfully! We'll get back to you soon."
          );
          // Clear form
          rfName.current.value = "";
          rfEmail.current.value = "";
          rfSubject.current.value = "";
          rfContent.current.value = "";
        } else if (data.error) {
          showError(data.error);
        } else {
          showError("Oops! Something went wrong while sending your message!");
        }
      })
      .catch((err) => {
        closeLoading();
        showError(
          "Failed to send message. Please check your internet connection and try again."
        );
      });
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
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="Contact Us"
      />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${contactBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  fontWeight: 600,
                  mb: 3,
                  color: "primary.light",
                }}
              >
                Get in Touch
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: "600px",
                }}
              >
                Thank you for visiting our Geoportal. Need assistance or have
                questions? We're here to help! Send us a message and our
                customer service team will respond as soon as possible.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Welcome Message */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "fit-content",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                How can we help you?
              </Typography>

              {props?.isAuthenticated ? (
                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    "& .MuiAlert-icon": { color: "white" },
                  }}
                >
                  <Typography variant="body2">
                    Welcome {props?.currentUser?.Name}!
                  </Typography>
                </Alert>
              ) : (
                <Alert
                  severity="info"
                  sx={{
                    mb: 3,
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    "& .MuiAlert-icon": { color: "white" },
                  }}
                >
                  <Typography variant="body2">
                    You can send us a message even without an account. We look
                    forward to hearing from you!
                  </Typography>
                </Alert>
              )}

              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Our team is dedicated to providing you with the best support
                possible. Whether you have technical questions, need help
                navigating the platform, or want to provide feedback, we're here
                to assist you.
              </Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card elevation={3} sx={{ p: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Send us a Message
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      placeholder="Enter your full name"
                      inputRef={rfName}
                      required
                      InputProps={{
                        startAdornment: (
                          <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      placeholder="Enter your email"
                      type="email"
                      inputRef={rfEmail}
                      required
                      InputProps={{
                        startAdornment: (
                          <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Subject"
                      placeholder="Enter message subject"
                      inputRef={rfSubject}
                      required
                      InputProps={{
                        startAdornment: (
                          <SubjectIcon
                            sx={{ mr: 1, color: "text.secondary" }}
                          />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Message"
                      placeholder="Write your message here... (minimum 10 characters)"
                      multiline
                      rows={6}
                      inputRef={rfContent}
                      required
                      InputProps={{
                        startAdornment: (
                          <MessageIcon
                            sx={{
                              mr: 1,
                              color: "text.secondary",
                              alignSelf: "flex-start",
                              mt: 1,
                            }}
                          />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={postMessage}
                      startIcon={<SendIcon />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: "1.1rem",
                        textTransform: "none",
                        borderRadius: 2,
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
