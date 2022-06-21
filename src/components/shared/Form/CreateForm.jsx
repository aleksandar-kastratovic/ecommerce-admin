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

const CreateForm = ({
  item = {},
  onChangeHandler = () => {},
  value = "",
  error = "",
}) => {
  // depending on input type in fields you will get a control
  // value is obvious
  // onChangeHandler change handler
  // error is for validations backend and frontend
  let formItem = null;
  if (Array.isArray(item)) {
    formItem = (
      <>
        {item.map((itemUnit, index) => (
          <CreateForm
            item={itemUnit}
            key={itemUnit.propName}
            onChangeHandler={onChangeHandler}
            error={error[index]}
            value={value}
          />
        ))}
      </>
    );
  } else {
    if (item.editable) {
      switch (item.inputType) {
        case "input":
          formItem = (
            <TextBox
              name={item.propName}
              label={item.fieldName}
              required={item.required}
              value={value}
              error={error}
              onChange={onChangeHandler}
            />
          );
          break;
        case "checkbox":
          formItem = (
            <FormControlLabel control={<Checkbox />} label={item.fieldName} />
          );
          break;
        case "radio":
          formItem = (
            <FormControlLabel
              value="male"
              control={<Radio />}
              label={item.fieldName}
            />
          );
          break;
        case "dropdown":
          formItem = (
            <FormControl fullWidth>
              <InputLabel id="select-label">{item.fieldName}</InputLabel>
              <Select labelId="select-label" id="simple-select" label="Age">
                {/* TODO get options through configuration  */}
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          );
          break;
        case "textarea":
          formItem = (
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
            />
          );
          break;

        default:
          formItem = null;
      }
    }
  }
  return formItem;
};

export default CreateForm;
