import { ConstructionOutlined, Delete } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import CreateForm from "../Form/CreateForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteDialog from "../Dialogs/DeleteDialog";

import styles from "./SetFormFields.module.scss";
import { Button } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect } from "react";

const ListItem = ({
  data,
  index,
  onDelete = () => {},
  saveData = () => {},
  required = [],
  formFields,
  actions = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldData, setFieldData] = useState(data);
  const [inputsError, setInputsError] = useState({});
  const [fields, setFields] = useState(formFields);
  const [buttons, setButtons] = useState({});
  const [openImageDialog, setOpenImageDialog] = useState({
    show: false,
    image: null,
    label: "",
    name: "",
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });

  const formItemChangeHandler = ({ target }, type) => {
    if (actions[target.name] && actions[target.name].value === target.value) {
      let name = target.name;
      let button = actions[target.name].button;
      setButtons({ ...buttons, [name]: button });
    } else if (
      actions[target.name] &&
      actions[target.name].value !== target.value
    ) {
      let name = target.name;
      setButtons((buttons) => {
        delete buttons[name];
        return buttons;
      });
    }
    if (type) {
      setFieldData({ ...fieldData, [target.name]: target.checked });
    } else {
      setFieldData({ ...fieldData, [target.name]: target.value });
    }
  };

  const deleteHandler = () => {
    onDelete(index, fieldData.id);
    setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
  };

  const onClickDelete = () => {
    setOpenDeleteDialog({ show: true, id: null, mutate: null });
  };

  const onSubmit = () => {
    const errors = {};
    Object.keys(fieldData).forEach((prop_name) => {
      if (typeof fieldData[prop_name] === "boolean") {
        fieldData[prop_name] = fieldData[prop_name] ? 1 : 0;
      }
      if (isEmpty(fieldData[prop_name])) {
        if (required.includes(prop_name)) {
          errors[prop_name] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
        }
      }
    });
    saveData(fieldData, index);
    setIsOpen(false);
    //isEmpty(errors) ? saveData(fieldData) : setInputsError(errors);
  };

  const handleCancel = () => {
    setOpenDeleteDialog({ show: false, id: null });
  };

  useEffect(() => {
    fields
      .filter(({ in_details }) => in_details)
      .map((item, index) => {
        if (
          actions[item.prop_name] &&
          actions[item.prop_name].value === data[item.prop_name]
        ) {
          let name = item.prop_name;
          let button = actions[item.prop_name].button;
          setButtons({ ...buttons, [name]: button });
        } else if (
          actions[item.prop_name] &&
          actions[item.prop_name].value !== data[item.prop_name]
        ) {
          let name = item.prop_name;
          setButtons((buttons) => {
            delete buttons[name];
            return buttons;
          });
        }
      });
  }, [data]);

  const formImageUpload = useCallback(
    (event) => {
      event.preventDefault();
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const timeOutId = setTimeout(() => {
          imageSetter(event, reader.result);
        }, 800);
        return () => clearTimeout(timeOutId);
      };
      reader.readAsDataURL(selectedFile);
    },
    [fieldData]
  );

  const imageSetter = (event, result) => {
    setFieldData({ ...fieldData, [event.target.name]: result });
  };

  const onOpenImageDialog = (img, label, imageName) => {
    const findBase64 = responseSlugs.data.payload.items.filter((item) => {
      return item.slug === imageName;
    });
    const found = findBase64[0].base64;

    // If the image is a type of URL it means that user still did not upload new image,
    // but if it is not type of URL it means that user uploaded new image
    // Additionally, if this solution is not reliable, new flag state can be introduced for example
    // type boolean
    // const [newImageUploaded, setNewImageUploaded] = useState(false)
    // when user uploads a new image it can be set to true
    const checkImage = isUrlValid(img);

    if (checkImage) {
      setOpenImageDialog({
        show: true,
        image: found,
        label: label,
        name: imageName,
      });
    } else {
      setOpenImageDialog({
        show: true,
        image: img,
        label: label,
        name: imageName,
      });
    }
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog({ show: false, image: null, label: "", name: "" });
  };

  const handleSaveEditImage = (imageName, image) => {
    setFieldData({ ...fieldData, [imageName]: image });
  };

  const handleDeleteImage = (imageName) => {
    setFieldData({ ...fieldData, [imageName]: "DELETE" });
  };
  return (
    <div>
      <div className={styles.formFieldHeader}>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {fieldData.field_name ??
            fieldData.name ??
            Object.values(fieldData)[0]}
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <Delete className={styles.iconDelete} onClick={onClickDelete} />
      </div>
      {isOpen && (
        <Box component="form" autoComplete="off">
          {fields &&
            fields
              .filter(({ in_details }) => in_details)
              .map((item, index) => {
                return (
                  <CreateForm
                    data-test-id="form"
                    onChangeHandler={formItemChangeHandler}
                    onImageUpload={formImageUpload}
                    onOpenImageDialog={onOpenImageDialog}
                    item={item}
                    key={index}
                    error={inputsError[item.prop_name]}
                    value={
                      Array.isArray(item) && data
                        ? fieldData[item.prop_name]
                        : fieldData[item.prop_name]
                    }
                  />
                );
              })}
          <div className={styles.actionButtons}>
            {Object.values(buttons).map((button) => {
              return (
                <Button
                  key={button.id}
                  onClick={() => {
                    button.action(fieldData.id);
                  }}
                  className={`${styles.buttonAdditional} ${button.className}`}
                >
                  {button.icon}
                  {button.text}
                </Button>
              );
            })}
          </div>
          <Button onClick={onSubmit}>Sačuvaj</Button>
        </Box>
      )}

      <DeleteDialog
        title="Brisanje"
        description="Da li ste sigurni da želite da obrišete?"
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleConfirm={deleteHandler}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default ListItem;
