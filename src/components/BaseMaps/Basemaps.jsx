import XYZ from "ol/source/XYZ";
import { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import osmPic from "../../assets/imgs/osm.png";
import sat from "../../assets/imgs/satellite.png";
import streetmap from "../../assets/imgs/street.png";
import topomap from "../../assets/imgs/topo.jpg";
import stadia from "../../assets/imgs/stadia.jpg";
import myData from "../../assets/data/data";

export default function Basemaps(props) {
  // const images = [osmPic, topomap, stadia, streetmap, sat];
  const images = [osmPic, streetmap, topomap];
  
  const Basemap = (params) => {
    useEffect(() => {
      if (params.selected === params.index) {
        params.layer.setSource(
          new XYZ({
            url: params.url,
            crossOrigin: "anonymous",
          })
        );
      }
    }, [params.selected]);

    return (
      <Card
        onClick={() => {
          params.setSelected(params.index);
        }}
        sx={{
          cursor: "pointer",
          border: params.selected === params.index ? 2 : 1,
          borderColor: params.selected === params.index ? "primary.main" : "grey.300",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 2,
          },
        }}
      >
        <CardMedia
          component="img"
          height="80"
          image={params.image}
          alt={params.label}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
          <Typography variant="caption" align="center" display="block">
            {params.label}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 170,
        right: 16,
        zIndex: 1000,
        maxWidth: 300,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h3">
            Base Maps
          </Typography>
          <IconButton
            onClick={() => {
              props.setBaseSelector(null);
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Grid container spacing={1}>
          {myData.map((item, index) => {
            return (
              <Grid size={{ xs: 4 }} key={index}>
                <Basemap
                  index={index}
                  label={item.name}
                  image={images[index]}
                  layer={props.basemap}
                  setLayer={props.setBasemap}
                  url={item.url}
                  selected={props.selected}
                  setSelected={props.setSelected}
                  category={props.category}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}
