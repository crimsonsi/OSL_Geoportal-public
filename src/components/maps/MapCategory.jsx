import { useEffect, useState, useRef } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Pagination from "../Utils/pagination"; // Assuming Pagination is already implemented
import { makeStyles } from "@mui/styles";

const criteria = ["Title", "Description", "Owner", "Keywords"];

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  sidebar: {
    width: 200,
    backgroundColor: "#f4f4f4",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #ddd",
  },
  mainContent: {
    flex: 1,
    padding: "1rem",
  },
  category: {
    padding: "0.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
    borderRadius: "4px",
    marginBottom: "0.5rem",
  },
  activeCategory: {
    backgroundColor: "#d0d0d0",
  },
  top: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  searchInput: {
    marginRight: "1rem",
  },
  document: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "1rem",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  thumbnail: {
    width: 100,
    height: 100,
    objectFit: "cover",
    marginRight: "1rem",
  },
  description: {
    flex: 1,
  },
});

export default function MapCategory(props) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [crit, setCrit] = useState(criteria[0]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const srch = useRef();
  const classes = useStyles();

  const handlePageChange = (pageNumber) => {
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
    <Box className={classes.container}>
      <Box className={classes.sidebar}>
        <Category
          txt="All"
          filter={filter}
          setFilter={setFilter}
          setCurrentPage={setCurrentPage}
          classes={classes}
        />
        <Category
          txt="Raster"
          filter={filter}
          setFilter={setFilter}
          setCurrentPage={setCurrentPage}
          classes={classes}
        />
        <Category
          txt="Vector"
          filter={filter}
          setFilter={setFilter}
          setCurrentPage={setCurrentPage}
          classes={classes}
        />
      </Box>
      <Box className={classes.mainContent}>
        <Box className={classes.top}>
          <Typography variant="h6">Search Criteria</Typography>
          <TextField
            select
            label="Criteria"
            value={crit}
            onChange={(e) => setCrit(e.target.value)}
            variant="outlined"
            size="small"
            className={classes.searchInput}
          >
            {criteria.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              search(srch.current.value);
            }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              ref={srch}
              type="text"
              placeholder={"Searching by " + crit}
              variant="outlined"
              size="small"
              required
              onChange={(e) => {
                if (e.target.value === "") {
                  setData(null);
                  setRefresh(!refresh);
                } else {
                  search(e.target.value);
                }
              }}
            />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </form>
        </Box>
        <Box>
          {data?.data?.length > 0 ? (
            data.data.map((item, i) => (
              <MyDocument key={i} item={item} classes={classes} />
            ))
          ) : (
            <Typography variant="body2">No documents found.</Typography>
          )}
        </Box>
        {data && (
          <Pagination
            totalItems={data.total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
      {loading && <CircularProgress />}
    </Box>
  );
}

const Category = ({ txt, filter, setFilter, setCurrentPage, classes }) => {
  return (
    <Box
      onClick={() => {
        setFilter(txt);
        setCurrentPage(1);
      }}
      className={`${classes.category} ${
        txt === filter ? classes.activeCategory : ""
      }`}
    >
      <Typography variant="body2">{txt}</Typography>
    </Box>
  );
};

const MyDocument = ({ item, classes }) => {
  return (
    <Box
      title={"Map Description" + "\n\n" + item.Description}
      className={classes.document}
      onClick={() => {
        window.location.href = `/maps/${item.Category}/${item.ID}`;
      }}
    >
      <img
        src={`/api/${item.Thumbnail}`}
        alt=""
        className={classes.thumbnail}
      />
      <Box className={classes.description}>
        <Typography variant="h6">{item.Title}</Typography>
        <Typography variant="body2">Owner: {item.Owner}</Typography>
        <Typography variant="body2">
          Date Published: {item.updatedAt.split("T")[0]}
        </Typography>
        <Typography variant="body2">{item.Description}</Typography>
      </Box>
    </Box>
  );
};
