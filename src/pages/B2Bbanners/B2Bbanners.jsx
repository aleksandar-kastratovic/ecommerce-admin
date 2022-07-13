import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";

import ListTable from "../../components/shared/ListTable/ListTable";
import ListTableTitle from "../../components/shared/ListTable/ListTableTitle";
import ListTableToolbar from "../../components/shared/ListTable/ListTableToolbar";
import DeleteModal from "../../components/shared/Modals/DeleteModal";

import styles from "./B2Bbanners.module.scss";
import { flatten } from "lodash";
import fields from "./mainListFields.json";

import { useQuery } from "react-query";
import AuthContext from "../../store/auth-contex";
import { getListB2Bbanners } from "./services.js";

const B2Bbanners = ({}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [listData, setListData] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    isSuccess,
    data: response,
    isLoading,
    isError,
  } = useQuery(["getListB2Bbanners"], () =>
    getListB2Bbanners(user.access_token)
  );

  useEffect(() => {
    if (response) {
      setListData(response?.data?.payload);
    }
  }, [response]);

  const handleActions = (id, type) => () => {
    switch (type) {
      case "edit":
        navigate(`/B2B-banners/${id}`);
        break;
      case "delete":
        console.log("delete call", id);
        setOpenDeleteModal(true);
        break;
      case "preview":
        console.log("preview set", id);
        break;

      default:
        break;
    }
  };

  const handleCreateNew = (e) => {
    // TODO handle create new
    // navigate(`/B2B-banners/new`);
    console.log(e);
  };

  return (
    <>
      <Paper elevation={0} className={styles.paperStyle}>
        <ListTableTitle
          title="B2B eCommerce podesavanje modula"
          showButton={true}
          handleCreateNew={handleCreateNew}
        />

        <ListTableToolbar showToolbar={true} />

        <ListTable
          fields={flatten(fields).filter(({ in_main_table }) => in_main_table)}
          listData={listData}
          handleActions={handleActions}
        />
      </Paper>
      <DeleteModal
        title="Brisanje banera"
        description="Da li ste sigurni da zelite da obrisete?"
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
};

export default B2Bbanners;
