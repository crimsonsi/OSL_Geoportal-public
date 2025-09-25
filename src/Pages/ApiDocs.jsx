import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
} from "@mui/material";
import {
  Code as CodeIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Map as MapIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon,
} from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import { jwtDecode } from "jwt-decode";
import apiBackground from "../assets/imgs/about_1_background.jpg";

export default function ApiDocs(props) {
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

  const features = [
    {
      title: "Standard GET Endpoints",
      description:
        "Access basic dataset information and metadata through our standard GET endpoints with built-in pagination and rate limiting.",
      icon: <CodeIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
    {
      title: "WFS & WMS Services",
      description:
        "For logged-in users, we provide Web Feature Service (WFS) and Web Map Service (WMS) links for direct data access and visualization.",
      icon: <MapIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
    {
      title: "Usage Tracking",
      description:
        "All API usage is monitored and tracked to ensure fair access and maintain service quality for all users.",
      icon: <SecurityIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
    {
      title: "Rate Limited Access",
      description:
        "Our API implements rate limiting to ensure stable performance and equitable access to resources for all users.",
      icon: <SpeedIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
  ];

  const standardEndpoints = [
    "GET /api/datasets - Retrieve paginated list of available datasets",
    "GET /api/datasets/{id} - Get specific dataset information",
    "GET /api/categories - List all data categories",
    "GET /api/search - Search datasets with pagination",
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="API Documentation"
      />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${apiBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                API Documentation
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Programmatic Access to GeoPortal Data
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: "700px",
                }}
              >
                Our API provides controlled access to the GeoPortal's extensive
                collection of spatial data. We offer standard GET endpoints with
                pagination and rate limiting, as well as WFS/WMS services for
                authenticated users.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Important Notice */}
        <Alert
          severity="info"
          icon={<InfoIcon />}
          sx={{ mb: 4, fontSize: "1rem" }}
        >
          <Typography variant="h6" gutterBottom>
            Custom API Endpoints
          </Typography>
          For custom API endpoints beyond our standard offerings, please submit
          an application to the administrator. Custom endpoints are evaluated
          based on use case, data requirements, and system capacity.
        </Alert>

        {/* API Features */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          API Features & Capabilities
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
              <Card sx={{ height: "100%", p: 2 }}>
                <CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                  >
                    <Box sx={{ mr: 2, mt: 0.5 }}>{feature.icon}</Box>
                    <Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Standard Endpoints */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Standard API Endpoints
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Our standard API provides basic access to dataset information with
            built-in pagination and rate limiting. These endpoints are available
            to all users without special authorization.
          </Typography>

          <List>
            {standardEndpoints.map((endpoint, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "monospace", fontSize: "0.95rem" }}
                    >
                      {endpoint}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* WFS/WMS Services */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            WFS & WMS Services
          </Typography>
          <Typography variant="body1" paragraph>
            For authenticated users, we provide Web Feature Service (WFS) and
            Web Map Service (WMS) endpoints that allow direct access to spatial
            data and map visualization capabilities.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Web Feature Service (WFS)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access vector data directly for analysis and processing.
                Supports GetFeature, DescribeFeatureType, and GetCapabilities
                operations.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Web Map Service (WMS)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Retrieve map images for visualization. Supports GetMap,
                GetCapabilities, and GetFeatureInfo operations.
              </Typography>
            </Grid>
          </Grid>

          <Alert severity="warning" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Authentication Required:</strong> WFS and WMS services
              require user authentication. Please log in to access these
              services.
            </Typography>
          </Alert>
        </Paper>

        {/* Usage & Rate Limiting */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Usage Tracking & Rate Limiting
          </Typography>
          <Typography variant="body1" paragraph>
            To ensure fair access and maintain service quality, all API usage is
            monitored and controlled through our tracking system.
          </Typography>

          <List>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="All API requests are logged and monitored" />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Rate limiting prevents system overload" />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Usage statistics help improve service quality" />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Fair access policies ensure availability for all users" />
            </ListItem>
          </List>
        </Paper>

        {/* Getting Started */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Getting Started
          </Typography>
          <Typography variant="body1" paragraph>
            To begin using our API services:
          </Typography>

          <List>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon>
                <Typography variant="h6" color="primary.main">
                  1.
                </Typography>
              </ListItemIcon>
              <ListItemText primary="Create an account or log in to access authenticated services" />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon>
                <Typography variant="h6" color="primary.main">
                  2.
                </Typography>
              </ListItemIcon>
              <ListItemText primary="Use standard GET endpoints for basic data access" />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon>
                <Typography variant="h6" color="primary.main">
                  3.
                </Typography>
              </ListItemIcon>
              <ListItemText primary="Access WFS/WMS services when logged in" />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemIcon>
                <Typography variant="h6" color="primary.main">
                  4.
                </Typography>
              </ListItemIcon>
              <ListItemText primary="Contact administrator for custom endpoint requirements" />
            </ListItem>
          </List>
        </Paper>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Need Custom API Access?
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            If you require custom API endpoints or have specific data access
            needs beyond our standard offerings, please contact our
            administrator team.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ContactIcon />}
            onClick={() => (window.location.href = "/contact")}
            sx={{ mr: 2, mb: 2 }}
          >
            Contact Administrator
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => (window.location.href = "/data")}
            sx={{ mb: 2 }}
          >
            Browse Available Data
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
