import { useEffect, useState, useRef } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Container,
  Pagination,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const criteria = ["Title", "Description", "Owner", "Keywords"];

export default function MapCategory(props) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [crit, setCrit] = useState(criteria[0]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const srch = useRef();

  const categories = ["All", "Raster", "Vector"];

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          filter === "All"
            ? `/api/data/category/${props.category}/${(currentPage - 1) * 12}`
            : `/api/data/tpaginated/${props.category}/${filter}/${
                (currentPage - 1) * 12
              }`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, refresh, filter]);

  const search = async (q) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/data/search/${crit}/${q}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
                      } else {
                        search(e.target.value);
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

            {/* Content */}
            {!loading && (
              <>
                {data?.data?.length > 0 ? (
                  <Grid container spacing={3}>
                    {data.data.map((item, i) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                        <MyDocument item={item} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                      No maps found
                    </Typography>
                  </Paper>
                )}

                {/* Pagination */}
                {data && data.total > 12 && (
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={Math.ceil(data.total / 12)}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const MyDocument = ({ item }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={() => {
        window.location.href = `/maps/${item.Category}/${item.ID}`;
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`/api/${item.Thumbnail}`}
        alt={item.Title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {item.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Owner: {item.Owner}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Date Published: {item.updatedAt.split("T")[0]}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.Description}
        </Typography>
      </CardContent>
    </Card>
  );
};
