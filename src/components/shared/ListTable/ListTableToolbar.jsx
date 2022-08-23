import { useEffect, useState } from "react";

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

const ListTableToolbar = ({
  showToolbar = false,
  fields = [],
  onColumnsChange = () => {},
  showDatePicker = true,
  onSearch = () => {},
  searchValue = "",
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [columnsValues, setColumnsValues] = useState({});
  const open = Boolean(anchorEl);

  // open menu for selecting columns to display in main table
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    const repack = fields.reduce(
      (acc, cur) => ({ ...acc, [cur.prop_name]: cur.in_main_table }),
      {}
    );
    setColumnsValues(repack);
  };

  // close menu for selecting columns to display in main table
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle change to display in main table
  const handleChange = ({ target }) => {
    setColumnsValues({ ...columnsValues, [target.name]: target.checked });
  };

  // close menu and send filtered columns to parent
  const handleConfirm = () => {
    const repackToSend = fields.map((item, index) => {
      const object = {
        ...item,
        in_main_table: columnsValues[item.prop_name],
      };
      return object;
    });
    onColumnsChange(repackToSend);
    setAnchorEl(null);
  };

  return (
    <Box className={styles.toolBarStyle}>
      {showToolbar && (
        <Toolbar>
          <TextBox
            placeholder="Ključne reci za pretragu"
            ui_prop="search"
            onChange={onSearch}
            value={searchValue}
          />
          {showDatePicker && (
            <>
              <BasicDatePicker label="datum od" />
              <BasicDatePicker label="datum do" />
            </>
          )}
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
              <Box className={styles.formStyle}>
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
                              checked={columnsValues[item.prop_name]}
                              onChange={handleChange}
                              name={item.prop_name}
                            />
                          }
                          label={item.field_name}
                        />
                      ))}
                  </FormGroup>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={handleConfirm}>
                      Odaberi
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                      Otkaži
                    </Button>
                  </Stack>
                </FormControl>
              </Box>
            </Menu>

            <Button
              className={styles.toolbarButtons}
              startIcon={<Icon fontSize="small">{"settings"}</Icon>}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <h1>Kolone</h1>
            </Button>
            <Button
              className={styles.toolbarButtons}
              startIcon={<Icon fontSize="small">{"tune"}</Icon>}
            >
              <h1>Filteri</h1>
            </Button>
          </Box>
        </Toolbar>
      )}
    </Box>
  );
};

export default ListTableToolbar;
