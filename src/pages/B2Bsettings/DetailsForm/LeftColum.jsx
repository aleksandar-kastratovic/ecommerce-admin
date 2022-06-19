import React, { useState } from "react";

// material-ui components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const LeftColum = ({ handleSelectInDetails }) => {
  const [selected, setSelected] = useState(0);
  const handleSelect = (id) => {
    setSelected(id);
    handleSelectInDetails(id);
  };
  // redundant should be through configuration this is just an example
  return (
    <List>
      <ListItem
        disablePadding
        selected={selected === 0 ? true : false}
        onClick={() => handleSelect(0)}
        id={0}
      >
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Osnovne informacije" />
          <ChevronRightIcon />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        selected={selected === 1 ? true : false}
        onClick={() => handleSelect(1)}
        id={1}
      >
        <ListItemButton>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Strana za prijavu na portal" />
          <ChevronRightIcon />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default LeftColum;
