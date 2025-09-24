import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";

export default function FAQs(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/faqs`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("Something went wrong!!!");
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load FAQs");
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            textAlign: "center",
            bgcolor: "primary.main",
            color: "white"
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Find answers to common questions about our geoportal platform
          </Typography>
        </Paper>

        {loading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={60} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {data && data.length > 0 && (
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            {data.map((item, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  "&:before": {
                    display: "none",
                  },
                  boxShadow: 1,
                  borderRadius: 1,
                  "&.Mui-expanded": {
                    margin: "0 0 16px 0",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    bgcolor: "grey.50",
                    "&.Mui-expanded": {
                      bgcolor: "primary.light",
                      color: "white",
                    },
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                      color: "white",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "1rem", md: "1.1rem" },
                    }}
                  >
                    {item.Question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    p: 3,
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.7,
                      color: "text.secondary",
                    }}
                  >
                    {item.Answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {data && data.length === 0 && (
          <Alert severity="info" sx={{ textAlign: "center" }}>
            <Typography>
              No FAQs available at the moment. Please check back later or{" "}
              <a href="/contact" style={{ color: "inherit" }}>
                contact us
              </a>{" "}
              if you have any questions.
            </Typography>
          </Alert>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
