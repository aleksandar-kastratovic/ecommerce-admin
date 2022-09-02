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
import Form from "../Form/Form";

const ListItem = ({
  data,
  index,
  onDelete = () => {},
  saveData = () => {},
  formFields,
  actions = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldData, setFieldData] = useState(data);
  const [fields, setFields] = useState(formFields);
  const [buttons, setButtons] = useState({});

  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });

  const deleteHandler = () => {
    onDelete(index, fieldData.id);
    setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
  };

  const onClickDelete = () => {
    setOpenDeleteDialog({ show: true, id: null, mutate: null });
  };

  const onSubmit = (data) => {
    saveData(data, index);
    setIsOpen(false);
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
            fieldData.slug ??
            Object.values(fieldData)[0]}
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <Delete className={styles.iconDelete} onClick={onClickDelete} />
      </div>
      {isOpen && (
        <>
          <Form
            formFields={formFields}
            initialData={fieldData}
            onSubmit={onSubmit}
            cancelButton={false}
          />
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
        </>
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
