import React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./BasicDatePicker.module.scss";

const BasicDatePicker = ({ value = new Date(), label = "" }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            className={styles.textFieldStyle}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
