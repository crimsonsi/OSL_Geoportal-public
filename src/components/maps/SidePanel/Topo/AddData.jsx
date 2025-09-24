import { useEffect, useState } from "react";
import Button from "../../../Utils/ButtonMain";
import MyError from "../../../Utils/MyError";
import Select from "../../../Utils/SelectMain";

export default function AddData(props) {
  const [workspaces, setWorkspaces] = useState(null);
  const [layers, setLayers] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: `Basic ${Buffer.from("admin:geoserver", "utf-8").toString(
        "base64"
      )}`,
    };
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
      const headers = {
        Authorization: `Basic ${Buffer.from(
          "admin:geoserver",
          "utf-8"
        ).toString("base64")}`,
      };
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
            setSelectedLayer(list[0]);
          }
        })
        .catch((e) => {});
    }
  }, [selected]);

  const getSelected = (value) => {
    setSelected(value);
  };

  const getSelectedLayer = (value) => {
    setSelectedLayer(value);
  };

  const addData = () => {
    let d = props.body;
    d.data.url.push(`${selected}:${selectedLayer}`);
    props.updateBody(d);
  };

  return (
    <>
      <p>Load data from GeoServer</p>
      <div className="div2equal">
        {workspaces && (
          <Select
            data={workspaces}
            getSelected={getSelected}
            label="Select Workspace"
          />
        )}
        {layers && (
          <Select
            data={layers}
            getSelected={getSelectedLayer}
            label="Select Layer"
          />
        )}
      </div>
      {workspaces ? (
        <>
          <div className="layers">
            <h5>Selected Workspace: {selected}</h5>
            {layers ? (
              <h5>Selected Layer: {selectedLayer}</h5>
            ) : (
              <h5>Oops! this workspace does not contain any layers</h5>
            )}
          </div>
          {selectedLayer && <Button label="Add to Map" handleClick={addData} />}

          <h4
            onClick={() => {
              props.toggleShowing();
            }}
          >
            Back to List
          </h4>
        </>
      ) : (
        <MyError txt="Ooops we could not find any workspace in your GeoServer" />
      )}
    </>
  );
}
