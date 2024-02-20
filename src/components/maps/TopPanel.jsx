import { useEffect } from "react";
import { useState } from "react";
import Charts from "./SidePanel/Charts";
import Data from "./SidePanel/Data";
import DataTopo from "./SidePanel/DataTopo";
import Export from "./SidePanel/Export";
import Layers from "./SidePanel/Layers";
import Metadata from "./SidePanel/Metadata";
import Bar from "./SidePanel/Others/Bar";
import MyStyler from "./SidePanel/Topo/MyStyler";
import Styles from "./SidePanel/Topo/Styles";

export default function TopPanel(props) {
  const [selected, setSelected] = useState("Add Data");

  return (
    <div className="top_panel">
      <Item
        txt="Add Data"
        icon="fa-database"
        selected={selected}
        setSelected={setSelected}
        openPopup={() => {
          props.setDataSelector(true);
          props.setStyleSelector(null);
          props.setQuerySelector(null);
        }}
      />
      {props.category !== "BaseMap" && (
        <Item
          txt="Style Data"
          icon="fa-map"
          selected={selected}
          setSelected={setSelected}
          openPopup={() => {
            props.setDataSelector(null);
            props.setStyleSelector(true);
            props.setQuerySelector(null);
          }}
        />
      )}
      {props.category !== "BaseMap" && (
        <Item
          txt="Query"
          icon="fa-search"
          selected={selected}
          setSelected={setSelected}
          openPopup={() => {
            props.setQuerySelector(true);
            props.setStyleSelector(null);
            props.setDataSelector(null);
          }}
        />
      )}
    </div>
  );
}

const Item = (props) => {
  return (
    <p
      onClick={() => {
        props.openPopup();
        props.setSelected(props.txt);
      }}
      className={props.txt === props.selected ? "active" : ""}
    >
      <i className={"fa " + props.icon}></i> {props.txt}
    </p>
  );
};
