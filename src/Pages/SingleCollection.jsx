import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Skeleton,
  Alert,
  Tooltip,
  Pagination,
} from "@mui/material";
import {
  Search as SearchIcon,
  Map as MapIcon,
  Person as PersonIcon,
  DateRange as DateIcon,
  Group as CollectionIcon,
  Image as ImageIcon,
  BrokenImage as BrokenImageIcon,
  Category as CategoryIcon,
  DataObject as DataIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import { jwtDecode } from "jwt-decode";

const criteria = ["Title", "Description", "Owner", "Keywords"];

export default function SingleCollection(props) {
  const pathName = window.location.pathname.split("/")[2].replace("%20", " ");

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

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [crit, setCrit] = useState(criteria[0]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const [query, setQuery] = useState("");
  const srch = useRef();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    if (!query) {
      fetch(`/api/data/collection/${pathName}/${(currentPage - 1) * 12}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      search(query);
    }
  }, [currentPage, refresh]);

  function search(q) {
    setLoading(true);
    fetch(
      `/api/data/collection/${pathName}/search/${crit}/${q}/${
        (currentPage - 1) * 12
      }`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("");
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === "") {
      setData(null);
      setRefresh(!refresh);
    } else {
      search(value);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        parent="Browse Data"
      />

      {/* Enhanced Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          color: "white",
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
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
                <CollectionIcon sx={{ fontSize: "inherit" }} />
                Collection: {pathName.replaceAll("%20", " ")}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  opacity: 0.9,
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Browse and search through spatial data in this collection
              </Typography>

              {/* Collection Metadata */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <DataIcon sx={{ fontSize: 20, mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Total Items
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {data?.total || "Loading..."}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper
                    sx={{
                      p: 2,
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <CategoryIcon sx={{ fontSize: 20, mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Category
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {data?.data?.[0]?.Category || "N/A"}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <InfoIcon sx={{ fontSize: 20, mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Subcategory
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {data?.data?.[0]?.Subcategory || "N/A"}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <MapIcon sx={{ fontSize: 20, mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Data Type
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {data?.data?.[0]?.Type || "N/A"}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  color: "white",
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
                  <CollectionIcon sx={{ fontSize: 60 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Spatial Data Collection
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Comprehensive geospatial datasets for analysis and
                  visualization
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Search Controls */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Search Criteria</InputLabel>
                <Select
                  value={crit}
                  label="Search Criteria"
                  onChange={(e) => setCrit(e.target.value)}
                >
                  {criteria.map((criterion) => (
                    <MenuItem key={criterion} value={criterion}>
                      {criterion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                ref={srch}
                placeholder={`Search by ${crit.toLowerCase()}...`}
                value={query}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Results Section */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card sx={{ height: "100%" }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={32} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={60} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : data && data?.data?.length > 0 ? (
          <>
            <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
              Found {data.total} results
            </Typography>
            <Grid container spacing={3}>
              {data?.data?.map((item, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                  <MyDocument item={item} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Alert
            severity="info"
            sx={{
              textAlign: "center",
              py: 4,
              fontSize: "1.1rem",
            }}
          >
            <Typography variant="h6" gutterBottom>
              No Results Found
            </Typography>
            <Typography>
              There are no results for this criteria at the moment. To suggest
              or request data, please{" "}
              <Typography
                component="a"
                href="/contact"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                contact us here
              </Typography>
              .
            </Typography>
          </Alert>
        )}

        {/* Pagination */}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(data?.total / 12) || 1}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

const MyDocument = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Card
      sx={{
        height: "100%",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
        borderRadius: 2,
      }}
      onClick={() => {
        window.location.href = `/maps/${item.Category}/${item.ID}`;
      }}
    >
      <Box sx={{ position: "relative", height: 200 }}>
        {imageLoading && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ position: "absolute", top: 0, left: 0 }}
          />
        )}
        {imageError ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.100",
              color: "grey.500",
            }}
          >
            <BrokenImageIcon sx={{ fontSize: 48 }} />
          </Box>
        ) : (
          <CardMedia
            component="img"
            height="200"
            image={`/api/${item.Thumbnail}`}
            alt={item.Title}
            onError={handleImageError}
            onLoad={handleImageLoad}
            sx={{
              objectFit: "cover",
              display: imageLoading ? "none" : "block",
            }}
          />
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Tooltip title={item.Description} placement="top">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.Title}
          </Typography>
        </Tooltip>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <PersonIcon sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {item.Owner}
          </Typography>
        </Box>

        {item.Collection && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CollectionIcon
              sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {item.Collection}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <DateIcon sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {new Date(item.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.4,
          }}
        >
          {item.Description}
        </Typography>
      </CardContent>
    </Card>
  );
};
