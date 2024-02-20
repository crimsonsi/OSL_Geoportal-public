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

export default function TitlePanel(props) {
  const [selected, setSelected] = useState("Add Data");

  return (
    <div className="title_panel">
      <h3>{props.title}</h3>
    </div>
  );
}
