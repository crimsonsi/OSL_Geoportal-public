import { useEffect, useState } from "react";
import $ from "jquery";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Circle from "ol/style/Circle";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { asArray } from "ol/color";
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Map as MapIcon,
  ViewColumn as ColumnIcon,
  Percent as PercentIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

export default function Query(props) {
  const operators = ["=", ">", "<", ">=", "<=", "<>", "ILIKE"];
  const [layrs, setLayrs] = useState([]);
  const [title, setTitle] = useState("");
  const [layerIndex, setlayerIndex] = useState(-1);
  const [columns, setColumns] = useState([]);
  const [lcolumn, setLColumn] = useState("");
  const [operator, setOperator] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (props?.map?.getAllLayers().length - 1 !== layrs.length) {
      let d = [];
      props.map?.getAllLayers().map((item, i) => {
        if (i != 0) {
          d.push(item.get("title"));
        }
      });
      setLayrs(d);
    }
  }, [props.map, props.map.getAllLayers()]);

  function populateColumns(title) {
    if (props?.map?.getAllLayers()?.length !== layrs.length) {
      let d = props?.body?.Data?.map((e) => {
        return e.url.split(":")[1];
      }).indexOf(title);
      if (d !== -1) {
        setlayerIndex(d);
      }
      props.map?.getAllLayers().map((item, i) => {
        if (item.get("title") === title) {
          const features = item.getSource().getFeatures();
          if (features.length > 0) {
            setColumns(Object.keys(features[0].values_));
          }
        }
      });
    }
  }

  function addToMap() {
    setError("");
    if (layerIndex !== -1 && value !== "" && operator !== "") {
      props.setIsLoading(false);
      var response = $.ajax({
        url: encodeURI(
          getUrl(
            props.body.Data[layerIndex].url.split(":")[0],
            props.body.Data[layerIndex].url.split(":")[1]
          )
        ),
        dataType: "json",
        success: {},
        error: function (xhr) {
          props.setIsLoading(false);
          setError("Oops! Something went wrong");
        },
      });
      $.when(response).done(function (data) {
        props.setIsLoading(false);
        setError("Items returned: " + data.features.length);
        if (data.features.length !== 0) {
          const i = props.map
            .getAllLayers()
            .map((e) => {
              return e.get("title");
            })
            .indexOf(title);

          if (i !== -1) {
            props.map.getAllLayers()[i].setSource(
              new VectorSource({
                features: new GeoJSON({}).readFeatures(response.responseJSON, {
                  featureProjection: props.map.getView().getProjection(),
                }),
              })
            );
            props.setExtent(
              props.map.getAllLayers()[i].getSource().getExtent()
            );
            props.map
              .getView()
              .fit(props.map.getAllLayers()[i].getSource().getExtent(), {
                padding: [50, 50, 50, 50],
              });
            let d = props?.body?.Data?.map((e) => {
              return e.url.split(":")[1];
            }).indexOf(title);
            if (d !== -1) {
              if (props.body.Data[d].style?.type === "Basic") {
                props.map
                  .getAllLayers()
                  [i].setStyle(
                    fillStyle(
                      props.map.getAllLayers()[i],
                      props.body.Data[d].style
                    )
                  );
              } else if (props.body.Data[d].style?.type === "Unique") {
                props.map
                  .getAllLayers()
                  [i].setStyle(
                    uniqueStyle(
                      props.map.getAllLayers()[i],
                      props.body.Data[d].style
                    )
                  );
              } else if (props.body.Data[d].style?.type === "Range") {
                props.map
                  .getAllLayers()
                  [i].setStyle(
                    rangeStyle(
                      props.map.getAllLayers()[i],
                      props.body.Data[d].style
                    )
                  );
              }
            }
          }
        }
      });
    }
  }

  function resetMap() {
    setError("");
    if (layerIndex !== -1 && value !== "" && operator !== "") {
      props.setIsLoading(false);
      var response = $.ajax({
        url: encodeURI(
          getResetUrl(
            props.body.Data[layerIndex].url.split(":")[0],
            props.body.Data[layerIndex].url.split(":")[1]
          )
        ),
        dataType: "json",
        success: {},
        error: function (xhr) {
          props.setIsLoading(false);
          setError("Oops! Something went wrong");
        },
      });
      $.when(response).done(function (data) {
        props.setIsLoading(false);
        setError("Items returned: " + data.features.length);
        if (data.features.length !== 0) {
          const i = props.map
            .getAllLayers()
            .map((e) => {
              return e.get("title");
            })
            .indexOf(title);

          if (i !== -1) {
            props.map.getAllLayers()[i].setSource(
              new VectorSource({
                features: new GeoJSON({}).readFeatures(response.responseJSON, {
                  featureProjection: props.map.getView().getProjection(),
                }),
              })
            );
            props.setExtent(
              props.map.getAllLayers()[i].getSource().getExtent()
            );
            props.map
              .getView()
              .fit(props.map.getAllLayers()[i].getSource().getExtent(), {
                padding: [50, 50, 50, 50],
              });
            let d = props?.body?.Data?.map((e) => {
              return e.url.split(":")[1];
            }).indexOf(title);
            if (d !== -1) {
              if (props.body.Data[d].style?.type === "Basic") {
                props.map
                  .getAllLayers()
                  [i].setStyle(
                    fillStyle(
                      props.map.getAllLayers()[i],
                      props.body.Data[d].style
                    )
                  );
              } else if (props.body.Data[d].style?.type === "Unique") {
                props.map
                  .getAllLayers()
                  [i].setStyle(
                    uniqueStyle(
                      props.map.getAllLayers()[i],
                      props.body.Data[d].style
                    )
                  );
              } else if (props.body.Data[d].style?.type === "Range") {
                props.map
                  .getAllLayers()
                  [i].setStyle(
                    rangeStyle(
                      props.map.getAllLayers()[i],
                      props.body.Data[d].style
                    )
                  );
              }
            }
          }
        }
      });
    }
  }

  function getUrl(workspace, layer) {
    if (operator === "ILIKE") {
      return `/geoserver/${workspace}/wfs?request=GetFeature&version=1.0.0&typeName=${workspace}:${layer}&CQL_FILTER=${lcolumn} ${operator} '%${value}%'&outputFormat=json`;
    } else
      return `/geoserver/${workspace}/wfs?request=GetFeature&version=1.0.0&typeName=${workspace}:${layer}&CQL_FILTER=${lcolumn}${operator}'${value}'&outputFormat=json`;
  }

  function getResetUrl(workspace, layer) {
    return `/geoserver/${workspace}/wfs?request=GetFeature&version=1.0.0&typeName=${workspace}:${layer}&outputFormat=json`;
  }

  function fillStyle(layer, style) {
    var colorArray = asArray(style.fill).slice();
    colorArray[3] = style.opacity;
    if (style.label) {
      layer
        .getSource()
        .getFeatures()
        .map((item) => {
          item.setStyle((feature, resolution) => {
            let txt =
              feature.values_[style.lcolumn] == undefined
                ? ""
                : feature.values_[style.lcolumn];

            return new Style({
              image: new Circle({
                radius: 6,
                fill: new Fill({
                  color: colorArray,
                }),
                stroke: new Stroke({
                  color: style.stroke,
                  width: style.width,
                }),
              }),
              fill: new Fill({
                color: colorArray,
              }),
              stroke: new Stroke({
                color: style.stroke,
                width: style.width,
              }),
              text: new Text({
                text: txt.toString(),
                font: `${style.lfont}px sans-serif`,
                fill: new Fill({
                  color: style.lcolor,
                }),
                offsetX: style.offsetX,
                offsetY: style.offsetY,
                overflow: false,
              }),
            });
          });
        });
    } else {
      return new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({
            color: colorArray,
          }),
          stroke: new Stroke({
            color: style.stroke,
            width: style.width,
          }),
        }),
        fill: new Fill({
          color: colorArray,
        }),
        stroke: new Stroke({
          color: style.stroke,
          width: style.width,
        }),
      });
    }
  }

  function uniqueStyle(layer, style) {
    layer
      .getSource()
      .getFeatures()
      .map((item) => {
        const i = style.classes
          .map((e) => {
            return e.name;
          })
          .indexOf(item.values_[style.column]);

        if (i !== -1) {
          item.setStyle(
            new Style({
              image: new Circle({
                radius: 6,
                fill: new Fill({
                  color: style.classes[i].color,
                }),
                stroke: new Stroke({
                  color: style.classes[i].color,
                  width: 1,
                }),
              }),
              fill: new Fill({
                color: style.classes[i].color,
              }),
              stroke: new Stroke({
                color: style.classes[i].color,
                width: 1,
              }),
            })
          );
        }
      });
  }

  function rangeStyle(layer, style) {
    style.classes.map((e) => {
      layer
        .getSource()
        .getFeatures()
        .map((item) => {
          if (
            Number(item.values_[style.column]) >= e.min &&
            Number(item.values_[style.column]) < e.max
          ) {
            item.setStyle(
              new Style({
                image: new Circle({
                  radius: 6,
                  fill: new Fill({
                    color: e.color,
                  }),
                  stroke: new Stroke({
                    color: e.color,
                    width: 1,
                  }),
                }),
                fill: new Fill({
                  color: e.color,
                }),
                stroke: new Stroke({
                  color: e.color,
                  width: 1,
                }),
              })
            );
          }
        });
    });
  }

  return (
    <Paper
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        width: 320,
        maxHeight: "calc(100vh - 32px)",
        overflow: "auto",
        zIndex: 1000,
        p: 3,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Typography variant="h6" gutterBottom>
          Query Data
        </Typography>

        <IconButton
          onClick={() => props.setQuerySelector(null)}
          sx={{
            position: "absolute",
            top: -8,
            right: -8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Select Layer</InputLabel>
            <Select
              value={title || ""}
              onChange={(e) => {
                setError("");
                populateColumns(e.target.value);
                setTitle(e.target.value);
              }}
              startAdornment={
                <MapIcon sx={{ mr: 1, color: "action.active" }} />
              }
            >
              {layrs.length > 0 &&
                layrs.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Select Column</InputLabel>
            <Select
              value={lcolumn || ""}
              onChange={(e) => {
                setError("");
                setLColumn(e.target.value);
              }}
              startAdornment={
                <ColumnIcon sx={{ mr: 1, color: "action.active" }} />
              }
            >
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

          <FormControl fullWidth size="small">
            <InputLabel>Select Operator</InputLabel>
            <Select
              value={operator || ""}
              onChange={(e) => {
                setError("");
                setOperator(e.target.value);
              }}
              startAdornment={
                <PercentIcon sx={{ mr: 1, color: "action.active" }} />
              }
            >
              {operators.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size="small"
            label="Your Input"
            value={value}
            onChange={(e) => {
              setError("");
              setValue(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "action.active" }} />
              ),
            }}
          />

          {error && (
            <Typography
              variant="body2"
              color={error.includes("returned") ? "success.main" : "error.main"}
            >
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              startIcon={<ClearIcon />}
              onClick={() => {
                setOperator("");
                setValue("");
                setLColumn("");
                resetMap();
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<CheckIcon />}
              onClick={addToMap}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
