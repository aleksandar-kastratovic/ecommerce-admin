import React, { useState } from "react";

import ImageUpload from "../ImageUpload/ImageUpload";
import ImageButton from "../ImageButton/ImageButton";
import InputMultipleImages from "../InputMultipleImages/InputMultipleImages";
import {
  InputCheckbox,
  InputDate,
  InputDateTime,
  InputHtml,
  InputInput,
  InputMultiSelect,
  InputNumber,
  InputRadio,
  InputSelect,
  InputSwitch,
  InputText,
  AutocompleteInput,
  AutocompleteTagsFilled,
} from "./FormInputs/FormInputs";
import FileButton from "../FileButton/FileButton";
import InputMultipleFiles from "../InputMultipleFiles/InputMultipleFiles";

const CreateForm = ({
  item = {},
  onChangeHandler = () => { },
  onImageUpload = () => { },
  onChangeAutoHandler = () => { },
  // TODO remove onImagePreview
  onImagePreview = () => { },
  onOpenImageDialog = () => { },
  value = "",
  error = null,
  disabled = false,
  queryString = "",
  optionsIsEmpty = () => { },
  styleCheckbox,
  autoFocus
}) => {
  // depending on input type in fields you will get a control
  // value is obvious
  // onChangeHandler change handler
  // error is for validations backend and frontend
  value = value === null ? "" : value;

  const onInputChangeHandler = (event) => {
    onChangeHandler(event);
  };

  let formItem = null;
  if (Array.isArray(item)) {
    formItem = (
      <>
        {item.map((itemUnit, index) => (
          <CreateForm item={itemUnit} key={itemUnit.prop_name} onChangeHandler={onChangeHandler} onChangeAutoHandler={onChangeAutoHandler} error={error[index]} value={value} disabled={disabled} />
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
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "image_upload": //TODO
          formItem = (
            <ImageUpload
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onImageUpload={onImageUpload}
              onImagePreview={onImagePreview}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "image_button": //TODO
          formItem = (
            <ImageButton
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              imgWidth={item.dimensions ? item.dimensions.width : 800}
              imgHeight={item.dimensions ? item.dimensions.height : 600}
              onImageUpload={onImageUpload}
              onOpenImageDialog={onOpenImageDialog}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "checkbox":
          formItem = <InputCheckbox styleCheckbox={styleCheckbox} name={item.prop_name} value={Boolean(Number(value))} onChange={(e) => onChangeHandler(e, "checkbox")} disabled={disabled} label={item.field_name} autoFocus={autoFocus} />;
          break;
        case "radio":
          formItem = <InputRadio name={item.prop_name} value={Boolean(Number(value))} onChange={(e) => onChangeHandler(e, "radio")} disabled={disabled} label={item.field_name} autoFocus={autoFocus} />;
          break;
        case "switch":
          formItem = (
            <InputSwitch
              label={item.field_name}
              name={item.prop_name}
              value={Boolean(Number(value))}
              onChange={(e) => onChangeHandler(e, "switch")}
              disabled={disabled}
              error={error}
              description={item.description}
              autoFocus={autoFocus}
            />
          );
          break;
        case "select":
          formItem = (
            <InputSelect
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              name={item.prop_name}
              disabled={disabled}
              error={error}
              value={value}
              onChange={onInputChangeHandler}
              options={item.options}
              description={item.description}
              fillFromApi={item.fillFromApi}
              usePropName={item.usePropName}
              queryString={item.queryString ?? queryString}
              optionsIsEmpty={optionsIsEmpty}
              autoFocus={autoFocus}
            />
          );
          break;
        case "autocomplete":
          formItem = (
            <AutocompleteInput
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              name={item.prop_name}
              disabled={disabled}
              error={error}
              value={value}
              options={item.options}
              onChange={onChangeAutoHandler}
              description={item.description}
              fillFromApi={item.fillFromApi}
              usePropName={item.usePropName}
              queryString={item?.queryString ?? queryString}
              optionsIsEmpty={optionsIsEmpty}
              autoFocus={autoFocus}
            />
          );
          break;
        case "autocomplete_tags_filled":
          formItem = (
            <AutocompleteTagsFilled
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              name={item.prop_name}
              disabled={disabled}
              error={error}
              value={value}
              options={item.options}
              onChange={onChangeAutoHandler}
              description={item.description}
              fillFromApi={item.fillFromApi}
              usePropName={item.usePropName}
              queryString={queryString}
              optionsIsEmpty={optionsIsEmpty}
              autoFocus={autoFocus}
            />
          );
          break;
        case "multi_select":
          formItem = (
            <InputMultiSelect
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              name={item.prop_name}
              disabled={disabled}
              error={error}
              value={Array.isArray(value) ? value : []}
              onChange={onInputChangeHandler}
              options={item.options}
              description={item.description}
              fillFromApi={item.fillFromApi}
              usePropName={item.usePropName}
              queryString={queryString}
              optionsIsEmpty={optionsIsEmpty}
              autoFocus={autoFocus}
            />
          );
          break;
        case "textarea":
          formItem = (
            <InputText
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "date_time":
          formItem = (
            <InputDateTime
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "date":
          formItem = (
            <InputDate
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "multiple_images": //TODO
          formItem = (
            <InputMultipleImages
              list={Array.isArray(value) ? value : []}
              name={item.prop_name}
              uploadHandler={item?.uploadHandler}
              deleteHandler={item?.deleteHandler}
              handleReorder={item?.handleReorder}
              onChangeHandler={onChangeHandler}
              autoFocus={autoFocus}
            />
          );
          break;
        case "multiple_files": //TODO
          formItem = <InputMultipleFiles list={Array.isArray(value) ? value : []} name={item.prop_name} onChangeHandler={onChangeHandler} autoFocus={autoFocus} />;
          break;
        case "file_button":
          formItem = (
            <FileButton
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onImageUpload={onImageUpload}
              onOpenImageDialog={onOpenImageDialog}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "number":
          formItem = (
            <InputNumber
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "html_editor":
          formItem = (
            <InputHtml
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          );
          break;
        case "password":
          formItem = (
            <InputInput
              type="password"
              name={item.prop_name}
              label={item.field_name}
              required={typeof item.required === "number" ? item.required === 1 : item.required}
              description={item.description}
              value={value}
              error={error}
              onChange={onChangeHandler}
              disabled={disabled}
              autoFocus={autoFocus}
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
