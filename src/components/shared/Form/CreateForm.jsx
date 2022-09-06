import React, { useState } from "react";

import ImageUpload from "../ImageUpload/ImageUpload";
import ImageButton from "../ImageButton/ImageButton";
import InputMultipleImages from "../InputMultipleImages/InputMultipleImages";
import {
  InputCheckbox,
  InputDate,
  InputDateTime,
  InputInput,
  InputRadio,
  InputSelect,
  InputSwitch,
  InputText,
} from "./FormInputs/FormInputs";

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
  value = value === null ? "" : value;
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
            <InputInput
              name={item.prop_name}
              label={item.field_name}
              required={
                typeof item.required === "number"
                  ? item.required === 1
                  : item.required
              }
              description={item.description}
              value={value}
              error={error.content}
              onChange={onChangeHandler}
              disabled={disabled}
            />
          );
          break;
        case "image_upload": //TODO
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
        case "image_button": //TODO
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
              imgWidth={item.dimensions ? item.dimensions.width : null}
              imgHeight={item.dimensions ? item.dimensions.height : null}
              onImageUpload={onImageUpload}
              onOpenImageDialog={onOpenImageDialog}
              disabled={disabled}
            />
          );
          break;
        case "checkbox":
          formItem = (
            <InputCheckbox
              name={item.prop_name}
              value={
                typeof value === "string"
                  ? true
                  : typeof value === "number"
                  ? value === 1
                  : value
              }
              onChange={(e) => onChangeHandler(e, "checkbox")}
              disabled={disabled}
              label={item.field_name}
            />
          );
          break;
        case "radio":
          formItem = (
            <InputRadio
              name={item.prop_name}
              value={
                typeof value === "string"
                  ? true
                  : typeof value === "number"
                  ? value === 1
                  : value
              }
              onChange={(e) => onChangeHandler(e, "radio")}
              disabled={disabled}
              label={item.field_name}
            />
          );
          break;
        case "switch":
          formItem = (
            <InputSwitch
              label={item.field_name}
              name={item.prop_name}
              value={
                typeof value === "string"
                  ? true
                  : typeof value === "number"
                  ? value === 1
                  : value
              }
              onChange={(e) => onChangeHandler(e, "switch")}
              disabled={disabled}
            />
          );
          break;
        case "select":
          formItem = (
            <InputSelect
              label={item.field_name}
              required={
                typeof item.required === "number"
                  ? item.required === 1
                  : item.required
              }
              name={item.prop_name}
              disabled={disabled}
              error={error.content}
              value={value}
              onChange={onInputChangeHandler}
              options={item.options}
              description={item.description}
              fillFromApi={item.fillFromApi}
              usePropName={item.usePropName}
            />
          );
          break;
        case "textarea":
          formItem = (
            <InputText
              name={item.prop_name}
              label={item.field_name}
              required={
                typeof item.required === "number"
                  ? item.required === 1
                  : item.required
              }
              description={item.description}
              value={value}
              error={error.content}
              onChange={onChangeHandler}
              disabled={disabled}
            />
          );
          break;
        case "date_time":
          formItem = (
            <InputDateTime
              name={item.prop_name}
              label={item.field_name}
              required={
                typeof item.required === "number"
                  ? item.required === 1
                  : item.required
              }
              description={item.description}
              value={value}
              error={error.content}
              onChange={onChangeHandler}
              disabled={disabled}
            />
          );
          break;
        case "date":
          formItem = (
            <InputDate
              name={item.prop_name}
              label={item.field_name}
              required={
                typeof item.required === "number"
                  ? item.required === 1
                  : item.required
              }
              description={item.description}
              value={value}
              error={error.content}
              onChange={onChangeHandler}
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
