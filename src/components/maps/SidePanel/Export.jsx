import { useEffect, useRef, useState } from "react";
import downloadImg from "../../../assets/imgs/download.png";
import MyError from "../../Utils/MyError";
import jsPDF from "jspdf";
import SearchReport from "../../export/SearchReport";
import { renderToStaticMarkup } from "react-dom/server";

const Item = (props) => {
  return (
    <div className="exp" onClick={() => props.handleClick(props.ext)}>
      <img src={downloadImg} alt="" />
      <p>{props.txt}</p>
    </div>
  );
};

export default function Export(props) {
  const [service, setService] = useState("");
  const [error, setError] = useState("");
  const [blob, setBlob] = useState(null);
  const base_url = "https://geoserver-service-ksa.ksa.go.ke";
  const headers = {
    Authorization: `Basic ${Buffer.from("admin:geoserver", "utf-8").toString(
      "base64"
    )}`,
  };

  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "A3",
      unit: "px",
      orientation: "landscape",
    });

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");
    const output = document.createElement("p");
    const staticElement = renderToStaticMarkup(
      <SearchReport body={props.body} blob={blob} />
    );
    output.innerHTML = staticElement;

    doc.html(output, {
      async callback(doc) {
        await doc.save("document");
      },
    });
    populateDownload("pdf");
  };

  useEffect(() => {
    props.map.once("rendercomplete", function () {
      const mapCanvas = document.createElement("canvas");
      const size = props.map.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        props.map
          .getViewport()
          .querySelectorAll(".ol-layer canvas, canvas.ol-layer"),
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
      setBlob(mapCanvas.toDataURL());
    });
    props.map.renderSync();
  }, []);

  const downLoadData = (ext) => {
    setError("");
    if (Array.isArray(props.body.Data)) {
      props.body.Data.forEach(async (item) => {
        await fetch(
          `/api/geoserver/rest/layers/${item.url.split(":")[1]}.json`,
          {
            headers: headers,
          }
        )
          .then((res) => {
            if (res.ok) return res.json();
          })
          .then((data) => {
            if (data?.layer?.type === "RASTER") {
              if (
                ext === "zip" ||
                ext === "json" ||
                ext === "GML2" ||
                ext === "csv" ||
                ext === "WFS"
              ) {
                setError("Unsuported format for this data type");
              } else {
                if (ext === "WMS") {
                  let d = service;
                  d = d + "=> " + base_url + getWms(item.url, ext) + "\n";
                  setService(d);
                } else downLoadImage(item.url, ext);
              }
            } else {
              if (ext === "WFS") {
                let d = service;
                d =
                  d +
                  "=> " +
                  base_url +
                  `/api/geoserver/${
                    item.url.split(":")[0]
                  }/wms?request=GetMap&layers=${item.url}&format=image/png`;
                d = d + "=> " + base_url + getUrl(item.url) + "\n";
                setService(d);
              } else {
                if (
                  ext === "shape-zip" ||
                  ext === "json" ||
                  ext === "GML2" ||
                  ext === "csv" ||
                  ext === "WFS"
                ) {
                  saveData(item.url, ext);
                } else downLoadImage(item.url, ext);
              }
            }
          })
          .catch((e) => {});
        populateDownload(ext);
      });
    } else {
      fetch(
        `/api/geoserver/rest/layers/${
          props.body.Data[0].url.split(":")[1]
        }.json`,
        {
          headers: headers,
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          if (data?.layer?.type === "RASTER") {
            if (
              ext === "shape-zip" ||
              ext === "json" ||
              ext === "GML2" ||
              ext === "CSV" ||
              ext === "WFS"
            ) {
              setError("Unsuported format for this data type");
            } else {
              if (ext === "WMS") {
                let d = service;
                d =
                  d +
                  "=> " +
                  base_url +
                  `/api/geoserver/${
                    props.body.Data[0].url.split(":")[0]
                  }/wms?request=GetMap&layers=${
                    props.body.Data[0].url
                  }&format=image/png`;
                setService(d);
              } else downLoadImage(props.body.Data[0].url, ext);
            }
          } else {
            if (
              ext === "shape-zip" ||
              ext === "json" ||
              ext === "GML2" ||
              ext === "csv" ||
              ext === "WFS"
            ) {
              saveData(props.body.Data[0].url, ext);
            } else downLoadImage(props.body.Data[0].url, ext);
          }
        })
        .catch((e) => {});
    }
  };

  function saveData(str, ext) {
    let url = getUrl(str).slice(0, getUrl(str).length - 4) + ext;
    fetch(url, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        const name =
          ext === "shape-zip"
            ? str.split(":")[1] + ".zip"
            : str.split(":")[1] + "." + ext;
        a.download = name;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();

        a.remove(); //afterwards we remove the element again
      })
      .catch((err) => {});
  }

  const downLoadImage = (s_url, ext) => {
    let url = getWms(s_url, ext);
    fetch(url, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = s_url.split(":")[1];
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      })
      .catch((err) => {});
  };

  function getWms(url, ext) {
    return `/api/geoserver/wms/reflect?layers=${url}&format=image/${ext}&width=800`;
  }

  function getUrl(url) {
    return `/api/geoserver/${
      url.split(":")[0]
    }/wfs?request=GetFeature&version=1.0.0&typeName=${url}&outputFormat=json`;
  }

  function getPDF() {}

  const populateDownload = (ext) => {
    let d = {
      Download: props.body.Dataset,
      Category: props.body.Category,
      Theme: "Thematic Map",
      DownloadID: props.body.ID,
      GeoserverURL: props.body.Data[0].url,
      Type: ext,
      OtherInfo: props.body.Owner,
    };
    fetch(`/api/downloads/create`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("Download not created");
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="s_panel">
      <h4>Export Dataset</h4>
      <hr />
      <p style={{ fontSize: "small" }}>{error}</p>
      {props.body?.Data[0]?.url ? (
        <>
          <h5>Vector Data</h5>
          <Item
            ext="shape-zip"
            handleClick={downLoadData}
            txt="Esri Shapefiles (SHP)"
          />
          <Item
            ext="GML2"
            handleClick={downLoadData}
            txt="Geography Markup Language (GML)"
          />
          <Item
            ext="CSV"
            handleClick={downLoadData}
            txt="Comma Separated Values (CSV)"
          />
          <Item ext="json" handleClick={downLoadData} txt="GeoJSON" />

          <div className="div2equal">
            <div>
              <h5>Web Services</h5>
              <Item ext="WFS" txt="WFS" handleClick={downLoadData} />
              <Item ext="WMS" txt="WMS" handleClick={downLoadData} />
            </div>
            <div>
              <h5>Raster Data</h5>
              <Item ext="tiff" handleClick={downLoadData} txt="GeoTiff" />
              <Item ext="png" handleClick={downLoadData} txt="PNG" />
              <Item ext="jpeg" handleClick={downLoadData} txt="JPEG" />
            </div>
            <div>
              <h5>Reports</h5>
              <Item ext="pdf" handleClick={handleGeneratePdf} txt="PDF" />
            </div>
          </div>
          {service && (
            <div className="link">
              <label>Copy the link below</label>
              <input type="text" value={service} />
            </div>
          )}
        </>
      ) : (
        <MyError txt="Please load some Data first!!!" />
      )}
    </div>
  );
}
