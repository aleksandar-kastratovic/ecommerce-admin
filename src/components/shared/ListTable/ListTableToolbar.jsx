import React from "react";

// material-ui components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextBox from "../TextBox/TextBox";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import Icon from "@mui/material/Icon";

// other imports
import styles from "./ListTableToolbar.module.scss";

const ListTableToolbar = ({ showToolbar = false }) => {
  return (
    <Box className={styles.toolBarStyle}>
      {showToolbar && (
        <Toolbar>
          <TextBox placeholder="Kljucne reci za pretragu" ui_prop="search" />
          <BasicDatePicker label="datum od" />
          <BasicDatePicker label="datum do" />
          <Box className={styles.toolbarButtonsGroup}>
            <Button
              className={styles.toolbarButtons}
              startIcon={<Icon>{"settings"}</Icon>}
            >
              Kolone
            </Button>
            <Button
              className={styles.toolbarButtons}
              startIcon={<Icon>{"tune"}</Icon>}
            >
              Filteri
            </Button>
          </Box>
        </Toolbar>
      )}
    </Box>
  );
};

export default ListTableToolbar;
