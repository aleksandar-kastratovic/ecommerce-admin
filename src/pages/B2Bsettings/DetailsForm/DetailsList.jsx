import React, { useState } from "react";

// material-ui components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Icon from "@mui/material/Icon";

const LeftColum = ({ handleSelectInDetails }) => {
  const [selected, setSelected] = useState(0);
  const handleSelect = (id) => {
    setSelected(id);
    handleSelectInDetails(id);
  };
  // NOTE id id will be from data received from api, this is just for setup
  // NOTE: Icons are dynamic aligned with material ui icons and google icons just a string.
  // More info can be find on link
  // https://fontawesomeicons.com/materialdesign/icons
  const fields = [
    {
      id: 0,
      fieldName: "Osnovne informacije",
      propName: "name",
      inMainTable: true,
      inDetails: true,
      editable: true,
      disabled: false,
      required: true,
      description: "255",
      ui_prop: "settings",
      sortable: true,
      inputType: "input",
    },
    {
      id: 1,
      fieldName: "Strana za prijavu na portal",
      propName: "name",
      inMainTable: true,
      inDetails: true,
      editable: true,
      disabled: false,
      required: true,
      description: "255",
      ui_prop: "login",
      sortable: true,
      inputType: "input",
    },
  ];
  return (
    <List>
      {fields.map((item, index) => (
        <ListItem
          key={item.id}
          disablePadding
          selected={selected === item.id ? true : false}
          onClick={() => handleSelect(item.id)}
        >
          <ListItemButton>
            <ListItemIcon>
              <Icon>{item.ui_prop}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.fieldName} />
            <ChevronRightIcon />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default LeftColum;
