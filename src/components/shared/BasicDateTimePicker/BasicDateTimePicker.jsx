import React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./BasicDateTimePicker.module.scss";

const BasicDateTimePicker = ({
  value = new Date(),
  label = "",
  name = "",
  onChangeHandler = () => {},
}) => {
  const handleChange = (newValue) => {
    const ev = {
      target: {
        name: name,
        value: newValue,
      },
    };
    onChangeHandler(ev);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            className={styles.dateTimePickerStyle}
            {...params}
            // inputProps={{ readOnly: true }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default BasicDateTimePicker;
