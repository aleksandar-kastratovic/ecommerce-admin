import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../Button/Button";

import styles from "./ColumnsPicker.module.scss";

const PickerMenu = ({
  anchorEl = null,
  tableFields = [],
  handleConfirm = () => {},
  handleClose = () => {},
}) => {
  const [columnsValues, setColumnsValues] = useState({});

  /* save changed values in state */
  const handleChange = ({ target }) => {
    setColumnsValues({ ...columnsValues, [target.name]: target.checked });
  };

  const onConfirm = () => {
    const repackToSend = tableFields.map((item, index) => {
      const object = {
        ...item,
        in_main_table: columnsValues[item.prop_name],
      };
      return object;
    });
    handleConfirm(repackToSend);
  };

  useEffect(() => {
    const repack = tableFields?.reduce(
      (acc, cur) => ({ ...acc, [cur.prop_name]: cur.in_main_table }),
      {}
    );
    setColumnsValues(repack);
  }, []);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={anchorEl !== null}
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
          <FormLabel component="legend">Odaberi kolone za prikaz</FormLabel>
          <FormGroup>
            {(tableFields ?? []).map((item) => (
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
            <Button variant="contained" label="Odaberi" onClick={onConfirm} />
            <Button variant="outlined" label="Otkaži" onClick={handleClose} />
          </Stack>
        </FormControl>
      </Box>
    </Menu>
  );
};

export default PickerMenu;
