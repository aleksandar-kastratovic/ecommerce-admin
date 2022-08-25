import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState } from "react";
import CreateForm from "../Form/CreateForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteDialog from "../Dialogs/DeleteDialog";

import styles from "./SetFormFields.module.scss";
import { Button } from "@mui/material";
import { isEmpty } from "lodash";

const ListItem = ({
  data,
  index,
  onDelete = () => {},
  saveData = () => {},
  required = [],
  formFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldData, setFieldData] = useState(data);
  const [inputsError, setInputsError] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });

  const formItemChangeHandler = ({ target }, type) => {
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
    saveData(fieldData);
    //isEmpty(errors) ? saveData(fieldData) : setInputsError(errors);
  };

  const handleCancel = () => {
    setOpenDeleteDialog({ show: false, id: null });
  };
  return (
    <div>
      <div className={styles.formFieldHeader}>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {Object.values(fieldData)[0]}
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <Delete className={styles.iconDelete} onClick={onClickDelete} />
      </div>
      {isOpen && (
        <Box component="form" autoComplete="off">
          {formFields &&
            formFields
              .filter(({ in_details }) => in_details)
              .map((item, index) => {
                return (
                  <CreateForm
                    data-test-id="form"
                    onChangeHandler={formItemChangeHandler}
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
