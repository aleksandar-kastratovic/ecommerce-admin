import { useState } from "react";

// material-ui components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextBox from "../TextBox/TextBox";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

// other imports
import styles from "./ListTableToolbar.module.scss";

const ListTableToolbar = ({ showToolbar = false, fields = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // open menu for selecting columns to display in main table
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // close menu for selecting columns to display in main table
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle change to display in main table
  const handleChange = (e) => {
    // TODO use porperty in_main_table from fields
  };

  return (
    <Box className={styles.toolBarStyle}>
      {showToolbar && (
        <Toolbar>
          <TextBox placeholder="Kljucne reci za pretragu" ui_prop="search" />
          <BasicDatePicker label="datum od" />
          <BasicDatePicker label="datum do" />
          <Box className={styles.toolbarButtonsGroup}>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <FormControl
                  className={styles.formControl}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">
                    Odaberi kolone za prikaz
                  </FormLabel>
                  <FormGroup>
                    {fields &&
                      fields.map((item, index) => (
                        <FormControlLabel
                          key={item.prop_name}
                          control={
                            <Checkbox
                              // checked={checked}
                              onChange={handleChange}
                              name={item.prop_name}
                            />
                          }
                          label={item.field_name}
                        />
                      ))}
                  </FormGroup>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained">Odaberi</Button>
                    <Button variant="outlined" onClick={handleClose}>
                      Otkazi
                    </Button>
                  </Stack>
                </FormControl>
              </Box>
            </Menu>

            <Button
              className={styles.toolbarButtons}
              startIcon={<Icon>{"settings"}</Icon>}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
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
