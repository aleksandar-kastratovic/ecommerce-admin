import React from "react";
import TextBox from "../TextBox/TextBox";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Switch from "@mui/material/Switch";

import ImageUpload from "../ImageUpload/ImageUpload";
import BasicDateTimePicker from "../BasicDateTimePicker/BasicDateTimePicker";
import ImageButton from "../ImageButton/ImageButton";

const CreateForm = ({
  item = {},
  onChangeHandler = () => {},
  onImageUpload = () => {},
  onImagePreview = () => {},
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
            key={itemUnit.prop_name}
            onChangeHandler={onChangeHandler}
            error={error[index]}
            value={value}
          />
        ))}
      </>
    );
  } else {
    if (item.editable) {
      switch (item.input_type) {
        case "input":
          formItem = (
            <TextBox
              name={item.prop_name}
              label={item.field_name}
              required={item.required}
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
            />
          );
          break;
        case "image_upload":
          formItem = (
            <ImageUpload
              name={item.prop_name}
              label={item.field_name}
              required={item.required}
              description={item.description}
              value={value}
              error={error}
              onImageUpload={onImageUpload}
              onImagePreview={onImagePreview}
            />
          );
          break;
        case "image_button":
          formItem = (
            <ImageButton
              name={item.prop_name}
              label={item.field_name}
              required={item.required}
              description={item.description}
              value={value}
              error={error}
              onImageUpload={onImageUpload}
              onImagePreview={onImagePreview}
            />
          );
          break;
        case "checkbox":
          formItem = (
            <FormControlLabel control={<Checkbox />} label={item.field_name} />
          );
          break;
        case "radio":
          formItem = (
            <FormControlLabel
              value=""
              control={<Radio />}
              label={item.field_name}
            />
          );
          break;
        case "switch":
          formItem = (
            <FormControlLabel
              sx={{ ml: "0rem" }}
              control={
                <Switch
                  name={item.prop_name}
                  checked={typeof value === "string" ? true : value}
                  onChange={(e) => onChangeHandler(e, "switch")}
                />
              }
              label={item.field_name}
            />
          );
          break;
        case "select":
          formItem = (
            <FormControl
              fullWidth
              size="small"
              sx={{ ml: "0.5rem", mt: "0.5rem" }}
            >
              <FormLabel required={item.required}>{item.field_name}</FormLabel>
              <Select
                labelId={`select-label-${item.field_name}`}
                id={`select-label-${item.field_name}`}
                value={value}
                label={item.field_name}
                onChange={onChangeHandler}
              >
                {item.options.map((itemUnit, index) => (
                  <MenuItem key={itemUnit} value={itemUnit}>
                    {itemUnit}
                  </MenuItem>
                ))}
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
        case "date_time":
          formItem = (
            <BasicDateTimePicker
              value={value}
              label={item.field_name}
              name={item.prop_name}
              onChangeHandler={onChangeHandler}
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
