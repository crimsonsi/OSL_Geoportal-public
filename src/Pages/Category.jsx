import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import MapCategory from "../components/maps/MapCategory";

export default function Category(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const instanceId = window.location.pathname
    .split("/")[2]
    .replaceAll("%20", " ");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/data/category/${instanceId}/0`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("Failed to fetch category data");
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        console.error("Error fetching category data:", e);
        setError(true);
        setLoading(false);
      });
  }, [instanceId]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent={instanceId}
      />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ mb: 4, fontWeight: 600 }}
        >
          {instanceId}
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            Failed to load category data. Please try again later.
          </Alert>
        ) : (
          <Paper elevation={1} sx={{ p: 0, overflow: 'hidden' }}>
            <MapCategory category={instanceId} data={data} />
          </Paper>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
