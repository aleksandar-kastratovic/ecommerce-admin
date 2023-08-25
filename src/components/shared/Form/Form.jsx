import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "../Button/Button";
import CreateForm from "./CreateForm";
import Buttons from "./Buttons/Buttons";
import { formatDate, formatDateTime } from "../../../helpers/dateFormat";
import ImageDialog from "../Dialogs/ImageDialog";
import { isUrlValid } from "./util";
import { isEmpty } from "lodash";


const Form = ({ formFields = [], initialData = {}, onSubmit = () => null, onCancel = () => navigate(-1), onCloseModalButton = () => { }, cancelButton = false, submitButton = true, closeButton = false, queryString = "", onChange = () => { }, validateData = (data) => data, label, styleCheckbox, isLoading, onFilePicked, selectedFile, allowedFileTypes, styleButtonSubmit, styleWrapperButtons }) => {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData ?? {});
  const [inputsError, setInputsError] = useState([]);
  const [openImageDialog, setOpenImageDialog] = useState({
    show: false,
    image: null,
    label: "",
    width: 800,
    height: 600,
    name: "",
  });

  let propAutoFocus = false;
  let checkIsFocused = false;

  function setInputErrors(name) {
    setInputsError((inputsError) => {
      delete inputsError[name];
      return inputsError;
    });
  }
  console.log("inputsError", inputsError)
  const submitHandler = (event) => {
    event.preventDefault && event.preventDefault();

    const errors = {};
    for (const field of formFields) {
      if (field.required && field.input_type !== "switch" && (data[field.prop_name] === "" || data[field.prop_name] == null)) {
        errors[field.prop_name] = {
          content: "Polje je obavezno, molim Vas unesite vrednost.",
        };
      }
    }
    if (!isEmpty(errors)) {
      console.error("Nisu popunjena sva obavezna polja. ", errors);
    }

    isEmpty(errors) ? onSubmit(data) : setInputsError(errors);

  };

  const formItemAutoCompleteChangeHandler = (name, value) => {
    let newData = { ...data, [name]: value };
    setData(validateData(newData, name));
    setInputErrors(name);
  };

  const formItemChangeHandler = ({ target }, type) => {
    let newData;
    switch (type) {
      case "date":
        newData = { ...data, [target.name]: formatDate(target.value) };
        break;
      case "date_time":
        newData = { ...data, [target.name]: formatDateTime(target.value) };
        break;
      case "checkbox":
      case "switch":
        newData = { ...data, [target.name]: target.checked ? 1 : 0 };
        break;
      default:
        newData = { ...data, [target.name]: target.value };
    }

    newData = validateData(newData, target.name);
    setData(newData);
    onChange(newData, target.name)
    console.log(target.name, "TARGET NAME:")
    console.log("New data", newData);
    setInputErrors(target.name);
  };

  const formImageUpload = useCallback(
    (event) => {
      event.preventDefault();
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const timeOutId = setTimeout(() => {
          setter(event, reader.result);
        }, 500);
        return () => clearTimeout(timeOutId);
      };
      reader.readAsDataURL(selectedFile);
    },
    [data]
  );

  const onOpenImageDialog = (img, label, imageName, width, height) => {
    const found = data[imageName];
    const checkImage = isUrlValid(img);

    if (checkImage) {
      setOpenImageDialog({
        show: true,
        image: found,
        label: label,
        width: width,
        height: height,
        name: imageName,
        showDimensions: false,
      });
    } else {
      setOpenImageDialog({
        show: true,
        image: img,
        label: label,
        width: width,
        height: height,
        name: imageName,
        showDimensions: false,
      });
    }
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog({ show: false, image: null, label: "", name: "" });
  };

  const handleSaveEditImage = (imageName, image) => {
    setData({ ...data, [imageName]: image });
  };

  const handleDeleteImage = (imageName) => {
    setData({ ...data, [imageName]: "DELETE" });
  };

  const setter = (event, result) => {
    setData({ ...data, [event.target.name]: result });
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const filteredFields = formFields.filter((field) => {

    // Default value for display field in form
    field.croonus_use_in_details = field.in_details;

    // Check if field need to display on new or edit form
    if (field?.in_details) {
      if ('id' in data) {
        if (data.id === null) {
          if ('in_details_new_display' in field) {
            field.croonus_use_in_details = field.in_details_new_display;
          }
        } else {
          if ('in_details_edit_display' in field) {
            field.croonus_use_in_details = field.in_details_edit_display;
          }
        }
      }
    }
    return field;
  });

  return (
    <>
      <Box component="form" autoComplete="off" onSubmit={submitHandler}>
        {(filteredFields ?? [])
          .filter((field) => field.croonus_use_in_details)
          .map((item, index) => {

            // Priprema vrednosti pre nego sto se prosledi u komponentu
            let temp_value = Array.isArray(item) && data ? data[item.prop_name] : data[item.prop_name];

            // Provera da li input ima vrednost, ukoliko nema prvi input koji nema vrednost se fokusira da bi korisnik mogao da nesmetano unosi podatke
            if (temp_value === null && !checkIsFocused) {
              checkIsFocused = true;
              propAutoFocus = true;
            } else {
              propAutoFocus = false;
            }

            return (
              <CreateForm
                data-test-id="admin-form"
                onChangeHandler={formItemChangeHandler}
                onChangeAutoHandler={formItemAutoCompleteChangeHandler}
                onImageUpload={formImageUpload}
                onOpenImageDialog={onOpenImageDialog}
                item={item}
                key={index}
                error={inputsError[item.prop_name] ? inputsError[item.prop_name].content : null}
                value={temp_value}
                queryString={queryString}
                disabled={item.disabled || (item.prop_name === "slug" && data.system_required === 1)}
                styleCheckbox={styleCheckbox}
                autoFocus={propAutoFocus}
                onFilePicked={(fileObject) => {
                  //passing object to upper level
                  onFilePicked(fileObject);
                  //deleting import error object:
                  setInputErrors("import");
                  console.log("Fileee:::");
                  setInputErrors("file");
                  //setting data to be defiend in value: 
                  setData({ ...data, import: fileObject.name });
                }}
                selectedFile={selectedFile}
                allowedFileTypes={allowedFileTypes}
              />
            );
          })}


        <Buttons styleWrapperButtons={styleWrapperButtons}>
          {cancelButton && <Button label="Odustani" onClick={onCancel} />}
          {submitButton && <Button type="submit" label={isLoading ? <CircularProgress size="1.5rem" /> : (label ? label : "Sačuvaj")} variant="contained" disabled={isLoading} sx={styleButtonSubmit} />}
          {closeButton && <Button label={(label ? label : "Sačuvaj")} variant="contained" onClick={onCloseModalButton} />}
        </Buttons>

      </Box>
      <ImageDialog
        title="Obrada slike"
        openImageDialog={openImageDialog}
        handleCloseImageDialog={handleCloseImageDialog}
        onImageUpload={formImageUpload}
        handleSaveEditImage={handleSaveEditImage}
        handleDeleteImage={handleDeleteImage}
      />
    </>
  );
};

export default Form;
