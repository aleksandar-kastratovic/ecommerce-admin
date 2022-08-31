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
      .list("admin/form")
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
    <ListPage apiUrl="admin/form" title="Admin forms" columnFields={tblFields} />
  );
};

export default AdminForms;
