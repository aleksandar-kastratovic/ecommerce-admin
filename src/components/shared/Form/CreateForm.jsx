import React, { useState } from "react";
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
import InputMultipleImages from "../InputMultipleImages/InputMultipleImages";

const CreateForm = ({
  item = {},
  onChangeHandler = () => {},
  onImageUpload = () => {},
  // TODO remove onImagePreview
  onImagePreview = () => {},
  onOpenImageDialog = () => {},
  value = "",
  error = "",
  disabled = false,
}) => {
  // depending on input type in fields you will get a control
  // value is obvious
  // onChangeHandler change handler
  // error is for validations backend and frontend

  const [inputValue, setInputValue] = useState(value);
  const onInputChangeHandler = (event) => {
    onChangeHandler(event);
    setInputValue(event.target.value);
  };

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
            disabled={disabled}
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
              required={
                typeof item.required === "number"
                  ? item.required === 1
                  : item.required
              }
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
              disabled={disabled}
            />
          );
          break;
        case "image_upload":
          formItem = (
            <ImageUpload
              name={item.prop_name}
              label={item.field_name}
              required={
                typeof item.required === "number"
                  ? item.required === 1
                  : item.required
              }
              description={item.description}
              value={value}
              error={error}
              onImageUpload={onImageUpload}
              onImagePreview={onImagePreview}
              disabled={disabled}
            />
          );
          break;
        case "image_button":
          formItem = (
            <ImageButton
              name={item.prop_name}
              label={item.field_name}
              required={
                typeof item.required === "number"
                  ? item.required === 1
                  : item.required
              }
              description={item.description}
              value={value}
              error={error}
              onImageUpload={onImageUpload}
              onOpenImageDialog={onOpenImageDialog}
              disabled={disabled}
            />
          );
          break;
        case "checkbox":
          formItem = (
            <FormControlLabel
              control={<Checkbox disabled={disabled} />}
              label={item.field_name}
            />
          );
          break;
        case "radio":
          formItem = (
            <FormControlLabel
              value=""
              control={<Radio disabled={disabled} />}
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
                  checked={
                    typeof value === "string"
                      ? true
                      : typeof value === "number"
                      ? value === 1
                      : value
                  }
                  onChange={(e) => onChangeHandler(e, "switch")}
                  disabled={disabled}
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
              <FormLabel
                required={
                  typeof item.required === "number"
                    ? item.required === 1
                    : item.required
                }
                disabled={disabled}
              >
                {item.field_name}
              </FormLabel>
              <Select
                labelId={`select-label-${item.field_name}`}
                id={`select-label-${item.field_name}`}
                name={item.prop_name}
                value={inputValue}
                label={item.field_name}
                onChange={onInputChangeHandler}
                disabled={disabled}
              >
                {Array.isArray(item.options) &&
                  item.options.map((itemUnit, index) => (
                    <MenuItem
                      key={itemUnit.id}
                      value={itemUnit.id}
                      selected={itemUnit.id === inputValue}
                    >
                      {itemUnit.name}
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
              disabled={disabled}
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
              disabled={disabled}
            />
          );
          break;
        case "MultipleImages":
          formItem = (
            <InputMultipleImages
              list={Array.isArray(value) ? value : []}
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
