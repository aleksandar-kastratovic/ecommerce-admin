import React from "react";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";

const TextBox = ({
  name = "",
  label = "",
  value = "",
  description = "",
  required = false,
  width = "100%",
  margin = "0",
  placeholder = "",
  size = "small",
  fontWeight = "normal",
  error = "",
  ui_prop = "",
  onChange = () => { },
}) => {
  // reusable component for input fields
  return (
    <FormControl
      sx={{
        width: width,
        margin: margin,
      }}
    >
      <FormLabel
        required={required}
        sx={{
          fontWeight: fontWeight,
        }}
      >
        {label}
      </FormLabel>
      <TextField
        name={name}
        size={size}
        value={value ? value : ""}
        error={!!error}
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
        // helperText={error.content}
        helperText={error?.content ? error.content : description}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Icon>{ui_prop}</Icon>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default TextBox;
