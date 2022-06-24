import React from "react";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

const TextBox = ({
  name = "",
  label = "",
  value = "",
  description = "",
  required = false,
  width = "100%",
  placeholder = "",
  size = "small",
  fontWeight = "normal",
  error = "",
  onChange = () => {},
}) => {
  // reusable component for input fields
  return (
    <FormControl
      sx={{
        width: width,
        margin: "0.5rem",
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
        value={value}
        error={!!error}
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
        // helperText={error.content}
        helperText={error.content ? error.content : description}
      />
    </FormControl>
  );
};

export default TextBox;
