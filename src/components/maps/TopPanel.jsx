import { useState } from "react";
import {
  Box,
  Paper,
  Button,
  ButtonGroup,
  useTheme,
} from "@mui/material";
import {
  Storage as StorageIcon,
  Palette as PaletteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

export default function TopPanel(props) {
  const [selected, setSelected] = useState("Add Data");
  const theme = useTheme();

  const buttons = [
    {
      txt: "Add Data",
      icon: <StorageIcon />,
      action: () => {
        props.setDataSelector(true);
        props.setStyleSelector(null);
        props.setQuerySelector(null);
      },
    },
    ...(props.category !== "BaseMap"
      ? [
          {
            txt: "Style Data",
            icon: <PaletteIcon />,
            action: () => {
              props.setDataSelector(null);
              props.setStyleSelector(true);
              props.setQuerySelector(null);
            },
          },
          {
            txt: "Query",
            icon: <SearchIcon />,
            action: () => {
              props.setQuerySelector(true);
              props.setStyleSelector(null);
              props.setDataSelector(null);
            },
          },
        ]
      : []),
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        left: 60,
        zIndex: 1000,
      }}
    >
      <Paper elevation={3}>
        <ButtonGroup
          orientation="horizontal"
          variant="contained"
          sx={{
            "& .MuiButton-root": {
              px: 2,
              py: 1,
              minWidth: 120,
              textTransform: "none",
              fontWeight: 500,
            },
          }}
        >
          {buttons.map((button) => (
            <Button
              key={button.txt}
              startIcon={button.icon}
              onClick={() => {
                button.action();
                setSelected(button.txt);
              }}
              variant={selected === button.txt ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  selected === button.txt
                    ? theme.palette.primary.main
                    : "rgba(255, 255, 255, 0.9)",
                color:
                  selected === button.txt
                    ? "white"
                    : theme.palette.primary.main,
                "&:hover": {
                  backgroundColor:
                    selected === button.txt
                      ? theme.palette.primary.dark
                      : "rgba(255, 255, 255, 1)",
                },
              }}
            >
              {button.txt}
            </Button>
          ))}
        </ButtonGroup>
      </Paper>
    </Box>
  );
}
