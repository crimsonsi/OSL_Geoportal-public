//import images card 1
import satellite from "../imgs/imagery.jpg";
import basemap from "../imgs/basemap.jpg";
import topomap from "../imgs/topomap.jpg";
import vectordata from "../imgs/vectordata.png";

import th1 from "../imgs/th1.jpg";
import th2 from "../imgs/th2.jpg";
import th3 from "../imgs/th3.jpg";
import th4 from "../imgs/th4.jpg";

import tp1 from "../imgs/tp1.png";
import tp2 from "../imgs/tp2.png";
import tp3 from "../imgs/tp3.jpg";
import tp4 from "../imgs/tp4.png";

import rs1 from "../imgs/rs1.png";
import rs2 from "../imgs/rs2.jpg";
import rs3 from "../imgs/rs3.jpg";
import rs4 from "../imgs/rs4.jpg";

import v1 from "../imgs/v1.png";
import v2 from "../imgs/v2.png";
import v3 from "../imgs/v3.jpg";
import v4 from "../imgs/v4.png";

import thematicMap from "../imgs/th1.jpg";
import rasterMap from "../imgs/rs1.png";
import vectorMap from "../imgs/v1.png";
import topoMap from "../imgs/tp3.jpg";

const myData = [
  {
    title: "Oakar Services",
    subtitle: "Data Hub",
    cat: "data",
    p: `Data Hub creates and maintains a range of significant spatial datasets that are useful to a number of stakeholders.
                `,
    label: "View Data",
    imgs: [
      { image: satellite, txt: "EO data" },
      { image: vectordata, txt: "Vector Data" },
      { image: topomap, txt: "Topographic Maps" },
      { image: satellite, txt: "Thematic Maps" },
      { image: basemap, txt: "Basemaps" },
    ],
  },
  {
    title: "Geo-Data Hub",
    subtitle: "Thematic Maps",
    cat: "Thematic Map",
    p: `These types of maps portray the geographic pattern of a particular subject matter in a geographic area.`,
    label: "View Sample Maps",
    imgs: [
      { image: th1, txt: "Landuse Maps" },
      { image: th2, txt: "Landcover Maps" },
      { image: th3, txt: "Vegetation Maps" },
      { image: th4, txt: "Ecological Maps" },
    ],
  },
  {
    title: "Geo-Data Hub",
    subtitle: "Topographic Maps",
    cat: "Topo Map",
    p: `These types of map characterized by large-scale detail and quantitative representation of landmark features.`,
    label: "View Sample Maps",
    imgs: [
      { image: tp1, txt: "EO data" },
      { image: tp2, txt: "Vector Data" },
      { image: tp3, txt: "Topographic Maps" },
      { image: tp4, txt: "Thematic Maps" },
    ],
  },
  {
    title: "Geo-Data Hub",
    subtitle: "Raster Data",
    cat: "Basemap",
    p: `Earth observation involves gathering information about the Earth through remote sensing technologies`,
    label: "View/Download Data",
    imgs: [
      { image: rs1, txt: "Satellite Imagery" },
      { image: rs2, txt: "Aerial Imagery" },
      { image: rs3, txt: "Drone Data" },
      { image: rs4, txt: "Astronomical Data" },
    ],
  },
  {
    title: "Geo-Data Hub",
    subtitle: "Vector Data",
    cat: "World Data",
    p: `Vector data structures represent specific features on the Earth's surface, and assign attributes to those features`,
    label: "View/Download Data",
    imgs: [
      { image: v1, txt: "Point Data" },
      { image: v2, txt: "Line Data" },
      { image: v3, txt: "Polygon Data" },
      { image: v4, txt: "Point Cloud Data" },
    ],
  },
];

const categoriesData = [
  {
    title: "Thematic Maps",
    subTitle: "Geographical patterns",
    description:
      "A thematic map is a type of map that portrays the geographic pattern of a particular subject matter in a geographic area.",
    image: thematicMap,
    link: "/category/Thematic Map",
  },
  {
    title: "Topographic Maps",
    subTitle: "Contour lines",
    description:
      "A topographic map a type of map characterized by large-scale detail and quantitative representation of relief features, usually using contour lines, but historically using a variety of methods.",
    image: topoMap,
    link: "/category/Topo Map",
  },
  {
    title: "Raster Maps",
    subTitle: "Base maps",
    description:
      "Earth observation is the gathering of information about planet Earth's physical, chemical and biological systems via remote sensing technologies, usually involving satellites carrying imaging devices.",
    image: rasterMap,
    link: "/category/Topo Map",
  },
  {
    title: "Vector Data",
    subTitle: "Data models",
    description:
      "Vector data models use points and their associated X, Y coordinate pairs to represent the vertices of spatial features, much as if they were being drawn on a map.",
    image: vectorMap,
    link: "/category/World Data",
  },
];

export { myData, categoriesData };
