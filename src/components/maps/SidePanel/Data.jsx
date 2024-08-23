import { useEffect, useState } from "react";
import ButtonMain from "../../Utils/ButtonMain";
import $ from "jquery";
import Select from "../../Utils/SelectMain";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";
import Circle from "ol/style/Circle";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { get as getProjection } from "ol/proj.js";
import { getTopLeft, getWidth } from "ol/extent.js";
import proj4 from "proj4";
import WMTSCapabilities from "ol/format/WMTSCapabilities.js";
import { RegularShape } from "ol/style.js";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS.js";

export default function Data(props) {
  var XMLParser = require("react-xml-parser");
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
      fetch(`/geoserver/rest/workspaces/${selected}/layers`, {
        credentials: "include",
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

            const xml = await fetch(
              `/geoserver/rest/workspaces/${workspace}/styles/${style.style.name}.sld`,
              {
                credentials: "include",
                headers: headers,
              }
            ).then((res) => {
              if (res.ok) return res.text();
            });
            const txt = new XMLParser().parseFromString(xml);
            var symbolizer = findNested(txt, "name", "ChannelSelection");

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
          } catch (error) {
            try {
              const style = await fetch(`${dt.layer.defaultStyle.href}`, {
                credentials: "include",
                headers: headers,
              }).then((res) => {
                if (res.ok) return res.json();
              });

              const xml = await fetch(
                `/geoserver/rest/styles/${style.style.name}.sld`,
                {
                  credentials: "include",
                  headers: headers,
                }
              ).then((res) => {
                if (res.ok) return res.text();
              });
              const txt = new XMLParser().parseFromString(xml);
              var symbolizer = findNested(txt, "name", "ChannelSelection");

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
            } catch (error) {}
          }

          fetch(
            encodeURI(
              `/geoserver/gwc/service/wmts?REQUEST=GetCapabilities&format=xml`
            ),
            {
              method: "get",
              credentials: "include",
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
              d.Data.push({
                url: `${workspace}:${layer}`,
                style: {
                  type: "Unique",
                  classes: cls,
                },
              });
              props.setBody(d);
              props.setIsLoading(false);
            })
            .catch((e) => {});
        } else if (dataType === "VECTOR") {
          let shape;
          let radius;
          let fill;
          let stroke;
          try {
            const style = await fetch(`${dt.layer.defaultStyle.href}`, {
              credentials: "include",
              headers: headers,
            }).then((res) => {
              if (res.ok) return res.json();
            });

            let xml;

            try {
              xml = await fetch(
                `/geoserver/rest/styles/${style.style.name}.sld`,
                {
                  credentials: "include",
                  headers: headers,
                }
              ).then((res) => {
                if (res.ok) return res.text();
              });

              const txt = new XMLParser().parseFromString(xml);
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
              try {
                xml = await fetch(
                  `/geoserver/rest/workspaces/${workspace}/styles/${style.style.name}.sld`,
                  {
                    credentials: "include",
                    headers: headers,
                  }
                ).then((res) => {
                  if (res.ok) return res.text();
                });

                const txt = new XMLParser().parseFromString(xml);
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
              } catch (error) {}
            }
          } catch (error) {}
          if (fill == undefined) fill = "blue";
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
              let d = props.body;
              d.Data.push({
                url: `${workspace}:${layer}`,
                style: {
                  type: "Basic",
                  fill: fill,
                  stroke: stroke,
                  width: 1,
                  radius: radius,
                },
              });
              props.setBody(d);
            }
          });
        } else props.setIsLoading(false);
      } catch (e) {
        alert("Invalid Layer!");
      }
    }
  }

  function getUrl(workspace, layer) {
    return `/geoserver/${workspace}/wfs?request=GetFeature&version=1.0.0&typeName=${workspace}:${layer}&outputFormat=json`;
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

  return (
    <div className="data_popup">
      <div className="dcont">
        <h3>Add Data</h3>
        <hr />
        {workspaces.map((item, i) => {
          return (
            <WorkspaceItem
              key={i}
              workspace={item}
              getSelected={getSelected}
              layers={layers}
              addToMap={addToMap}
            />
          );
        })}
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
  );
}

const WorkspaceItem = (props) => {
  const [open, setOpen] = useState(false);
  const Item = (params) => {
    return (
      <div
        onClick={() => {
          props.addToMap(params.workspace, params.layer);
        }}
        className="item"
      >
        <i className="fa fa-map"></i>
        <p>{params.layer}</p>
      </div>
    );
  };

  return (
    <div
      onClick={() => {
        props.getSelected(props.workspace);
        setOpen((curr) => !curr);
      }}
      className="workspace_item"
    >
      <div className="top">
        <p>{props.workspace}</p> <i className="fa fa-angle-down"></i>
      </div>
      <div className="content">
        {open &&
          props.layers &&
          props.layers.map((item, i) => {
            return <Item key={i} workspace={props.workspace} layer={item} />;
          })}
      </div>
    </div>
  );
};
