import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Explore as ExploreIcon,
  Analytics as AnalyticsIcon,
  Assessment as ReportIcon,
  Download as DownloadIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import about1Background from "../assets/imgs/about_1_background.jpg";
import about2Background from "../assets/imgs/about_2_background.jpg";
import FeedBackForm from "../components/Utils/FeedBackForm";

export default function AboutPage(props) {
  const [showFeedBackForm, setShowFeedBackForm] = useState(false);

  const features = [
    {
      title: "Disseminating Spatial Data",
      description:
        "The Geoportal platform enables the agency share spatial data and maps in diverse formats such as PDF, Shapefiles, KML, GeoJSON, and Web Services.",
      icon: <ExploreIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
    {
      title: "Data Analysis",
      description:
        "The platform provides several data analysis capabilities. Users can build simple to complex queries for the analysis of data attributes. The portal's search function allows query for specific data. Access to the Open Data Cube enables users analyse the Earth observation data.",
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
    {
      title: "Report Generation",
      description:
        "After perfoming their data analysis, users are able to generate a report of their interaction with the data automatically. The portal allows export generation of PFD reports from its available templates which users can edit and export.",
      icon: <ReportIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
    {
      title: "Download Data",
      description:
        "Users are able to download spatial data in different data formats. Data available to users ranges from thematic data, topographical maps, cadastral maps to aerial images and web services.",
      icon: <DownloadIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
  ];

  const specialFeatures = [
    "It allows users access data for different thematic layers and base maps(high-resolution satellite images, topographical and hybrid maps) which are disseminated by The Geoportal.",
    "It allow users perform spatial analysis of thematic data layers such as buffer analysis and proximit analysis.",
    "It allows users build custom queries on thematic data.",
    "It allows users report and update events such as forest fires, floods, landslides, and natural calamities along with photograph storage.",
    "It allows users access cadastral maps that have been availed by the Oakar Services.",
    "It allows users access and prepare a digital atlas for administrators, planners, or resource managers.",
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="About"
      />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${about2Background})`,
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
                About
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  fontWeight: 600,
                  mb: 3,
                  cursor: "pointer",
                  "&:hover": { color: "primary.light" },
                }}
                onClick={() => setShowFeedBackForm(true)}
              >
                The Geoportal
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
                The Geoportal is our one stop platform that allows you to
                access, visualize and analyze our collections of data. The
                portal helps our users save time by availing useful, relevant
                and easy to understand sets of data. It also provides spatial
                data analysis and visualization (also known as GIS)
                capabilities.
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
                By availing data remotely through this portal, we have
                facilitated institutions and individuals to save time and
                operational costs taken to access and set up data locally as
                would be the case in an analogue setup.
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="/data"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Explore Data
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={8}
              sx={{
                height: 400,
                backgroundImage: `url(${about1Background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 3,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 3,
                color: "primary.main",
              }}
            >
              The Geoportal
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "text.secondary",
              }}
            >
              The Geoportal is mandated to promote, coordinate and regulate
              space related activities in the country. This will be achieved
              through promotion of research and innovations in space science,
              technology and respective applications as well as enhancing the
              regulatory framework. It will also spur Kenya's competitiveness
              and positioning in playing a critical role in the regional and
              global space agenda.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              mb: 6,
              color: "primary.main",
            }}
          >
            Geoportal Purpose and Functionality
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  elevation={4}
                  sx={{
                    height: "100%",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: "primary.main",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Detailed Information Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Card elevation={4} sx={{ p: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 4,
              color: "primary.main",
            }}
          >
            Oakar Services Geoplatform
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              mb: 3,
              color: "text.secondary",
            }}
          >
            The Geoportal is a platform created for the purpose of sharing
            spatial data with the public. The public who are the major
            stakeholders targeted by the portal consists of companies and
            organizations dealing with spatial data in their business
            operations, individual people who are key decision makers in their
            capacities and need spatial information to influence their
            decisions, researchers in the academia field and proffessionals
            needing spatial data for their projects and researches.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              mb: 3,
              color: "text.secondary",
            }}
          >
            The Geoportal is an easy to use application. Public users register
            on the portal by creating an account. The account consists of an
            email address and password which a user uses to sign-in into the
            portal. On successful login, a user is able to access
            functionalities of the Geo-platform, beginning with a list of
            published instances organized categorically.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              mb: 3,
              color: "text.secondary",
            }}
          >
            The Geoportal consists of a data page showing all data in the public
            portal published by the administrator via the admin portal. Users
            can categorize the data and also search based on the titles and
            keywords in the data.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              mb: 3,
              color: "text.secondary",
            }}
          >
            Users can view single instances of the published data on the
            platfrom.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              mb: 4,
              color: "text.secondary",
            }}
          >
            The portal consists of a contact us page which provides an
            interactive feedback mechanism that provides the functionality for
            the user to communicate with the system administrator.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              fontWeight: 600,
              mb: 3,
              color: "primary.main",
            }}
          >
            The Geoportal has got several special functionalities for its users.
          </Typography>

          <List>
            {specialFeatures.map((feature, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <CheckIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={feature}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: "text.secondary",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </Container>

      {showFeedBackForm && (
        <FeedBackForm setShowFeedBackForm={setShowFeedBackForm} />
      )}

      <Footer />
    </Box>
  );
}
