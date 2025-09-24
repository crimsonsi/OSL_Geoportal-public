import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import {
  Code as CodeIcon,
  Http as HttpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Download as DownloadIcon,
  Map as MapIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

const ApiEndpoint = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  fontFamily: "monospace",
  margin: theme.spacing(1, 0),
}));

const ApiDocs = ({
  isAuthenticated,
  setIsAuthenticated,
  currentUser,
  setCurrentUser,
}) => {
  const theme = useTheme();

  const endpoints = [
    {
      method: "GET",
      path: "/api/datasets",
      description: "Retrieve list of all available datasets",
      example: "GET /api/datasets?category=agriculture&limit=10",
    },
    {
      method: "GET",
      path: "/api/datasets/{id}",
      description: "Get specific dataset by ID",
      example: "GET /api/datasets/123",
    },
    {
      method: "GET",
      path: "/api/datasets/{id}/download",
      description: "Download dataset in specified format",
      example: "GET /api/datasets/123/download?format=geojson",
    },
    {
      method: "GET",
      path: "/api/categories",
      description: "Get list of data categories",
      example: "GET /api/categories",
    },
    {
      method: "GET",
      path: "/api/search",
      description: "Search datasets by keywords",
      example: "GET /api/search?q=climate&category=weather",
    },
  ];

  const features = [
    {
      icon: <CodeIcon />,
      title: "RESTful API",
      description: "Clean, intuitive REST endpoints for easy integration",
    },
    {
      icon: <SecurityIcon />,
      title: "Secure Access",
      description: "API key authentication with rate limiting",
    },
    {
      icon: <SpeedIcon />,
      title: "High Performance",
      description: "Optimized for fast data retrieval and processing",
    },
    {
      icon: <DownloadIcon />,
      title: "Multiple Formats",
      description: "Support for JSON, GeoJSON, CSV, and Shapefile formats",
    },
    {
      icon: <MapIcon />,
      title: "Spatial Queries",
      description: "Advanced spatial filtering and geometric operations",
    },
    {
      icon: <HttpIcon />,
      title: "HTTP Standards",
      description: "Full HTTP status codes and proper error handling",
    },
  ];

  return (
    <Box>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        landing={false}
        parent="api-docs"
      />

      <Box
        sx={{
          py: 8,
          backgroundColor: theme.palette.grey[50],
          minHeight: "80vh",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              API Documentation
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Integrate with Oakar Services GeoPortal using our comprehensive
              REST API
            </Typography>
          </Box>

          {/* API Features */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card sx={{ height: "100%", textAlign: "center" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                      {React.cloneElement(feature.icon, {
                        sx: { fontSize: 40 },
                      })}
                    </Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Getting Started */}
          <StyledPaper elevation={2}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, color: theme.palette.primary.main }}
            >
              Getting Started
            </Typography>
            <Typography variant="body1" paragraph>
              Our API provides programmatic access to all datasets and features
              available in the GeoPortal. To get started, you'll need an API key
              which you can obtain by registering for an account.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Base URL
            </Typography>
            <ApiEndpoint>https://api.oakar-services.com/v1</ApiEndpoint>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Authentication
            </Typography>
            <Typography variant="body1" paragraph>
              Include your API key in the request header:
            </Typography>
            <ApiEndpoint>Authorization: Bearer YOUR_API_KEY</ApiEndpoint>
          </StyledPaper>

          {/* API Endpoints */}
          <StyledPaper elevation={2}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, color: theme.palette.primary.main }}
            >
              API Endpoints
            </Typography>

            {endpoints.map((endpoint, index) => (
              <Box
                key={index}
                sx={{
                  mb: 3,
                  p: 2,
                  border: 1,
                  borderColor: "grey.300",
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Chip
                    label={endpoint.method}
                    color={endpoint.method === "GET" ? "primary" : "secondary"}
                    size="small"
                    sx={{ mr: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                    {endpoint.path}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {endpoint.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "monospace",
                    backgroundColor: "grey.100",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {endpoint.example}
                </Typography>
              </Box>
            ))}
          </StyledPaper>

          {/* Response Format */}
          <StyledPaper elevation={2}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, color: theme.palette.primary.main }}
            >
              Response Format
            </Typography>
            <Typography variant="body1" paragraph>
              All API responses are returned in JSON format with the following
              structure:
            </Typography>
            <ApiEndpoint>
              {`{
  "success": true,
  "data": {
    // Response data here
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  },
  "message": "Request successful"
}`}
            </ApiEndpoint>
          </StyledPaper>

          {/* Rate Limiting */}
          <StyledPaper elevation={2}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, color: theme.palette.primary.main }}
            >
              Rate Limiting
            </Typography>
            <Typography variant="body1" paragraph>
              API requests are rate limited to ensure fair usage:
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Chip label="Free Tier: 100 requests/hour" color="primary" />
              <Chip label="Premium: 1000 requests/hour" color="secondary" />
              <Chip label="Enterprise: Unlimited" color="success" />
            </Box>
          </StyledPaper>

          {/* Call to Action */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => (window.location.href = "/contact")}
              sx={{ mr: 2, mb: 2 }}
            >
              Request API Key
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => (window.location.href = "/data")}
              sx={{ mb: 2 }}
            >
              Browse Datasets
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default ApiDocs;
