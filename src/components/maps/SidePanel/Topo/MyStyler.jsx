import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Paper,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Card,
  CardContent,
  Slider,
  Stack,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Map as MapIcon,
  ViewList as ViewListIcon,
  PieChart as PieChartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Check as CheckIcon,
  Palette as PaletteIcon,
  FormatPaint as FormatPaintIcon,
  Label as LabelIcon,
} from "@mui/icons-material";
import Circle from "ol/style/Circle";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Vector from "ol/layer/Vector";
import { asArray } from "ol/color";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";
import { useRef } from "react";

export default function MyStyler(props) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        width: 350,
        maxHeight: "80vh",
        overflow: "auto",
        zIndex: 1000,
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Layer Styling</Typography>
        <IconButton
          size="small"
          onClick={() => props.setStyleSelector(null)}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Basic" />
        <Tab label="Unique" />
        <Tab label="Range" />
      </Tabs>

      {activeTab === 0 && (
        <BasicStyler
          setStyleSelector={props.setStyleSelector}
          map={props.map}
          body={props.body}
          setBody={props.setBody}
        />
      )}
      {activeTab === 1 && (
        <UniqueStyler
          setStyleSelector={props.setStyleSelector}
          map={props.map}
          body={props.body}
          setBody={props.setBody}
        />
      )}
      {activeTab === 2 && (
        <RangeStyler
          setStyleSelector={props.setStyleSelector}
          map={props.map}
          body={props.body}
          setBody={props.setBody}
        />
      )}
    </Paper>
  );
}

const BasicStyler = (props) => {
  const opacity = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0];
  const width = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const font = [10, 12, 14, 16, 18, 20, 26, 30, 40];
  const [layrs, setLayrs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [lcolumn, setLColumn] = useState("");
  const [lfont, setLFont] = useState(10);
  const [lcolor, setLColor] = useState("#000000");
  const [label, setLabel] = useState(false);
  const [title, setTitle] = useState("");
  const [fill, setFill] = useState("#606060");
  const [fopacity, setFOpacity] = useState(1);
  const [sfill, setSFill] = useState("#000000");
  const [swidth, setSWidth] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(12);

  useEffect(() => {
    let d = [];
    props.map?.getAllLayers().map((item, i) => {
      if (item instanceof Vector) {
        d.push(item.get("title"));
      }
    });
    setLayrs(d);
  }, []);

  useEffect(() => {
    if (title != "") {
      const i = props.body.Data?.map((e) => {
        return e?.url.split(":")[1];
      }).indexOf(title);
      if (i != -1 && props.body.Data[i]?.style?.type === "Basic") {
        const style = props.body.Data[i]?.style;
        if (style.fill !== fill) {
          setFill(style.fill);
        }
        if (style.opacity !== fopacity) {
          setFOpacity(style.opacity);
        }
        if (style.stroke !== sfill) {
          setSFill(style.stroke);
        }
        if (style.width !== swidth) {
          setSWidth(style.width);
        }
        if (style.label !== label) {
          setLabel(style.label);
        }
        if (style.lcolor !== lcolor) {
          setLColor(style.lcolor);
        }
        if (style.lfont !== lfont) {
          setLFont(style.lfont);
        }
        if (style.lcolumn !== lcolumn) {
          setLColumn(style.lcolumn);
        }
        if (style.offsetX !== offsetX) {
          setOffsetX(style.offsetX);
        }
        if (style.offsetY !== offsetY) {
          setOffsetY(style.offsetY);
        }
      }
    }
  }, [title]);

  function fillStyle(title, color, opacity, scolor, width) {
    if (props?.map?.getAllLayers()?.length > 1) {
      props.map?.getAllLayers().map((item, i) => {
        if (item.get("title") === title) {
          var colorArray = asArray(color ? color : fill).slice();
          colorArray[3] = opacity ? opacity : fopacity;

          item.setStyle((feature, resolution) => {
            if (label && lcolumn !== "") {
              let txt =
                feature.values_[lcolumn] == undefined
                  ? ""
                  : feature.values_[lcolumn];
              return new Style({
                image: new Circle({
                  radius: 6,
                  fill: new Fill({
                    color: colorArray,
                  }),
                  stroke: new Stroke({
                    color: scolor ? scolor : sfill,
                    width: width ? width : swidth,
                  }),
                }),
                fill: new Fill({
                  color: colorArray,
                }),
                stroke: new Stroke({
                  color: sfill,
                  width: swidth,
                }),
                text: new Text({
                  text: txt.toString(),
                  font: `${lfont}px sans-serif`,
                  fill: new Fill({
                    color: lcolor,
                  }),
                  offsetX: offsetX ? offsetX : 0,
                  offsetY: offsetY ? offsetY : 0,
                }),
              });
            } else {
              return new Style({
                image: new Circle({
                  radius: 6,
                  fill: new Fill({
                    color: colorArray,
                  }),
                  stroke: new Stroke({
                    color: scolor ? scolor : sfill,
                    width: width ? width : swidth,
                  }),
                }),
                fill: new Fill({
                  color: colorArray,
                }),
                stroke: new Stroke({
                  color: scolor ? scolor : sfill,
                  width: width ? width : swidth,
                }),
              });
            }
          });

          let d = props.body;
          const i = d.Data?.map((e) => {
            return e?.url.split(":")[1];
          }).indexOf(title);
          if (i != -1) {
            d.Data[i].style = {
              type: "Basic",
              fill: fill,
              opacity: fopacity,
              stroke: sfill,
              width: swidth,
              label: label,
              lcolor: lcolor,
              lfont: lfont,
              lcolumn: lcolumn,
              offsetX: offsetX,
              offsetY: offsetY,
            };
          }
          props.setBody(d);
        }
      });
    }
  }

  function populateColumns(title) {
    if (props?.map?.getAllLayers()?.length !== layrs.length) {
      let d = [];
      props.map?.getAllLayers().map((item, i) => {
        if (item.get("title") === title) {
          const features = item?.getSource()?.getFeatures();
          if (features && features.length > 0) {
            setColumns(Object.keys(features[0].values_));
          }
        }
      });
    }
  }

  useEffect(() => {
    fillStyle(title, null, null, null, null);
  }, [label, lcolumn, lcolor, lfont, offsetX, offsetY]);

  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MapIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Select Layer</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Layer</InputLabel>
            <Select
              value={title}
              label="Layer"
              onChange={(e) => {
                populateColumns(e.target.value);
                setTitle(e.target.value);
              }}
            >
              <MenuItem value="">Select Layer</MenuItem>
              {layrs.length > 0 &&
                layrs.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <FormatPaintIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Style</Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Fill Color</Typography>
              <TextField
                type="color"
                value={fill}
                onChange={(e) => {
                  setFill(e.target.value);
                  fillStyle(title, e.target.value, null);
                }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Opacity</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={fopacity}
                  onChange={(e) => {
                    setFOpacity(e.target.value);
                    fillStyle(title, null, e.target.value);
                  }}
                >
                  {opacity.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Stroke Color</Typography>
              <TextField
                type="color"
                value={sfill}
                onChange={(e) => {
                  setSFill(e.target.value);
                  fillStyle(title, null, null, e.target.value, null);
                }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Width</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={swidth}
                  onChange={(e) => {
                    setSWidth(e.target.value);
                    fillStyle(title, null, null, null, e.target.value);
                  }}
                >
                  {width.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LabelIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Label</Typography>
          </Box>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={label}
                onChange={(e) => setLabel(e.target.checked)}
              />
            }
            label="Enable Labels"
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Column</InputLabel>
                <Select
                  value={lcolumn}
                  label="Column"
                  onChange={(e) => setLColumn(e.target.value)}
                >
                  <MenuItem value="">Select Column</MenuItem>
                  {columns.length > 0 &&
                    columns.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Font Size</InputLabel>
                <Select
                  value={lfont}
                  label="Font Size"
                  onChange={(e) => setLFont(e.target.value)}
                >
                  {font.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}px
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Label Color</Typography>
              <TextField
                type="color"
                value={lcolor}
                onChange={(e) => setLColor(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField
                type="number"
                label="Offset X"
                value={offsetX}
                onChange={(e) => setOffsetX(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField
                type="number"
                label="Offset Y"
                value={offsetY}
                onChange={(e) => setOffsetY(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const UniqueStyler = (props) => {
  const [layrs, setLayrs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [lcolumn, setLColumn] = useState("");
  const [title, setTitle] = useState("");
  const [layerIndex, setlayerIndex] = useState(-1);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    let d = [];
    props.map?.getAllLayers().map((item, i) => {
      if (item instanceof Vector) {
        d.push(item.get("title"));
      }
    });
    setLayrs(d);
  }, []);

  function populateColumns(title) {
    if (props?.map?.getAllLayers()?.length !== layrs.length) {
      let d = [];
      props.map?.getAllLayers().map((item, i) => {
        if (item.get("title") === title) {
          const features = item?.getSource()?.getFeatures();
          if (features && features.length > 0) {
            setColumns(Object.keys(features[0].values_));
          }
        }
      });
    }
  }

  useEffect(() => {
    const ix = props.map
      ?.getAllLayers()
      .map((element) => {
        return element.get("title");
      })
      .indexOf(title);
    setlayerIndex(ix);

    if (ix !== -1) {
      const features = props.map?.getAllLayers()[ix].getSource().getFeatures();
      if (features.length > 0) {
        setColumns(Object.keys(features[0].values_));
      }
    }

    const i = props.body.Data?.map((e) => {
      return e?.url.split(":")[1];
    }).indexOf(title);
    if (i != -1 && props.body.Data[i]?.style?.type === "Unique") {
      const style = props.body.Data[i]?.style;
      setLColumn(style.column);
    }
  }, [title]);

  useEffect(() => {
    if (layerIndex !== -1) {
      let d = props.body;
      const i = d.Data?.map((e) => {
        return e?.url.split(":")[1];
      }).indexOf(title);
      if (i != -1) {
        d.Data[i].style = {
          type: "Unique",
          classes: classes,
          column: lcolumn,
        };
        props.setBody(d);
      }
    }
  }, [classes]);

  useEffect(() => {
    clearStyle(title);
    if (layerIndex != -1 && lcolumn != "geometry" && lcolumn != "too_many") {
      const i = props.body.Data?.map((e) => {
        return e?.url.split(":")[1];
      }).indexOf(title);

      if (
        i !== -1 &&
        props.body.Data[i]?.style?.type === "Unique" &&
        props.body.Data[i]?.style?.classes?.length > 0
      ) {
        setClasses(props.body.Data[i]?.style?.classes);
        return;
      } else {
        const features = props?.map
          ?.getAllLayers()
          [layerIndex].getSource()
          .getFeatures();
        let values = [];
        features.forEach((element) => {
          values.push(element.values_[lcolumn]);
        });
        let unique = new Set(values);
        const arr = Array.from(unique);

        if (arr.length < 21) {
          let cls = [];
          arr.map((i) => {
            let count = 0;
            features.forEach((element) => {
              if (element.values_[lcolumn] === i) {
                count++;
              }
            });

            cls.push({ name: i, color: getRandomColor(), count: count });
          });
          setClasses(cls);

          if (i != -1) {
            let d = props.body;
            d.Data[i].style.type = "Unique";
            d.Data[i].style.column = lcolumn;
            d.Data[i].style.classes = cls;
            props.setBody(d);
          }
        } else {
          setClasses([]);
          setLColumn("Max classes: 20");
        }
      }
    }
  }, [lcolumn]);

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  function clearStyle(title) {
    if (props?.map?.getAllLayers()?.length > 1) {
      props.map?.getAllLayers().map((item) => {
        if (item.get("title") === title) {
          item
            .getSource()
            .getFeatures()
            .map((fitem) => {
              fitem.setStyle((feature, resolution) => {
                return new Style({
                  image: new Circle({
                    radius: 6,
                    fill: new Fill({
                      color: "#F0A04B",
                    }),
                    stroke: new Stroke({
                      color: "#3A98B9",
                      width: 1,
                    }),
                  }),
                  fill: new Fill({
                    color: "#F0A04B",
                  }),
                  stroke: new Stroke({
                    color: "#3A98B9",
                    width: 1,
                  }),
                });
              });
            });

          const i = props.body.Data?.map((e) => {
            return e?.url.split(":")[1];
          }).indexOf(title);

          if (i !== -1) {
            let d = props.body;
            d.Data[i].style = {
              type: "Basic",
              fill: "#F0A04B",
              stroke: "#3A98B9",
              width: 1,
            };
            props.setBody(d);
          }
        }
      });
    }
  }

  const Theme = (params) => {
    const [color, setColor] = useState(params.item.color);

    useEffect(() => {
      if (lcolumn != "") {
        const i = params.classes
          .map((e) => {
            return e.name;
          })
          .indexOf(params.item.name);
        if (i !== -1) {
          let d = params.classes;
          d[i].color = color;
          params.setClasses(d);
        }
        props.map
          ?.getAllLayers()
          [layerIndex].getSource()
          .getFeatures()
          .map((item) => {
            if (
              lcolumn != "geometry" &&
              item.values_[lcolumn] === params.item.name
            ) {
              item.setStyle(
                new Style({
                  image: new Circle({
                    radius: 6,
                    fill: new Fill({
                      color: color,
                    }),
                    stroke: new Stroke({
                      color: color,
                      width: 1,
                    }),
                  }),
                  fill: new Fill({
                    color: color,
                  }),
                  stroke: new Stroke({
                    color: color,
                    width: 1,
                  }),
                })
              );
            }
          });
      }
    }, [color]);

    return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 1, p: 1, border: "1px solid #e0e0e0", borderRadius: 1 }}>
        <TextField
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          sx={{ width: 60, mr: 2 }}
          size="small"
        />
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {params.item.name}
        </Typography>
        <Chip label={params.item.count} size="small" color="primary" variant="outlined" />
      </Box>
    );
  };

  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MapIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Select Layer</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Layer</InputLabel>
            <Select
              value={title}
              label="Layer"
              onChange={(e) => {
                populateColumns(e.target.value);
                setTitle(e.target.value);
              }}
            >
              <MenuItem value="">Select Layer</MenuItem>
              {layrs.length > 0 &&
                layrs.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ViewListIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Select Column</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Column</InputLabel>
            <Select
              value={lcolumn}
              label="Column"
              onChange={(e) => setLColumn(e.target.value)}
            >
              <MenuItem value="">Select Column</MenuItem>
              {columns.length > 0 &&
                columns.map((item, i) => {
                  if (item !== "geometry") {
                    return (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PaletteIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Classes</Typography>
          </Box>
          
          {classes.length > 0 ? (
            <Stack spacing={1}>
              {classes.map((item, i) => (
                <Theme
                  key={i}
                  item={item}
                  classes={classes}
                  setClasses={setClasses}
                />
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: "center", py: 2 }}>
              {lcolumn === "geometry" && (
                <Typography color="error">This column is not supported</Typography>
              )}
              {lcolumn === "too_many" && (
                <Typography color="error">Classes exceed the maximum (20)</Typography>
              )}
              {!lcolumn && (
                <Typography color="text.secondary">Select a column to generate classes</Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const RangeStyler = (props) => {
  const [layrs, setLayrs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [lcolumn, setLColumn] = useState("");
  const [title, setTitle] = useState("");
  const [layerIndex, setlayerIndex] = useState(-1);
  const [classes, setClasses] = useState([]);
  const [extents, setExtents] = useState([]);
  const [isNumeric, setIsNumeric] = useState(false);
  const [classification, setClassification] = useState("Select Classification");
  const [rangeOPopup, setRangePopup] = useState(null);

  useEffect(() => {
    let d = [];
    props.map?.getAllLayers().map((item, i) => {
      if (item instanceof Vector) {
        d.push(item.get("title"));
      }
    });
    setLayrs(d);
  }, []);

  useEffect(() => {
    if (title != "") {
      const ix = props.map
        ?.getAllLayers()
        .map((element) => {
          return element.get("title");
        })
        .indexOf(title);
      setlayerIndex(ix);

      if (ix != -1) {
        const features = props.map
          ?.getAllLayers()
          [ix].getSource()
          .getFeatures();
        if (features?.length > 0) {
          setColumns(Object.keys(features[0].values_));
        }
      }

      const i = props.body.Data?.map((e) => {
        return e?.url.split(":")[1];
      }).indexOf(title);
      if (i != -1 && props.body.Data[i]?.style?.type === "Range") {
        const style = props.body.Data[i]?.style;
        setLColumn(style.column);
        setClassification(style.classification);
      }
    }
  }, [title]);

  useEffect(() => {
    if (layerIndex !== -1) {
      let d = props.body;
      const i = d.Data?.map((e) => {
        return e?.url.split(":")[1];
      }).indexOf(title);
      if (i != -1) {
        d.Data[i].style = {
          type: "Range",
          classes: classes,
          column: lcolumn,
          classification: classification,
        };
        props.setBody(d);
      }
    }
  }, [classes]);

  function clearStyle(title) {
    if (props?.map?.getAllLayers()?.length > 1) {
      props.map?.getAllLayers().map((item) => {
        if (item.get("title") === title) {
          item
            .getSource()
            .getFeatures()
            .map((fitem) => {
              fitem.setStyle((feature, resolution) => {
                return new Style({
                  image: new Circle({
                    radius: 6,
                    fill: new Fill({
                      color: "#F0A04B",
                    }),
                    stroke: new Stroke({
                      color: "#3A98B9",
                      width: 1,
                    }),
                  }),
                  fill: new Fill({
                    color: "#F0A04B",
                  }),
                  stroke: new Stroke({
                    color: "#3A98B9",
                    width: 1,
                  }),
                });
              });
            });

          const i = props.body.Data?.map((e) => {
            return e?.url.split(":")[1];
          }).indexOf(title);

          if (i !== -1) {
            let d = props.body;
            d.Data[i].style = {
              type: "Basic",
              fill: "#F0A04B",
              stroke: "#3A98B9",
              width: 1,
            };
            props.setBody(d);
          }
        }
      });
    }
  }

  function populateColumns(title) {
    if (props?.map?.getAllLayers()?.length !== layrs.length) {
      let d = [];
      props.map?.getAllLayers().map((item, i) => {
        if (item.get("title") === title) {
          const features = item?.getSource()?.getFeatures();
          if (features && features.length > 0) {
            setColumns(Object.keys(features[0].values_));
          }
        }
      });
    }
  }

  useEffect(() => {
    if (layerIndex != -1 && lcolumn != "geometry" && lcolumn != "too_many") {
      const features = props?.map
        ?.getAllLayers()
        [layerIndex].getSource()
        .getFeatures();

      let values = [];
      features.forEach((element) => {
        values.push(element.values_[lcolumn]);
      });

      setIsNumeric(values.some(isNaN));
      setClasses([]);
      if (values.some(isNaN)) return;

      let min = arrayMin(values);
      let max = arrayMax(values);
      setExtents([min, max]);
    }
  }, [lcolumn]);

  useEffect(() => {
    const i = props.body.Data?.map((e) => {
      return e?.url.split(":")[1];
    }).indexOf(title);

    if (classification === "Equal Interval") {
      if (
        i !== -1 &&
        props.body.Data[i]?.style?.type === "Range" &&
        props.body.Data[i]?.style?.classes?.length > 0
      ) {
        setClasses(props.body.Data[i]?.style?.classes);
        return;
      } else {
        let range = extents[1] - extents[0];
        let classes = 5;
        let interval = range / classes;
        let cls = [];

        const features = props?.map
          ?.getAllLayers()
          [layerIndex].getSource()
          .getFeatures();

        for (let i = 1; i < classes + 1; i++) {
          let lower = extents[0] + interval * (i - 1);
          let upper = extents[0] + interval * i;
          let count = 0;
          features.forEach((element) => {
        
            if (
              element.values_[lcolumn] >= lower &&
              element.values_[lcolumn] <= upper
            ) {
              count++;
            }
          });

          cls.push({
            name: `${withCommas(Number(lower).toFixed(2))} - ${withCommas(
              Number(upper).toFixed(2)
            )}`,
            color: getRandomColor(),
            min: Number(lower).toFixed(2),
            max: Number(upper).toFixed(2),
            count: count,
          });
        }
        setClasses(cls);

        if (i != -1) {
          let d = props.body;
          d.Data[i].style.type = "Range";
          d.Data[i].style.column = lcolumn;
          d.Data[i].style.classes = cls;
          d.Data[i].style.classification = classification;
          props.setBody(d);
        }
      }
    } else if (classification === "Custom Interval") {
      if (
        i !== -1 &&
        props.body.Data[i]?.style?.type === "Range" &&
        props.body.Data[i]?.style?.classes?.length > 0
      ) {
        setClasses(props.body.Data[i]?.style?.classes);
        return;
      }
    } else {
      setClasses([]);
      clearStyle(title);
    }
  }, [classification]);

  function addRange(name, min, max) {
    let cls = classes;
    cls.push({
      name: name,
      color: getRandomColor(),
      min: min,
      max: max,
    });
    setClasses(cls);
    const i = props.body.Data?.map((e) => {
      return e?.url.split(":")[1];
    }).indexOf(title);
    if (i != -1) {
      let d = props.body;
      d.Data[i].style.type = "Range";
      d.Data[i].style.column = lcolumn;
      d.Data[i].style.classes = cls;
      d.Data[i].style.classification = classification;
      props.setBody(d);
    }
  }

  function removeClass() {
    setClasses([]);
    clearStyle(title);
  }

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  function withCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function arrayMin(arr) {
    var len = arr.length,
      min = Infinity;
    while (len--) {
      if (Number(arr[len]) < min) {
        min = Number(arr[len]);
      }
    }
    return min;
  }

  function arrayMax(arr) {
    var len = arr.length,
      max = -Infinity;
    while (len--) {
      if (Number(arr[len]) > max) {
        max = Number(arr[len]);
      }
    }
    return max;
  }

  const Theme = (params) => {
    const [color, setColor] = useState(params.item.color);

    useEffect(() => {
      if (lcolumn != "" && layerIndex !== -1) {
        const i = params.classes
          .map((e) => {
            return e.name;
          })
          .indexOf(params.item.name);
        if (i !== -1) {
          let d = params.classes;
          d[i].color = color;
          params.setClasses(d);
        }
        props.map
          ?.getAllLayers()
          [layerIndex].getSource()
          .getFeatures()
          .map((item) => {
            if (
              Number(item.values_[lcolumn]) >= params.item.min &&
              Number(item.values_[lcolumn]) < params.item.max
            ) {
              item.setStyle(
                new Style({
                  image: new Circle({
                    radius: 6,
                    fill: new Fill({
                      color: color,
                    }),
                    stroke: new Stroke({
                      color: color,
                      width: 1,
                    }),
                  }),
                  fill: new Fill({
                    color: color,
                  }),
                  stroke: new Stroke({
                    color: color,
                    width: 1,
                  }),
                })
              );
            }
          });
      }
    }, [color]);

    return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 1, p: 1, border: "1px solid #e0e0e0", borderRadius: 1 }}>
        <TextField
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          sx={{ width: 60, mr: 2 }}
          size="small"
        />
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {params.item.name}
        </Typography>
        {params.item.count && (
          <Chip label={params.item.count} size="small" color="primary" variant="outlined" />
        )}
      </Box>
    );
  };

  const RangePopup = (params) => {
    const [name, setName] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    return (
      <Dialog open={true} onClose={() => setRangePopup(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Range</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Min: <strong>{params.extents[0]}</strong> | Max: <strong>{params.extents[1]}</strong>
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Min"
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Max"
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRangePopup(null)}>Cancel</Button>
          <Button
            onClick={() => {
              if (name && min && max) {
                params.addRange(name, min, max);
                setRangePopup(null);
              }
            }}
            variant="contained"
            startIcon={<CheckIcon />}
          >
            Add Range
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MapIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Select Layer</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Layer</InputLabel>
            <Select
              value={title}
              label="Layer"
              onChange={(e) => {
                populateColumns(e.target.value);
                setTitle(e.target.value);
              }}
            >
              <MenuItem value="">Select Layer</MenuItem>
              {layrs.length > 0 &&
                layrs.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ViewListIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Select Column</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Column</InputLabel>
            <Select
              value={lcolumn}
              label="Column"
              onChange={(e) => {
                setLColumn(e.target.value);
                setClasses([]);
                clearStyle(title);
              }}
            >
              <MenuItem value="">Select Column</MenuItem>
              {columns.length > 0 &&
                columns.map((item, i) => {
                  if (item !== "geometry") {
                    return (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PieChartIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Select Classification</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Classification</InputLabel>
            <Select
              value={classification}
              label="Classification"
              onChange={(e) => setClassification(e.target.value)}
            >
              <MenuItem value="Select Classification">Select Classification</MenuItem>
              <MenuItem value="Equal Interval">Equal Interval</MenuItem>
              <MenuItem value="Custom Interval">Custom Interval</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PaletteIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">Classes</Typography>
            </Box>
            {classification === "Custom Interval" && (
              <Box>
                <IconButton
                  onClick={() => {
                    if (lcolumn !== "") {
                      setRangePopup(true);
                    }
                  }}
                  color="primary"
                  size="small"
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => removeClass()}
                  color="error"
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          
          {classes && classes.length > 0 ? (
            <Stack spacing={1}>
              {classes.map((item, i) => (
                <Theme
                  key={i}
                  item={item}
                  classes={classes}
                  setClasses={setClasses}
                />
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: "center", py: 2 }}>
              {isNumeric && title != "" && lcolumn != "" && (
                <Typography color="error">No numeric values detected in this column</Typography>
              )}
              {!lcolumn && (
                <Typography color="text.secondary">Select a column to generate classes</Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {rangeOPopup && extents.length > 1 && (
        <RangePopup extents={extents} addRange={addRange} />
      )}
    </Box>
  );
};
