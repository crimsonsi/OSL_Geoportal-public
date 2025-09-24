import { React, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import { useRef } from "react";
import placeholder from "../assets/imgs/folder1.png";

const criteria = ["Title", "Collection", "Description", "Owner", "Keywords"];

export default function DataPage(props) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [crit, setCrit] = useState(criteria[0]);
  const [loading, setLoading] = useState(null);
  const [filter, setFilter] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const [query, setQuery] = useState(null);
  const srch = useRef();

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!query || query == "") {
      if (filter == "All") {
        setLoading(true);
        fetch(`/api/data/status/${(currentPage - 1) * 12}`)
          .then((res) => {
            if (res.ok) return res.json();
            else throw Error("");
          })
          .then((data) => {
            setLoading(false);
            setData(data);
          })
          .catch((e) => {
            setLoading(false);
          });
      } else {
        setLoading(true);
        fetch(`/api/data/apaginated/status/${filter}/${(currentPage - 1) * 12}`)
          .then((res) => {
            if (res.ok) return res.json();
            else throw Error("");
          })
          .then((data) => {
            setLoading(false);
            setData(data);
          })
          .catch((e) => {
            setLoading(false);
          });
      }
    } else {
      search(query);
    }
  }, [currentPage, refresh, filter, query]);

  function search(q) {
    if (filter == "All") {
      setLoading(true);
      fetch(`/api/data/status/search/${crit}/${q}/${(currentPage - 1) * 12}`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          setData(data);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(
        `/api/data/category/${filter}/status/search/${crit}/${q}/${
          (currentPage - 1) * 12
        }`
      )
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          setData(data);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  }

  const categories = [
    "All",
    "Agriculture",
    "Climate and Weather",
    "Natural Resources",
    "Spatial Planning",
    "Disaster",
    "General Data",
    "Time Series",
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="Browse Data"
      />

      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper elevation={2} sx={{ p: 2, position: "sticky", top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List dense>
                {categories.map((category) => (
                  <ListItem key={category} disablePadding>
                    <ListItemButton
                      selected={filter === category}
                      onClick={() => {
                        setFilter(category);
                        setCurrentPage(1);
                      }}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&.Mui-selected": {
                          backgroundColor: "primary.light",
                          color: "primary.contrastText",
                          "&:hover": {
                            backgroundColor: "primary.main",
                          },
                        },
                      }}
                    >
                      <ListItemText primary={category} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid size={{ xs: 12, md: 9 }} sx={{ minHeight: "60vh" }}>
            {/* Search Controls */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FormControl fullWidth size="small">
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
                <Grid size={{ xs: 12, sm: 8 }}>
                  <TextField
                    ref={srch}
                    fullWidth
                    size="small"
                    placeholder={`Search by ${crit}`}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setData(null);
                        setRefresh(!refresh);
                        setQuery(e.target.value);
                      } else {
                        setQuery(e.target.value);
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Loading State */}
            {loading && (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress size={60} />
              </Box>
            )}

            {/* Results */}
            {!loading && (
              <>
                {data && data?.data?.length > 0 ? (
                  <>
                    <Grid container spacing={3}>
                      {data?.data?.map((item, i) => (
                        <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                          <MyDocument item={item} />
                        </Grid>
                      ))}
                    </Grid>

                    {/* Pagination */}
                    <Box display="flex" justifyContent="center" mt={4}>
                      <Pagination
                        count={Math.ceil(data.total / 12)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                      />
                    </Box>
                  </>
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography>
                      Oops! There is no result for this criteria at the moment.
                      To suggest or request data, please{" "}
                      <a href="/contact" style={{ color: "inherit" }}>
                        contact us here
                      </a>
                      .
                    </Typography>
                  </Alert>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

const MyDocument = ({ item }) => {
  const isCollection = !!item.Collection;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
      onClick={() => {
        if (isCollection) {
          window.location.href = `/collections/${item.Collection}`;
        } else {
          window.location.href = `/maps/${item.Category}/${item.ID}`;
        }
      }}
    >
      <Box sx={{ position: "relative" }}>
        {isCollection && (
          <Chip
            label="Data Group"
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          />
        )}
        <CardMedia
          component="img"
          height="200"
          image={isCollection ? placeholder : `/api/${item.Thumbnail}`}
          alt={item.Title}
          sx={{ objectFit: "cover" }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {isCollection ? `Collection: ${item.Collection}` : item.Title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Owner:</strong> {item.Owner}
        </Typography>

        {isCollection && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Collection:</strong> {item.Collection}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Date Published:</strong> {item.updatedAt.split("T")[0]}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mt: 1,
          }}
        >
          {item.Description}
        </Typography>
      </CardContent>
    </Card>
  );
};
