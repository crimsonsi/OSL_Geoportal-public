import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Skeleton,
  Alert,
  Grid,
} from "@mui/material";
import {
  Map as MapIcon,
  Category as CategoryIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import { jwtDecode } from "jwt-decode";

export default function StoryMapPage(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const pathname = window.location.pathname.split("/")[3];

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
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/storymaps/${pathname}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("Failed to fetch story map");
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        console.error("Error fetching story map:", e);
        setError(true);
        setLoading(false);
      });
  }, [pathname]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        parent="Knowledge Hub"
      />

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              {loading ? (
                <>
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={80}
                    sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={40}
                    sx={{ bgcolor: "rgba(255,255,255,0.1)", mt: 2 }}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    <ArticleIcon sx={{ fontSize: "inherit" }} />
                    {data?.Title || "Story Map"}
                  </Typography>
                  {data?.Category && (
                    <Box sx={{ mb: 3 }}>
                      <Chip
                        icon={<CategoryIcon />}
                        label={`Theme: ${data.Category}`}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "white",
                          fontSize: "1rem",
                          height: 40,
                          "& .MuiChip-icon": {
                            color: "white",
                          },
                        }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <MapIcon sx={{ fontSize: 60 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Interactive Story Map
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Explore spatial narratives and data-driven stories
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            Failed to load story map. Please try again later.
          </Alert>
        ) : loading ? (
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Skeleton variant="text" width="100%" height={60} />
            <Skeleton variant="text" width="80%" height={40} sx={{ mt: 2 }} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ mt: 3 }}
            />
          </Paper>
        ) : data ? (
          <Paper
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  color: "primary.main",
                  fontWeight: 600,
                  mb: 2,
                },
                "& h1": {
                  fontSize: { xs: "2rem", md: "2.5rem" },
                },
                "& h2": {
                  fontSize: { xs: "1.5rem", md: "2rem" },
                },
                "& p": {
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  mb: 2,
                  color: "text.primary",
                },
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  mb: 3,
                },
                "& a": {
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
                "& ul, & ol": {
                  pl: 3,
                  mb: 2,
                },
                "& li": {
                  mb: 1,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                },
                "& blockquote": {
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                  pl: 3,
                  py: 1,
                  bgcolor: "grey.50",
                  fontStyle: "italic",
                  mb: 3,
                },
                "& code": {
                  bgcolor: "grey.100",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontFamily: "monospace",
                },
                "& pre": {
                  bgcolor: "grey.100",
                  p: 2,
                  borderRadius: 2,
                  overflow: "auto",
                  mb: 3,
                },
              }}
              dangerouslySetInnerHTML={{
                __html: data.Content?.slice(1, -1) || "",
              }}
            />
          </Paper>
        ) : null}
      </Container>

      <Footer />
    </Box>
  );
}
