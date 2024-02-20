import { useEffect } from "react";
import { useState } from "react";
import Charts from "./SidePanel/Charts";
import Export from "./SidePanel/Export";
import Metadata from "./SidePanel/Metadata";
import { useMediaQuery } from "@material-ui/core";

export default function RightPanel(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Layers");

  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 641px) and (max-width: 1024px)"
  );
  const isLargeScreen = useMediaQuery("(min-width: 1025px)");


  useEffect(() => {
    isSmallScreen && setCollapsed(true);
  }, [isSmallScreen]);

  return (
    <div className="right_panel">
      <div className="outer">
        <i
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className={collapsed ? "fa fa-angle-left" : "fa fa-angle-right"}
        ></i>

        <div
          data-aos={collapsed ? "fade-right" : "fade-right"}
          className="collapsible"
        >
          {!collapsed && (
            <>
              <div className={props.category !== "BaseMap" ? "bar4" : "bar3"}>
                <Item
                  txt="Layers"
                  active={active}
                  setCollapsed={setCollapsed}
                  collapsed={collapsed}
                  setActive={setActive}
                />
                {props.category !== "BaseMap" && (
                  <Item
                    txt="Analysis"
                    active={active}
                    setCollapsed={setCollapsed}
                    collapsed={collapsed}
                    setActive={setActive}
                  />
                )}
                <Item
                  txt="Export"
                  setCollapsed={setCollapsed}
                  collapsed={collapsed}
                  active={active}
                  setActive={setActive}
                />
                <Item
                  txt="Metadata"
                  setCollapsed={setCollapsed}
                  collapsed={collapsed}
                  active={active}
                  setActive={setActive}
                />
              </div>
              {active === "Layers" && props.map && props.body && (
                <Layers
                  map={props.map}
                  body={props.body}
                  setBody={props.setBody}
                />
              )}
              {active === "Analysis" && (
                <Charts
                  body={props.body?.Data[0]}
                  updateBody={props.updateBody}
                  pChartImgUrl={props.pChartImgUrl}
                  setPChartImgUrl={props.setPChartImgUrl}
                  bChartImgUrl={props.bChartImgUrl}
                  setBChartImgUrl={props.setBChartImgUrl}
                />
              )}
              {active === "Export" && props.body && (
                <Export
                  body={props.body}
                  updateBody={props.updateBody}
                  instanceId={props.instanceId}
                  instance={props.body}
                  map={props.map}
                  setIsLoading={props.setIsLoading}
                  pChartImgUrl={props.pChartImgUrl}
                  setPChartImgUrl={props.setPChartImgUrl}
                  bChartImgUrl={props.bChartImgUrl}
                  setBChartImgUrl={props.setBChartImgUrl}
                />
              )}
              {active === "Metadata" && (
                <Metadata body={props.body} updateBody={props.updateBody} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const Item = (props) => {
  return (
    <p
      onClick={() => {
        if (props.txt === props.active) {
          props.setCollapsed(!props.collapsed);
        } else props.setCollapsed(false);
        props.setActive(props.txt);
      }}
      className={props.txt === props.active ? "active" : ""}
    >
      {props.txt}
    </p>
  );
};

const Layers = (props) => {
  const [layrs, setLayrs] = useState([]);

  useEffect(() => {
    if (props.map.getAllLayers().length !== layrs.length) {
      let d = [];
      props.map.getAllLayers()?.map((item, i) => {
        d.push({
          title: item.get("title"),
          index: i,
          checked: item.getVisible(),
        });
      });
      setLayrs(d);
    }
  }, [props.map, props.map.getAllLayers(), layrs]);

  function togglelayer(index, oldIndex) {
    if (props.map) {
      if (props.body.Data.length > 1) {
        let x = array_move(props.body.Data, index, oldIndex);
        let xd = props.body;
        xd.Data = x;
        props.setBody(xd);
      }
      let d = array_move(props.map.getAllLayers(), index, oldIndex);
      setLayrs([]);

      props.map.getAllLayers().map((layer) => {
        props.map.removeLayer(layer);
      });
      d.map((layer) => {
        props.map.addLayer(layer);
      });
    }
  }

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  const Layer = (params) => {
    const [checked, setChecked] = useState(params.item.checked);
    const [data, setData] = useState([]);
    const [column, setColumn] = useState(null);

    useEffect(() => {
      if (params.item.title !== "Basemap") {
        const i = params.body.Data.map((e) => {
          return e?.url?.split(":")[1];
        }).indexOf(params.item.title);
        if (i !== -1) {
          if (params.body.Data[i].style.type === "Basic") {
            setData([
              { name: "Simple Fill", color: params.body.Data[i].style.fill },
            ]);
          } else {
            setData(params.body.Data[i].style.classes);
          }
        }
      }
    }, []);

    return (
      <>
        <div className="item">
          <i
            onClick={() => {
              props.map.getAllLayers().map((layer) => {
                if (layer.get("title") === params.item.title) {
                  setLayrs([]);
                  props.map.removeLayer(layer);
                }
              });
            }}
            className="fa fa-close"
          >
            &#xf00d;
          </i>
          <input
            onChange={(e) => {
              setChecked(e.target.checked);
              params.map
                .getAllLayers()
                [params.item.index].setVisible(e.target.checked);
            }}
            type="checkbox"
            name=""
            id=""
            checked={checked}
          />
          <p>{params.item.title}</p>
          <i
            onClick={() => {
              if (params.item.index !== 0) {
                params.togglelayer(params.item.index, params.item.index - 1);
              }
            }}
            className="fa fa-angle-double-up"
          ></i>
          <i
            onClick={() => {
              if (params.item.index + 1 < params?.map?.getAllLayers()?.length) {
                params.togglelayer(params.item.index, params.item.index + 1);
              }
            }}
            className="fa fa-angle-double-down"
          ></i>
        </div>
        {data?.length > 0 &&
          data.map((item, i) => {
            return <Theme key={i} item={item} body={params.body} />;
          })}
      </>
    );
  };

  const Theme = (params) => {
    return (
      <div className="theme">
        <input
          onChange={(e) => {}}
          value={params.item.color}
          type="color"
          name=""
          id=""
        />
        <p>{params.item.name}</p>
      </div>
    );
  };

  return (
    <div className="r_layers">
      <div>
        <h4>Map Layers</h4>
        <hr />
      </div>
      <div className="scr">
        {layrs.length > 0 &&
          layrs.map((item) => {
            return (
              <Layer
                key={item.index}
                togglelayer={togglelayer}
                item={item}
                map={props.map}
                body={props.body}
              />
            );
          })}
      </div>
    </div>
  );
};
