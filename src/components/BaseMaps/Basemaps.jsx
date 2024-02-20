import XYZ from "ol/source/XYZ";
import { useEffect } from "react";
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
      <div
        onClick={() => {
          params.setSelected(params.index);
        }}
        className={params.selected === params.index ? "active" : "item "}
      >
        <img src={params.image} alt="" />
        <p>{params.label}</p>
      </div>
    );
  };

  return (
    <div className="layers">
      <div className="cont">
        <i
          onClick={() => {
            props.setBaseSelector(null);
          }}
          className="fa fa-close"
        >
          &#xf00d;
        </i>
        <div className="basemaps">
          {myData.map((item, index) => {
            return (
              <Basemap
                key={index}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
