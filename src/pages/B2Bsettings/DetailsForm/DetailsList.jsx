import React, { useState } from "react";

// material-ui components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Icon from "@mui/material/Icon";

import fields from "./DetailsListFields.json";

const LeftColum = ({ handleSelectInDetails }) => {
  const [selected, setSelected] = useState(0);

  // Select in list
  // NOTE id id will be from data received from api, this is just for setup
  const handleSelect = (id) => {
    setSelected(id);
    handleSelectInDetails(id);
  };
  // NOTE: Icons are dynamic aligned with material ui icons and google icons just a string.
  // More info can be find on link
  // https://fontawesomeicons.com/materialdesign/icons
  return (
    <List>
      {fields.map(({ id, field_name, disabled, ui_prop }, index) => (
        <ListItem
          key={id}
          disablePadding
          selected={selected === id ? true : false}
          onClick={() => handleSelect(id)}
          disabled={disabled}
        >
          <ListItemButton>
            <ListItemIcon>
              <Icon>{ui_prop}</Icon>
            </ListItemIcon>
            <ListItemText primary={field_name} />
            <ChevronRightIcon />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default LeftColum;
