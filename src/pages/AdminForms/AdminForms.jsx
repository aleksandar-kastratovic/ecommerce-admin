import { useState } from "react";
import { useEffect } from "react";
import useAPI from "../../api/api";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./adminFormListFields.json";

import styles from "./AdminForms.module.scss";

import { deleteForm, getListAdminForms } from "./services";

const AdminForms = () => {
  const api = useAPI();
  const [response, setResponse] = useState({});
  const [error, setError] = useState();

  const getList = async () => {
    return api
      ._execute("LIST", "admin/form")
      .then((response) => setResponse(response?.payload))
      .catch(setError);
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response, error]);

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
