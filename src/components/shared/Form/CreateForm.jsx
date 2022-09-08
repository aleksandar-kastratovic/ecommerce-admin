import React, { useState } from "react";

import ImageUpload from "../ImageUpload/ImageUpload";
import ImageButton from "../ImageButton/ImageButton";
import InputMultipleImages from "../InputMultipleImages/InputMultipleImages";
import { InputCheckbox, InputDate, InputDateTime, InputInput, InputNumber, InputRadio, InputSelect, InputSwitch, InputText } from "./FormInputs/FormInputs";
import FileButton from "../FileButton/FileButton";
import InputMultipleFiles from "../InputMultipleFiles/InputMultipleFiles";

const CreateForm = ({
    item = {},
    onChangeHandler = () => {},
    onImageUpload = () => {},
    // TODO remove onImagePreview
    onImagePreview = () => {},
    onOpenImageDialog = () => {},
    value = "",
    error = null,
    disabled = false,
    queryString = "",
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
                    <CreateForm item={itemUnit} key={itemUnit.prop_name} onChangeHandler={onChangeHandler} error={error[index]} value={value} disabled={disabled} />
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
                            imgWidth={item.dimensions ? item.dimensions.width : 300}
                            imgHeight={item.dimensions ? item.dimensions.height : 200}
                            onImageUpload={onImageUpload}
                            onOpenImageDialog={onOpenImageDialog}
                            disabled={disabled}
                        />
                    );
                    break;
                case "checkbox":
                    formItem = <InputCheckbox name={item.prop_name} value={Boolean(value)} onChange={(e) => onChangeHandler(e, "checkbox")} disabled={disabled} label={item.field_name} />;
                    break;
                case "radio":
                    formItem = <InputRadio name={item.prop_name} value={Boolean(value)} onChange={(e) => onChangeHandler(e, "radio")} disabled={disabled} label={item.field_name} />;
                    break;
                case "switch":
                    formItem = (
                        <InputSwitch
                            label={item.field_name}
                            name={item.prop_name}
                            value={Boolean(value)}
                            onChange={(e) => onChangeHandler(e, "switch")}
                            disabled={disabled}
                            error={error}
                            description={item.description}
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
                            queryString={queryString}
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
                        />
                    );
                    break;
                case "multiple_images": //TODO
                    formItem = <InputMultipleImages list={Array.isArray(value) ? value : []} name={item.prop_name} onChangeHandler={onChangeHandler} />;
                    break;
                case "multiple_files": //TODO
                    formItem = <InputMultipleFiles list={Array.isArray(value) ? value : []} name={item.prop_name} onChangeHandler={onChangeHandler} />;
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
