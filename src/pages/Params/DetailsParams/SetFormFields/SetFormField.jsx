import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import CreateForm from "../../../../components/shared/Form/CreateForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteDialog from "../../../../components/shared/Dialogs/DeleteDialog";
import { toast } from "react-toastify";

import fields from "./SetterFields.json";
import styles from "./SetFormFields.module.scss";
import { Button } from "@mui/material";
import { isEmpty } from "lodash";
import { saveFormField } from "../../services";
import AuthContext from "../../../../store/auth-contex";
import { formatDate } from "../../../../helpers/dateFormat";

const init = {
    "id":null,
    "field_type":"",
    "slug": "",
    "name": "",
    "int_value" : 0,
    "datetime_value" : "",
    "description" : "",
    "active_from":"",
    "active_to":"",
    "active_from":"",
    "active": 0,
    "order":0
}

const SetFormField = ({ data, index, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldData, setFieldData] = useState(data);
  const [inputsError, setInputsError] = useState({});

  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });
  const { user } = useContext(AuthContext);

  const formItemChangeHandler = ({ target }, type) => {
    if(type==="date") {
      setFieldData({ ...fieldData, [target.name]: formatDate(target.value ) });
    }
    else if (type) {
      setFieldData({ ...fieldData, [target.name]: target.checked });
    } else {
      if (target.name === "admin_form_id") {
        setFieldData({ ...fieldData, [target.name]: Number(target.value) });
      }
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
        if (prop_name === "field_name") {
          errors[prop_name] = {
            content: "Polje je obavezno, molim Vas unesite vrednost.",
          };
        }
      }
    });
    saveData()
    // isEmpty(errors) ? saveData() : setInputsError(errors);
  };

  const saveData = async () => {
    try {
      let repack = {...init, ...fieldData};
      let response = await saveFormField(user.access_token, repack);
      toast.success("Uspešno sačuvano!");
    } catch (error) {
      console.warn(error);
      toast.warning("Greška!");
    }
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
          {fieldData.name}
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
                    data-test-id="admin-form"
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

export default SetFormField;
