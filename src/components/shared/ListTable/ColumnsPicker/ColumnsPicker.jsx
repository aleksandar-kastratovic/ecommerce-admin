import { useState } from "react";
import Icon from "@mui/material/Icon";
import PickerMenu from "./PickerMenu";

import styles from "./ColumnsPicker.module.scss";
import Button from "../../Button/Button";

const ColumnsPicker = ({ tableFields = [], onChange = () => {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  /* open menu */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /* close menu */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* pass changed values to parent element */
  const handleConfirm = (data) => {
    onChange(data);
    setAnchorEl(null);
  };

  return (
    <>
      <PickerMenu
        anchorEl={anchorEl}
        tableFields={tableFields}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />
      <Button icon="settings" label="Kolone" onClick={handleClick} />
    </>
  );
};

export default ColumnsPicker;
