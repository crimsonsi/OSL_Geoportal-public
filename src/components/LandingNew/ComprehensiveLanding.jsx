import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Public as PublicIcon,
  Download as DownloadIcon,
  Map as MapIcon,
  Search as SearchIcon,
  BarChart as BarChartIcon,
  Code as CodeIcon,
  LibraryBooks as LibraryIcon,
  Timeline as TimelineIcon,
  PhoneAndroid as MobileIcon,
  Feedback as FeedbackIcon,
  TrendingUp as TrendingIcon,
  DataObject as DataIcon,
  Share as ShareIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledHeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
  color: "white",
  borderRadius: theme.spacing(2),
}));

const CTAButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: theme.spacing(3),
  textTransform: "none",
}));

const features = [
  {
    icon: <PublicIcon fontSize="large" />,
    title: "Public Data Access",
    description:
      "Free access to approved datasets and maps for researchers, developers, and citizens",
    color: "#2196F3",
  },
  {
    icon: <DownloadIcon fontSize="large" />,
    title: "Multiple Download Formats",
    description:
      "Download data in open formats including CSV, GeoJSON, and Shapefile",
    color: "#4CAF50",
  },
  {
    icon: <MapIcon fontSize="large" />,
    title: "Interactive Maps",
    description:
      "Visualize spatial data with interactive map-based tools and analysis",
    color: "#FF9800",
  },
  {
    icon: <SearchIcon fontSize="large" />,
    title: "Advanced Search & Filter",
    description:
      "Powerful search and filter tools to find datasets and indicators quickly",
    color: "#9C27B0",
  },
  {
    icon: <BarChartIcon fontSize="large" />,
    title: "County Statistics",
    description:
      "Display county-level statistics and comparative insights for informed decisions",
    color: "#F44336",
  },
  {
    icon: <CodeIcon fontSize="large" />,
    title: "API Access",
    description:
      "RESTful API access for developers and third-party applications",
    color: "#607D8B",
  },
  {
    icon: <LibraryIcon fontSize="large" />,
    title: "Data Catalog",
    description:
      "Comprehensive data catalog with metadata and detailed documentation",
    color: "#795548",
  },
  {
    icon: <TimelineIcon fontSize="large" />,
    title: "Trend Analysis",
    description:
      "Visualization dashboards for trend analysis and data insights",
    color: "#3F51B5",
  },
  {
    icon: <MobileIcon fontSize="large" />,
    title: "Mobile Friendly",
    description: "Responsive design optimized for mobile and web platforms",
    color: "#00BCD4",
  },
  {
    icon: <FeedbackIcon fontSize="large" />,
    title: "Feedback System",
    description:
      "Submit feedback and data requests to help improve our services",
    color: "#E91E63",
  },
];

const stats = [
  { label: "Datasets Available", value: "500+", icon: <DataIcon /> },
  { label: "Monthly Downloads", value: "10K+", icon: <DownloadIcon /> },
  { label: "API Requests", value: "1M+", icon: <CodeIcon /> },
  { label: "Active Users", value: "5K+", icon: <PublicIcon /> },
];

const sampleFaqs = [
  {
    Question: "What is Oakar Services GeoPortal?",
    Answer:
      "Oakar Services GeoPortal is a comprehensive platform that provides access to geospatial data, interactive maps, and analytical tools. It serves as a gateway for researchers, developers, and citizens to discover, visualize, and download various datasets in multiple formats.",
  },
  {
    Question: "How can I access and download data?",
    Answer:
      "You can browse our data catalog, use advanced search filters to find specific datasets, and download data in various formats including CSV, GeoJSON, and Shapefile. Most datasets are freely available, while some may require registration or approval.",
  },
  {
    Question: "Is there an API available for developers?",
    Answer:
      "Yes, we provide a comprehensive RESTful API that allows developers to integrate our data and services into their applications. The API supports various endpoints for data access, search functionality, and metadata retrieval.",
  },
  {
    Question: "What types of data are available on the platform?",
    Answer:
      "Our platform hosts diverse datasets across multiple domains including Agriculture, Climate & Weather, Natural Resources, Spatial Planning, Disaster Management, Demographics, and Infrastructure data.",
  },
];

const ComprehensiveLanding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      {/* Hero Section */}
      <StyledHeroSection>
        <Container maxWidth="xl">
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Oakar Services
                  <br />
                  <Typography
                    component="span"
                    variant="h2"
                    sx={{
                      color: theme.palette.secondary.light,
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                    }}
                  >
                    GeoPortal
                  </Typography>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    opacity: 0.9,
                    fontWeight: 400,
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                  }}
                >
                  Your Gateway to Open Data and Spatial Intelligence
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    opacity: 0.8,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.6,
                  }}
                >
                  Access comprehensive datasets, interactive maps, and powerful
                  analytics tools. Discover insights, download data in multiple
                  formats, and build applications with our robust API
                  infrastructure.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <CTAButton
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => (window.location.href = "/data")}
                    sx={{
                      background: "white",
                      color: theme.palette.primary.main,
                      "&:hover": {
                        background: theme.palette.grey[100],
                      },
                    }}
                  >
                    Explore Data
                  </CTAButton>
                  <CTAButton
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: theme.palette.secondary.light,
                        background: theme.palette.secondary.light,
                      },
                    }}
                    onClick={() => (window.location.href = "/about")}
                  >
                    Learn More
                  </CTAButton>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      width: { xs: 200, md: 300 },
                      height: { xs: 200, md: 300 },
                      mx: "auto",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <MapIcon
                      sx={{ fontSize: { xs: 100, md: 150 }, opacity: 0.8 }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </StyledHeroSection>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: theme.palette.grey[50] }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              Key Features
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Comprehensive tools and services for data discovery, analysis, and
              application development
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <FeatureCard>
                  <CardContent
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <FeatureIcon sx={{ background: feature.color }}>
                      {feature.icon}
                    </FeatureIcon>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, flexGrow: 1 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ py: 8, backgroundColor: theme.palette.primary.main }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700, color: "white" }}
            >
              Platform Statistics
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 600, mx: "auto" }}
            >
              Growing community and expanding data ecosystem
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <StatsCard>
                  <Box sx={{ mb: 2 }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 40 } })}
                  </Box>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Data Categories Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              Data Categories
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Explore diverse datasets across multiple domains
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {[
              "Agriculture",
              "Climate & Weather",
              "Natural Resources",
              "Spatial Planning",
              "Disaster Management",
              "General Data",
              "Demographics",
              "Infrastructure",
            ].map((category, index) => (
              <Chip
                label={category}
                variant="outlined"
                size="large"
                onClick={() =>
                  (window.location.href = `/categories/${category}`)
                }
                sx={{
                  px: 2,
                  py: 1,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* FAQs Section */}
      <Box sx={{ py: 8, backgroundColor: theme.palette.grey[50] }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Find answers to common questions about our geoportal platform
            </Typography>
          </Box>
          <Box sx={{ maxWidth: "900px", mx: "auto", mb: 4 }}>
            {sampleFaqs.map((faq, index) => (
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
                    {faq.Question}
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
                    {faq.Answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <CTAButton
              variant="contained"
              size="large"
              onClick={() => (window.location.href = "/faqs")}
              sx={{
                background: theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  background: theme.palette.primary.dark,
                },
              }}
            >
              View All FAQs
            </CTAButton>
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: 8, backgroundColor: "white" }}>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: "center",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of users who trust Oakar Services GeoPortal for
              their data needs
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <CTAButton
                variant="contained"
                size="large"
                sx={{
                  background: "white",
                  color: theme.palette.primary.main,
                  "&:hover": {
                    background: theme.palette.grey[100],
                  },
                }}
                onClick={() => (window.location.href = "/data")}
              >
                Browse Datasets
              </CTAButton>
              <CTAButton
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    borderColor: theme.palette.secondary.light,
                    background: theme.palette.secondary.light,
                  },
                }}
                onClick={() => (window.location.href = "/contact")}
              >
                Request Data
              </CTAButton>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ComprehensiveLanding;
