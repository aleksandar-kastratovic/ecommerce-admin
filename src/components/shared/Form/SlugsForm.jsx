import React from "react";
import TextBox from "../TextBox/TextBox";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const SlugsForm = ({
  onChangeHandler = () => {},
  error = "",
  type,
  name,
  slug,
  description,
  value,
}) => {
  // In case we decide to use only slugs
  // In that case, the component will need additional on this
  // required bool
  // sortable bool
  // editable bool
  // disabled bool
  // ui_prop / icon string aligned with frontend
  let formItem = null;

  switch (type) {
    case "string":
      formItem = (
        <TextBox
          name={slug}
          label={name}
          // required={required}
          description={description}
          value={value}
          // error={error}
          onChange={onChangeHandler}
        />
      );
      break;

    default:
      formItem = null;
  }

  return formItem;
};

export default SlugsForm;
