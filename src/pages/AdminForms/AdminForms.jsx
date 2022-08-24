import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./adminFormListFields.json";

import styles from "./AdminForms.module.scss";

import { deleteForm, getListAdminForms } from "./services";

const AdminForms = () => {
  return (
    <ListPage
      getData={getListAdminForms}
      deleteData={deleteForm}
      title="Admin forms"
      showNewButton={true}
      newPath="/admin-form/new"
      columnFields={tblFields}
      showToolbar={true}
      editPath="/admin-form/"
      deleteTitle="Brisanje"
      deleteDescription="Da li ste sigurni da želite da obrišete?"
      showDatePicker={false}
    />
  );
};

export default AdminForms;
