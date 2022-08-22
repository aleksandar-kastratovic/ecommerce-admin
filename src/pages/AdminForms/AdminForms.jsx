import { useContext, useEffect, useState } from "react";
import ListTable from "../../components/shared/ListTable/ListTable";
import ListTableToolbar from "../../components/shared/ListTable/ListTableToolbar";
import ListTableTitle from "../../components/shared/ListTable/ListTableTitle";
import { Paper } from "@mui/material";
import { flatten } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import tblFields from "./adminFormListFields.json";
import DeleteDialog from "../../components/shared/Dialogs/DeleteDialog";

import styles from "./AdminForms.module.scss";

import AuthContext from "../../store/auth-contex";
import { deleteForm, getListAdminForms } from "./services";

const AdminForms = () => {
  const { user } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [fields, setFields] = useState(tblFields);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });

  const navigate = useNavigate();

  const handleFormsList = async () => {
    try {
      let response = await getListAdminForms(user.access_token);
      let { payload } = response.data;
      let { items } = payload;
      setForms(payload);
    } catch (error) {
      console.warn(error);
    }
  };

  const onColumnsChange = (newFields) => {
    setFields(newFields);
  };

  const handleCreateNew = () => {
    navigate("/admin-form/new");
  };

  const handleActions = (id, type) => () => {
    switch (type) {
      case "edit":
        navigate(`/admin-form/${id}`);
        break;
      case "delete":
        setOpenDeleteDialog({ show: true, id: id, mutate: null });
        break;

      default:
        break;
    }
  };

  const handleConfirm = async () => {
    try {
      await deleteForm(user.access_token, openDeleteDialog.id);
    } catch (error) {
      console.warn(error);
    } finally {
      setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
      handleFormsList();
    }
  };

  const handleCancel = (e) => {
    setOpenDeleteDialog({ show: false, id: null });
  };

  useEffect(() => {
    handleFormsList();
  }, []);

  return (
    <>
      <Paper elevation={0} className={styles.paperStyle}>
        <ListTableTitle
          title="Admin forms"
          showButton={true}
          handleCreateNew={handleCreateNew}
        />

        <ListTableToolbar
          showToolbar={true}
          onColumnsChange={onColumnsChange}
          fields={fields}
          showDatePicker={false}
        />

        <ListTable
          fields={flatten(fields).filter(({ in_main_table }) => in_main_table)}
          listData={forms}
          handleActions={handleActions}
        />
      </Paper>
      <DeleteDialog
        title="Brisanje"
        description="Da li ste sigurni da želite da obrišete?"
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default AdminForms;
