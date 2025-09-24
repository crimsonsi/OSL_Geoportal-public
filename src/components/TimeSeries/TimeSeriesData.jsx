import { useEffect, useState } from "react";
import $, { error } from "jquery";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileLayer from "ol/layer/WebGLTile.js";
import Circle from "ol/style/Circle";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { get as getProjection } from "ol/proj.js";
import { getWidth } from "ol/extent.js";
import WMTSCapabilities from "ol/format/WMTSCapabilities.js";
import { RegularShape } from "ol/style.js";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS.js";
import TimeSeriesSlider from "./TimeSeriesSlider";
import { asArray } from "ol/color";
import XMLParser from "react-xml-parser";

export default function TimeSeriesData(props) {
  const [inputDate, setInputDate] = useState();

  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);

  const parser = new WMTSCapabilities();
  const [workspaces, setWorkspaces] = useState([]);
  const [layers, setLayers] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const projection = getProjection("EPSG:900913");
  const projectionExtent = projection.getExtent();
  const size = getWidth(projectionExtent) / 256;
  const resolutions = new Array(14);
  const matrixIds = new Array(14);
  for (let z = 0; z < 14; ++z) {
    resolutions[z] = size / Math.pow(2, z + 1);
    matrixIds[z] = "EPSG:900913:" + z;
  }

  let dataType = "";
  let headers = {
    Authorization: `Basic ${Buffer.from("admin:geoserver", "utf-8").toString(
      "base64"
    )}`,
  };

  const removeFromSeries = (val) => {
    setTimeSeriesData((curr) => {
      curr.pop(val);
      return curr;
    });
  };

  useEffect(() => {
    if (props.body.Data.length > 0) {
      if (props.active >= 0 && props.active < props.body.Data.length) {
        loadData(props.body.Data[props.active]);
      } else {
        loadData(props.body.Data[props.body.Data.length - 1]);
      }
    }
  }, [props.body]);

  const nextProduct = (target) => {
    if (target < props.body.Data.length - 1) {
      removeLayersExcept(["Basemap", "Kenya Counties", "Grid"]);
      let active = target + 1;

      if (props.body.Data[active] != null) {
        props.setActive(active);
        loadData(props.body.Data[active]);
      }
    }
  };

  const showCurrent = (target) => {
    if (target < props.body.Data.length) {
      removeLayersExcept(["Basemap", "Kenya Counties", "Grid"]);
      if (props.body.Data[target] != null) {
        props.setActive(target);
        loadData(props.body.Data[target]);
      }
    }
  };

  async function loadData(item) {
    props.setIsLoading(false);
    let dataType = "";
    const dt = await fetch(
      `/api/geoserver/rest/layers/${item?.url.split(":")[1]}.json`,
      {
        headers: headers,
      }
    ).then((res) => {
      if (res.ok) return res.json();
    });
    dataType = dt?.layer?.type;
    if (dataType === "RASTER") {
      await fetch(
        encodeURI(
          `/api/geoserver/gwc/service/wmts?REQUEST=GetCapabilities&format=xml`
        ),
        {
          method: "get"
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch messages!!!");
          }
          return res.text();
        })
        .then((text) => {
          const result = parser.read(text);
          const options = optionsFromCapabilities(result, {
            layer: `${item.url.split(":")[0]}:${item.url.split(":")[1]}`,
            matrixSet: "EPSG:900913",
          });

          const pic = new TileLayer({
            title: item.url.split(":")[1],
            opacity: 1,
            source: new WMTS(options),
          });
          props.map.addLayer(pic);
          props.map.getView().fit(options.tileGrid.getExtent(), {
            padding: [100, 100, 100, 100],
          });
          props.setIsLoading(false);
        })
        .catch((e) => {});
    } else if (dataType === "VECTOR") {
      props.setIsLoading(false);
      var response = await $.ajax({
        url: encodeURI(loadUrl(item.url)),
        dataType: "json",
        success: {},
        error: function (xhr) {
          props.setIsLoading(false);
        },
      });
      $.when(response).done(function (data) {
        props.setIsLoading(false);
        if (data.features.length !== 0) {
          const vector = new VectorLayer({
            title: item.url.split(":")[1],
            source: new VectorSource({
              features: new GeoJSON({}).readFeatures(data, {
                featureProjection: props.map.getView().getProjection(),
              }),
            }),
          });
          props.setExtent(vector.getSource().getExtent());
          props.map.getView().fit(vector.getSource().getExtent(), {
            padding: [50, 50, 50, 50],
          });
          if (item.style.type === "Basic") {
            vector.setStyle(addStyle(vector, item.style));
          } else if (item.style.type === "Unique") {
            vector.setStyle(uniqueStyle(vector, item.style));
          } else if (item.style.type === "Range") {
            vector.setStyle(rangeStyle(vector, item.style));
          }
          props.map.addLayer(vector);
        }
      });
    } else props.setIsLoading(false);
  }

  const previousProduct = (target) => {
    if (target > 0) {
      removeLayersExcept(["Basemap", "Kenya Counties", "Grid"]);
      let active = target - 1;

      if (props.body.Data[active] != null) {
        props.setActive(active);
        loadData(props.body.Data[active]);
      }
    }
  };

  useEffect(() => {
    fetch("/geoserver/rest/workspaces", {
      credentials: "include",
      headers: headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.workspaces.workspace.length > 0) {
          let list = [];
          data.workspaces.workspace.forEach((item) => {
            list.push(item.name);
          });
          setWorkspaces(list);
          setSelected(list[0]);
        }
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    if (selected) {
      fetch(`/api/geoserver/rest/workspaces/${selected}/layers`, {
        headers: headers,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.layers !== "" && data.layers.layer.length > 0) {
            let list = [];
            data.layers.layer.forEach((item) => {
              list.push(item.name);
            });
            setLayers(list);
            setData(data.layers.layer);
            setSelectedLayer(list[0]);
          }
        })
        .catch((e) => {});
    }
  }, [selected]);

  async function addToMap(workspace, layer) {
    if (workspace === null && layer === null) return;

    const i = data
      .map((e) => {
        return e.name;
      })
      .indexOf(layer);

    if (i !== -1) {
      props.setIsLoading(false);
      try {
        const dt = await fetch(
          data[i].href
            .replace("http://geoserver:8080", "")
            .replaceAll("+", " "),
          {
            credentials: "include",
            headers: headers,
          }
        ).then((res) => {
          if (res.ok) return res.json();
        });
        dataType = dt.layer.type;
        if (dataType === "RASTER") {
          let cls = [];
          try {
            const style = await fetch(`${dt.layer.defaultStyle.href}`, {
              credentials: "include",
              headers: headers,
            }).then((res) => {
              if (res.ok) return res.json();
            });

            let xml;

            if (style.workspace != null) {
              xml = await fetch(
                `/api/geoserver/rest/workspaces/${style.workspace.name}/styles/${style.style.filename}`,
                {
                  headers: headers,
                }
              ).then((res) => {
                if (res.ok) return res.text();
              });
            } else {
              xml = await fetch(
                `/api/geoserver/rest/styles/${style.style.filename}`,
                {
                  headers: headers,
                }
              ).then((res) => {
                if (res.ok) return res.text();
              });
            }

            const txt = new XMLParser().parseFromString(
              xml.replaceAll("sld:", "")
            );
            var symbolizer = await findNested(txt, "name", "ChannelSelection");

            if (symbolizer != undefined) {
              symbolizer.children.map((i) => {
                const n = findNested(i, "name", "SourceChannelName");

                cls.push({
                  name: "Band " + n.value,
                  color: i.name.replace("Channel", "").toLowerCase(),
                  count: 1,
                });
              });
            }
            const colormap = findNested(txt, "name", "ColorMap");
            if (colormap != undefined) {
              colormap.children.map((i) => {
                const n = findNested(i, "name", "ColorMapEntry");
                cls.push({
                  name: n?.attributes?.label,
                  color: n?.attributes?.color,
                  count: 1,
                });
              });
            }
          } catch (error) {
            props.setIsLoading(false);
          }

          fetch(
            encodeURI(
              `/api/geoserver/gwc/service/wmts?REQUEST=GetCapabilities&format=xml`
            ),
            {
              method: "get"
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw Error("Could not fetch messages!!!");
              }
              return res.text();
            })
            .then((text) => {
              const result = parser.read(text);
              const options = optionsFromCapabilities(result, {
                layer: `${workspace}:${layer}`,
                matrixSet: "EPSG:900913",
              });

              const pic = new TileLayer({
                title: layer,
                opacity: 1,
                source: new WMTS(options),
              });
              props.map.addLayer(pic);
              props.map.getView().fit(options.tileGrid.getExtent(), {
                padding: [100, 100, 100, 100],
              });
              let d = props.body;
              if (
                !d.Data.some((item) => item.url === `${workspace}:${layer}`)
              ) {
                d.Data.push({
                  url: `${workspace}:${layer}`,
                  style: {
                    type: "Unique",
                    classes: cls,
                  },
                  date: inputDate,
                });
                props.setActive(d.Data.length - 1);
                props.setBody(d);
                props.addToSeries(inputDate, selected, selectedLayer);
              }
              props.setIsLoading(false);
            })
            .catch((e) => {
              alert(
                "Layer not available or caching is disabled for that layer!"
              );
              props.setIsLoading(false);
            });
        } else if (dataType === "VECTOR") {
          let shape;
          let radius;
          let fill;
          let stroke;
          try {
            const style = await fetch(
              `${dt.layer.defaultStyle.href.replace(
                "http://geoserver:8080",
                ""
              )}`,
              {
                credentials: "include",
                headers: headers,
              }
            ).then((res) => {
              if (res.ok) return res.json();
            });

            let xml;

            try {
              xml = await fetch(
                `/api/geoserver/rest/styles/${style.style.name}.sld`,
                {
                  headers: headers,
                }
              ).then((res) => {
                if (res.ok) return res.text();
              });

              const txt = new XMLParser().parseFromString(
                xml.replaceAll("sld:", "")
              );
              const rule = findNested(txt, "name", "Rule");

              var symbolizer = findNested(rule, "name", "PointSymbolizer");
              if (symbolizer == undefined) {
                symbolizer = findNested(rule, "name", "LineSymbolizer");
                if (symbolizer == undefined) {
                  symbolizer = findNested(rule, "name", "PolygonSymbolizer");
                }
              }

              shape = findNested(rule, "name", "WellKnownName")?.value;
              radius = findNested(rule, "name", "Size")?.value;
              const fillObj = findNested(rule, "name", "Fill");
              if (fillObj != undefined)
                fill = findNested(fillObj, "name", "CssParameter")?.value;
              const strokeObj = findNested(rule, "name", "Stroke");
              if (strokeObj != undefined)
                stroke = findNested(strokeObj, "name", "CssParameter")?.value;
            } catch (error) {
              // console.log(error);
              try {
                xml = await fetch(
                  `/api/geoserver/rest/workspaces/${workspace}/styles/${style.style.name}.sld`,
                  {
                    headers: headers,
                  }
                ).then((res) => {
                  if (res.ok) return res.text();
                });

                const txt = new XMLParser().parseFromString(
                  xml.replaceAll("sld:", "")
                );
                const rule = findNested(txt, "name", "Rule");
                var symbolizer = findNested(rule, "name", "PointSymbolizer");
                if (symbolizer == undefined) {
                  symbolizer = findNested(rule, "name", "LineSymbolizer");
                  if (symbolizer == undefined) {
                    symbolizer = findNested(rule, "name", "PolygonSymbolizer");
                  }
                }

                shape = findNested(rule, "name", "WellKnownName")?.value;
                radius = findNested(rule, "name", "Size")?.value;
                const fillObj = findNested(rule, "name", "Fill");
                if (fillObj != undefined)
                  fill = findNested(fillObj, "name", "CssParameter")?.value;
                const strokeObj = findNested(rule, "name", "Stroke");
                if (strokeObj != undefined)
                  stroke = findNested(strokeObj, "name", "CssParameter")?.value;
              } catch (error) {
                console.log(error);
                props.setIsLoading(false);
              }
            }
          } catch (error) {
            console.log(error);
            props.setIsLoading(false);
          }

          var response = $.ajax({
            url: encodeURI(getUrl(workspace, layer)),
            dataType: "json",
            success: {},
            error: function (xhr) {
              props.setIsLoading(false);
            },
          });
          $.when(response).done(function (data) {
            props.setIsLoading(false);
            if (data.features.length !== 0) {
              let d = props.body;
              if (
                !d.Data.some((item) => item.url === `${workspace}:${layer}`)
              ) {
                const vector = new VectorLayer({
                  title: layer,
                  source: new VectorSource({
                    features: new GeoJSON({}).readFeatures(
                      response.responseJSON,
                      {
                        featureProjection: props.map.getView().getProjection(),
                      }
                    ),
                  }),
                });
                props.setExtent(vector.getSource().getExtent());
                props.map.getView().fit(vector.getSource().getExtent(), {
                  padding: [100, 100, 100, 100],
                });
                vector.setStyle(fillStyle(radius, fill, stroke, "square"));
                props.map.addLayer(vector);

                d.Data.push({
                  url: `${workspace}:${layer}`,
                  style: {
                    type: "Basic",
                    fill: fill,
                    stroke: stroke,
                    width: 1,
                    radius: radius,
                  },
                  date: inputDate,
                });
                props.setActive(d.Data.length - 1);
                props.setBody(d);
                props.addToSeries(inputDate, selected, selectedLayer);
              }
              props.setIsLoading(false);
            }
          });
        } else {
          alert("Invalid Layer!");
          props.setIsLoading(false);
        }
      } catch (e) {
        alert("Invalid Layer!");
      }
    }
  }

  const removeLayersExcept = (layersToKeep) => {
    const mapLayers = props.map.getLayers().array_;

    const updatedLayers = mapLayers.filter(
      (layer) => !layersToKeep.includes(layer.get("title"))
    );
    updatedLayers.map((item, i) => props.map.removeLayer(item));
  };

  function loadUrl(url, filters) {
    if (!filters) {
      return `/api/geoserver/${
        url.split(":")[0]
      }/wfs?request=GetFeature&version=1.0.0&typeName=${url}&outputFormat=json`;
    } else {
      return `/api/geoserver/${
        url.split(":")[0]
      }/wfs?request=GetFeature&version=1.0.0&typeName=${url}&${filters}&outputFormat=json`;
    }
  }

  function getUrl(workspace, layer) {
    return `/api/geoserver/${workspace}/wfs?request=GetFeature&version=1.0.0&typeName=${workspace}:${layer}&outputFormat=json`;
  }

  const getSelected = (value) => {
    setSelected(value);
  };

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  function findNested(obj, key, value) {
    if (obj[key] === value) {
      return obj;
    } else {
      var keys = Object.keys(obj);
      for (var i = 0, len = keys.length; i < len; i++) {
        var k = keys[i];
        if (obj[k] && typeof obj[k] == "object") {
          var found = findNested(obj[k], key, value);
          if (found) {
            return found;
          }
        }
      }
    }
  }

  function fillStyle(radius, fill, stroke, shape) {
    let p = 0;
    let a = 0;
    let r = 0;
    switch (shape) {
      case "circle":
        p = 1;
        a = 0;
        break;
      case "square":
        p = 4;
        a = Math.PI / 4;
        break;
      case "triangle":
        p = 3;
        a = 0;
        r = Math.PI / 4;
        break;
      default:
        break;
    }

    return new Style({
      image:
        shape == "circle"
          ? new Circle({
              radius: radius,
              fill: new Fill({
                color: fill,
              }),
              stroke: new Stroke({
                color: stroke,
                width: 1,
              }),
            })
          : new RegularShape({
              radius: radius,
              points: p,
              angle: a,
              rotation: r,
              fill: new Fill({
                color: fill,
              }),
              stroke: new Stroke({
                color: stroke,
                width: 1,
              }),
            }),
      fill: new Fill({
        color: fill,
      }),
      stroke: new Stroke({
        color: stroke,
        width: 1,
      }),
    });
  }

  function addStyle(layer, style) {
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

  function fillNoStyle(radius, fill, stroke, shape) {
    let p = 0;
    let a = 0;
    let r = 0;
    switch (shape) {
      case "circle":
        p = 1;
        a = 0;
        break;
      case "square":
        p = 4;
        a = Math.PI / 4;
        break;
      case "triangle":
        p = 3;
        a = 0;
        r = Math.PI / 4;
        break;
      default:
        break;
    }

    return new Style({
      image:
        shape == "circle"
          ? new Circle({
              radius: radius,
              fill: new Fill({
                color: fill,
              }),
              stroke: new Stroke({
                color: stroke,
                width: 1,
              }),
            })
          : new RegularShape({
              radius: radius,
              points: p,
              angle: a,
              rotation: r,
              fill: new Fill({
                color: fill,
              }),
              stroke: new Stroke({
                color: stroke,
                width: 1,
              }),
            }),
      fill: new Fill({
        color: fill,
      }),
      stroke: new Stroke({
        color: stroke,
        width: 1,
      }),
    });
  }

  function uniqueStyle(layer, style) {
    style.classes.map((e) => {
      let count = 0;
      layer
        .getSource()
        .getFeatures()
        .map((item) => {
          if (item.values_[style.column] == e.name) {
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
            count++;
          }
        });
      e["count"] = count;
    });
  }

  function rangeStyle(layer, style) {
    style.classes.map((e) => {
      let count = 0;
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
            count++;
          }
        });
      e["count"] = count;
    });
  }

  return (
    <>
      <TimeSeriesSlider
        active={props.active}
        body={props.body}
        showCurrent={showCurrent}
        nextProduct={nextProduct}
        previousProduct={previousProduct}
      />
      {props.dataSelector && (
        <div className="data_popup">
          <div className="dcont">
            <h3>Add Data</h3>
            <hr />
            <div className="createTimeSeries">
              {timeSeries[props.active]}
              <div className="selectBox">
                <select
                  onChange={(e) => {
                    setSelected(e.target.value);
                  }}
                >
                  <option>Select Category</option>
                  {workspaces.map((workspace, i) => (
                    <option key={i} value={workspace}>
                      {workspace}
                    </option>
                  ))}
                </select>
                {selected ? (
                  layers.length != 0 ? (
                    <div className="selectBox">
                      <select
                        onChange={(e) => {
                          setSelectedLayer(e.target.value);
                        }}
                      >
                        <option>Select Layer</option>
                        {layers.map((layer, i) => (
                          <option key={i} value={layer}>
                            {layer}
                          </option>
                        ))}
                      </select>
                      <input
                        onChange={(e) => {
                          setInputDate(e.target.value);
                        }}
                        type="date"
                      />
                      <button
                        className="add"
                        onClick={() => {
                          removeLayersExcept([
                            "Basemap",
                            "Kenya Counties",
                            "Grid",
                          ]);
                          addToMap(selected, selectedLayer);
                        }}
                      >
                        Add to Series
                      </button>
                    </div>
                  ) : (
                    <p>Please select a category</p>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="itemContainer">
                <h3>Time Series Data</h3>
                <hr />
                {props.body.Data.map((item, i) => {
                  return (
                    <TimeSeriesItem
                      setBody={props.setBody}
                      body={props.body}
                      key={i}
                      removeLayersExcept={removeLayersExcept}
                      index={i}
                      item={item}
                    />
                  );
                })}
              </div>
            </div>
            <i
              onClick={() => {
                props.setDataSelector(null);
              }}
              className="fa fa-close"
            >
              &#xf00d;
            </i>
          </div>
        </div>
      )}
    </>
  );
}

const TimeSeriesItem = (props) => {
  function moveUp() {
    if (props.index !== 0) {
      let d = props.body;
      const removedItem = d.Data.splice(props.index, 1)[0];
      d.Data.splice(props.index - 1, 0, removedItem);
      props.setBody({ ...props.body, Data: d.Data });
    }
  }

  function moveDown() {
    if (props.index !== props.body.Data.length) {
      let d = props.body;
      const removedItem = d.Data.splice(props.index, 1)[0];
      d.Data.splice(props.index + 1, 0, removedItem);
      props.setBody({ ...props.body, Data: d.Data });
    }
  }

  function removeItem() {
    if (props.index !== props.body.Data.length) {
      let d = props.body;
      d.Data.splice(props.index, 1);
      props.setBody({ ...props.body, Data: d.Data });
      props.removeLayersExcept(["Basemap", "Kenya Counties", "Grid"]);
    }
  }

  return (
    <div className="timeseriesItem">
      <div>
        <p>{props.item.url.split(":")[1]}</p>
        <h6>{props.item.date}</h6>
      </div>

      <i
        onClick={() => {
          moveUp();
        }}
        className="fa fa-angle-up"
      ></i>
      <i
        onClick={() => {
          moveDown();
        }}
        className="fa fa-angle-down"
      ></i>
      <i
        onClick={() => {
          removeItem();
        }}
        className="fa fa-times"
      ></i>
    </div>
  );
};
