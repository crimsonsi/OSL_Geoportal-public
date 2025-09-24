import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Divider,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Layers as LayersIcon,
  Analytics as AnalyticsIcon,
  FileDownload as FileDownloadIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import Charts from "./SidePanel/Charts";
import Export from "./SidePanel/Export";
import Metadata from "./SidePanel/Metadata";

export default function RightPanel(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(0);
  const theme = useTheme();

  const tabs = [
    { label: "Layers", icon: <LayersIcon />, value: 0 },
    ...(props.category !== "BaseMap" 
      ? [{ label: "Analysis", icon: <AnalyticsIcon />, value: 1 }] 
      : []
    ),
    { label: "Export", icon: <FileDownloadIcon />, value: props.category !== "BaseMap" ? 2 : 1 },
    { label: "Metadata", icon: <InfoIcon />, value: props.category !== "BaseMap" ? 3 : 2 },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <IconButton
        onClick={() => setCollapsed(!collapsed)}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
          mr: collapsed ? 0 : 1,
          mt: 1,
        }}
      >
        {collapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      {!collapsed && (
        <Paper
          elevation={3}
          sx={{
            width: 320,
            maxHeight: "calc(100vh - 32px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Tabs
            value={active}
            onChange={(e, newValue) => setActive(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              minHeight: 48,
              "& .MuiTab-root": {
                minHeight: 48,
                fontSize: "0.75rem",
                minWidth: "auto",
                px: 1,
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                value={tab.value}
              />
            ))}
          </Tabs>

          <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            {active === 0 && props.map && props.body && (
              <Layers
                map={props.map}
                body={props.body}
                setBody={props.setBody}
              />
            )}
            {active === 1 && props.category !== "BaseMap" && (
              <Charts
                body={props.body?.Data[0]}
                updateBody={props.updateBody}
                pChartImgUrl={props.pChartImgUrl}
                setPChartImgUrl={props.setPChartImgUrl}
                bChartImgUrl={props.bChartImgUrl}
                setBChartImgUrl={props.setBChartImgUrl}
              />
            )}
            {((active === 2 && props.category !== "BaseMap") || (active === 1 && props.category === "BaseMap")) && props.body && (
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
            {((active === 3 && props.category !== "BaseMap") || (active === 2 && props.category === "BaseMap")) && (
              <Metadata body={props.body} updateBody={props.updateBody} />
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}

const Layers = (props) => {
  const [layrs, setLayrs] = useState([]);
  const theme = useTheme();

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
      <Box sx={{ mb: 2 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 1.5,
            backgroundColor: theme.palette.grey[50],
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Remove layer">
              <IconButton
                size="small"
                onClick={() => {
                  props.map.getAllLayers().map((layer) => {
                    if (layer.get("title") === params.item.title) {
                      setLayrs([]);
                      props.map.removeLayer(layer);
                    }
                  });
                }}
                sx={{ color: theme.palette.error.main }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    params.map
                      .getAllLayers()
                      [params.item.index].setVisible(e.target.checked);
                  }}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {params.item.title}
                </Typography>
              }
              sx={{ flex: 1, mr: 0 }}
            />

            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip title="Move up">
                <IconButton
                  size="small"
                  onClick={() => {
                    if (params.item.index !== 0) {
                      params.togglelayer(params.item.index, params.item.index - 1);
                    }
                  }}
                  disabled={params.item.index === 0}
                >
                  <KeyboardArrowUpIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Move down">
                <IconButton
                  size="small"
                  onClick={() => {
                    if (params.item.index + 1 < params?.map?.getAllLayers()?.length) {
                      params.togglelayer(params.item.index, params.item.index + 1);
                    }
                  }}
                  disabled={params.item.index + 1 >= params?.map?.getAllLayers()?.length}
                >
                  <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {data?.length > 0 && (
            <Box sx={{ mt: 1, pl: 1 }}>
              {data.map((item, i) => (
                <Theme key={i} item={item} body={params.body} />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    );
  };

  const Theme = (params) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          py: 0.5,
        }}
      >
        <Box
          component="input"
          type="color"
          value={params.item.color}
          onChange={() => {}}
          sx={{
            width: 24,
            height: 24,
            border: "none",
            borderRadius: 1,
            cursor: "pointer",
          }}
        />
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {params.item.name}
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Map Layers
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
        {layrs.length > 0 &&
          layrs.map((item) => (
            <Layer
              key={item.index}
              togglelayer={togglelayer}
              item={item}
              map={props.map}
              body={props.body}
            />
          ))}
      </Box>
    </Box>
  );
};
