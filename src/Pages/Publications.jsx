import { React, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import {
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import "../Styles/Publications.scss";
import placeholder from "../assets/imgs/placeholder.png";
import { pdfjs } from "react-pdf";

export default function PublicationsPage(props) {
  const [publications, setPublications] = useState();
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(true);
  const [loading, setLoading] = useState(null);
  const [filter, setFilter] = useState("Publications");
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const srch = useRef();
  
  const categories = [
    "Publications",
    "Story Maps",
    "Reports",
    "Learning Materials",
    "Other"
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setShowing(false);
    } else {
      setShowing(true);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  const [arrow, setArrow] = useState("fa fa-angle-up");

  const toggle = () => {
    setShow(!show);
    if (show) {
      setArrow("fa fa-angle-down");
    } else setArrow("fa fa-angle-up");
  };

  useEffect(() => {
    setPublications(null);
    if (filter == "Story Maps") {
      setLoading(true);
      fetch(`/api/storymaps/paginated/${(currentPage - 1) * 12}`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          setPublications(data);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(`/api/publications/type/${filter}/${(currentPage - 1) * 12}`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          setPublications(data);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  }, [currentPage, refresh, filter]);

  function search(q) {
    setPublications(null);
    setLoading(true);
    fetch(`/api/publications/search/${q}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("");
      })
      .then((data) => {
        setLoading(false);
        setPublications(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      search(searchValue);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setPublications(null);
      setRefresh(!refresh);
    }
  };

  const handleTabChange = (event, newValue) => {
    setFilter(categories[newValue]);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="Knowledge Hub"
      />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Knowledge Hub
        </Typography>

        <Grid container spacing={3}>
          {/* Search and Filters */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search publications..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSearch} edge="end">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Tabs
                value={categories.indexOf(filter)}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                  },
                }}
              >
                {categories.map((category, index) => (
                  <Tab key={index} label={category} />
                ))}
              </Tabs>
            </Paper>
          </Grid>

          {/* Content */}
          <Grid size={{ xs: 12 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress size={60} />
              </Box>
            ) : (
              <>
                {publications && publications?.result?.length > 0 ? (
                  <Grid container spacing={3}>
                    {filter === "Story Maps"
                      ? publications?.result?.map((item, i) => (
                          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                            <StoryMap item={item} />
                          </Grid>
                        ))
                      : publications?.result?.map((item, i) => (
                          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                            <MyDocument item={item} />
                          </Grid>
                        ))}
                  </Grid>
                ) : (
                  <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                      No publications found
                    </Typography>
                  </Paper>
                )}

                {publications  && (
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={Math.ceil(publications.total / 10)}
                      page={currentPage}
                      onChange={(event, page) => handlePageChange(page)}
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
      <Footer />
    </Box>
  );
}

const MyDocument = (props) => {
  const [blob, setBlob] = useState(null);
  const [firstPageBlob, setFirstPageBlob] = useState(null);

  useEffect(() => {
    if (blob) {
      const fetchPdfFirstPage = async () => {
        try {
          const pdf = await pdfjs.getDocument(blob).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement("canvas");
          const canvasContext = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext, viewport }).promise;
          setFirstPageBlob(canvas.toDataURL());
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      };

      fetchPdfFirstPage();
    }
  }, [blob]);

  useEffect(() => {
    fetch(`/api/uploads/${props.item.File}`)
      .then((res) => {
        if (res.ok) return res.blob();
        else throw Error("");
      })
      .then((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          setBlob(url);
          return () => {
            window.URL.revokeObjectURL(url);
          };
        }
      })
      .catch((e) => {});
  }, []);

  return (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardMedia
        sx={{ 
          height: 200, 
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {firstPageBlob ? (
          <img 
            src={firstPageBlob} 
            alt={props.item.Title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
        ) : (
          <img 
            src={placeholder} 
            alt="Placeholder"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
        )}
      </CardMedia>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {props.item.Title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {props.item.Description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={props.item.Type} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        {blob && (
          <Button
            variant="contained"
            startIcon={<ViewIcon />}
            endIcon={<PdfIcon />}
            href={blob}
            target="_blank"
            fullWidth
            sx={{ mt: 'auto' }}
          >
            View/Download
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const StoryMap = (props) => {
  return (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
      onClick={() => {
        // window.location.href = "/portal/knowledgehub/preview/" + props.item.StoryMapID
      }}
    >
      <CardMedia
        sx={{ 
          height: 200, 
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {props.item?.Images?.length > 0 ? (
          <img 
            src={"/api/uploads/" + props.item.Images[0]} 
            alt={props.item.Title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
        ) : (
          <img 
            src={placeholder} 
            alt="Placeholder"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
        )}
      </CardMedia>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {props.item.Title}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={props.item.Category} 
            size="small" 
            color="secondary" 
            variant="outlined"
          />
        </Box>
        
        <Button
          variant="outlined"
          href={`/knowledgehub/storymap/${props.item.StoryMapID}`}
          fullWidth
          sx={{ mt: 'auto' }}
        >
          View Story Map
        </Button>
      </CardContent>
    </Card>
  );
};
