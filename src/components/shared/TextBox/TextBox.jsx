import React from "react";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

const TextBox = ({
  label = "",
  value = "",
  required = false,
  width = "100%",
  placeholder = "",
  size = "small",
  fontWeight = "normal",
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
        size={size}
        value={value}
        placeholder={placeholder}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
      />
    </FormControl>
  );
};

export default TextBox;
