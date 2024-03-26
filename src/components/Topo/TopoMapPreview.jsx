import { useEffect, useState } from "react";
import TopPanel from "../maps/TopPanel";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Circle from "ol/style/Circle";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import AlertMsg from "../../components/maps/AlertMsg";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";
import myData from "../../assets/data/data";
import Basemaps from "../BaseMaps/Basemaps";
import Text from "ol/style/Text";
import {
  ScaleLine,
  ZoomToExtent,
  defaults as defaultControls,
} from "ol/control";
import $ from "jquery";
import { fromLonLat } from "ol/proj.js";
import { useRef } from "react";
import RightPanel from "../maps/RightPanel";
import Data from "../maps/SidePanel/Data";
import RippleLoading from "../Utils/RippleLoading";
import MyStyler from "../maps/SidePanel/Topo/MyStyler";
import { Map } from "ol";
import { asArray } from "ol/color";
import Query from "../Topo/Query";
import PreviewData from "../maps/PreviewData";
import WMTSCapabilities from "ol/format/WMTSCapabilities.js";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS.js";

export default function ThematicPreview(props) {
  const parser = new WMTSCapabilities();
  let template = {
    Title: "",
    Category: "Thematic",
    Description: "",
    Thumbnail: "",
    Dataset: "",
    Keywords: "",
    Owner: "",
    Type: "",
    Data: [],
    Status: "",
  };
  const pathname = window.location.pathname.split("/")[5];
  const [body, setBody] = useState(template);
  const [msg, setMsg] = useState(null);
  const [basemap, setBasemap] = useState(new TileLayer({ title: "Basemap" }));
  const [ke_counties, setke_counties] = useState(
    new TileLayer({ title: "Kenya Counties" })
  );
  const [map, setMap] = useState(null);
  const [dataSelector, setDataSelector] = useState(null);
  const [styleSelector, setStyleSelector] = useState(null);
  const mapElement = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(3);
  const [querySelector, setQuerySelector] = useState(null);
  const [baseSelector, setBaseSelector] = useState(null);
  const [extent, setExtent] = useState([
    4153378.2713831086, -194668.47203224793, 4183418.0234991824,
    -175024.15576295764,
  ]);
  const [pChartImgUrl, setPChartImgUrl] = useState();
  const [bChartImgUrl, setBChartImgUrl] = useState();

  useEffect(() => {
    basemap.setSource(
      new XYZ({
        url: myData[4].url,
        crossOrigin: "anonymous",
      })
    );

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
          layer: `KSA_Rasters:Kenya_Counties`,
          matrixSet: "EPSG:4326",
        });

        ke_counties.setSource(new WMTS(options));
      })
      .catch((e) => {});

    const initialMap = new Map({
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: extent,
        }),
        new ScaleLine({
          units: "metric",
          bar: true,
          text: "Scale",
        }),
      ]),
      target: mapElement.current,
      layers: [basemap, ke_counties],
      renderer: "canvas",
      view: new View({
        projection: "EPSG:3857",
        center: fromLonLat([37.44535766141879, -1.6602702925857802]),
        zoom: 12,
      }),
    });

    initialMap?.on("moveend", function (e) {});

    initialMap?.on("singleclick", function (event) {
      initialMap.forEachFeatureAtPixel(
        event.pixel,
        function (feature, layer) {}
      );
    });
    setExtent(initialMap.getView().calculateExtent(initialMap.getSize()));
    setMap(initialMap);
  }, []);

  useEffect(() => {
    if (map) {
      fetch(`/api/data/${pathname}`, {
        method: "get",
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let d = data;
          d.Data = JSON.parse(d.Data);
          setBody(d);
        })
        .catch((err) => {});
    }
  }, [map]);

  useEffect(() => {
    if (body?.Data?.length > 0) {
      body.Data.map((item) => {
        loadData(item);
      });
    }
  }, [body?.Data?.length]);

  function loadData(item) {
    setIsLoading(true);
    var response = $.ajax({
      url: encodeURI(getUrl(item.url)),
      dataType: "json",
      success: {},
      error: function (xhr) {
        setIsLoading(false);
      },
    });
    $.when(response).done(function (data) {
      setIsLoading(false);
      if (data.features.length !== 0) {
        const vector = new VectorLayer({
          title: item.url.split(":")[1],
          source: new VectorSource({
            features: new GeoJSON({}).readFeatures(data, {
              featureProjection: map.getView().getProjection(),
            }),
          }),
        });
        setExtent(vector.getSource().getExtent());
        map.getView().fit(vector.getSource().getExtent(), {
          padding: [50, 50, 50, 50],
        });
        if (item.style.type === "Basic") {
          vector.setStyle(fillStyle(vector, item.style));
        } else if (item.style.type === "Unique") {
          vector.setStyle(uniqueStyle(vector, item.style));
        } else if (item.style.type === "Range") {
          vector.setStyle(rangeStyle(vector, item.style));
        }
        map.addLayer(vector);
      }
    });
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

  function getUrl(url, filters) {
    if (!filters) {
      return `/geoserver/${
        url.split(":")[0]
      }/wfs?request=GetFeature&version=1.0.0&typeName=${url}&outputFormat=json`;
    } else {
      return `/geoserver/${
        url.split(":")[0]
      }/wfs?request=GetFeature&version=1.0.0&typeName=${url}&${filters}&outputFormat=json`;
    }
  }

  const printMap = () => {
    map.once("rendercomplete", function () {
      const mapCanvas = document.createElement("canvas");
      const size = map.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        map.getViewport().querySelectorAll(".ol-layer canvas, canvas.ol-layer"),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity =
              canvas.parentNode.style.opacity || canvas.style.opacity;
            mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
            let matrix;
            const transform = canvas.style.transform;
            if (transform) {
              // Get the transform parameters from the style's transform matrix
              matrix = transform
                .match(/^matrix\(([^\(]*)\)$/)[1]
                .split(",")
                .map(Number);
            } else {
              matrix = [
                parseFloat(canvas.style.width) / canvas.width,
                0,
                0,
                parseFloat(canvas.style.height) / canvas.height,
                0,
                0,
              ];
            }
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            const backgroundColor = canvas.parentNode.style.backgroundColor;
            if (backgroundColor) {
              mapContext.fillStyle = backgroundColor;
              mapContext.fillRect(0, 0, canvas.width, canvas.height);
            }
            mapContext.drawImage(canvas, 0, 0);
          }
        }
      );
      mapContext.globalAlpha = 1;
      mapContext.setTransform(1, 0, 0, 1, 0, 0);

      var link = document.createElement("a");
      link.setAttribute("href", mapCanvas.toDataURL());
      link.setAttribute("download", "map.png");
      document.body.appendChild(link);
      link.click();
    });
    map.renderSync();
  };

  return (
    <div>
      <div className="map">
        <div
          ref={mapElement}
          style={{ width: "100%", height: "90vh" }}
          id="map"
        ></div>
        {isLoading && <RippleLoading />}
        <div
          onClick={() => {
            setBaseSelector(true);
          }}
          className="base_selector"
        >
          <i className="fa fa-map"></i>
        </div>
        <div className="download">
          <div>
            <a
              onClick={() => {
                printMap();
              }}
              role="button"
            >
              <i className="fa fa-camera"></i> Screenshot
            </a>
          </div>
        </div>
        {baseSelector && (
          <Basemaps
            setBaseSelector={setBaseSelector}
            basemap={basemap}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        {body && (
          <RightPanel
            map={map}
            body={body}
            pChartImgUrl={pChartImgUrl}
            setPChartImgUrl={setPChartImgUrl}
            bChartImgUrl={bChartImgUrl}
            setBChartImgUrl={setBChartImgUrl}
          />
        )}
        <TopPanel
          dataSelector={dataSelector}
          setDataSelector={setDataSelector}
          setStyleSelector={setStyleSelector}
          setQuerySelector={setQuerySelector}
          preview={true}
        />
        {dataSelector && (
          <Data
            map={map}
            setIsLoading={setIsLoading}
            setDataSelector={setDataSelector}
            setExtent={setExtent}
            body={body}
            setBody={setBody}
          />
        )}
        {querySelector && body && map && (
          <Query
            map={map}
            setIsLoading={setIsLoading}
            setQuerySelector={setQuerySelector}
            setExtent={setExtent}
            body={body}
            setBody={setBody}
          />
        )}
        {styleSelector && (
          <MyStyler
            map={map}
            setStyleSelector={setStyleSelector}
            body={body}
            setBody={setBody}
          />
        )}
      </div>
      <div className="attribute">
        <PreviewData body={body} />
      </div>
      {msg && <AlertMsg msg={msg} setMsg={setMsg} />}
    </div>
  );
}
