import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import ListTable from "../../components/shared/ListTable/ListTable";
import ListTableTitle from "../../components/shared/ListTable/ListTableTitle";
import ListTableToolbar from "../../components/shared/ListTable/ListTableToolbar";
import DeleteDialog from "../../components/shared/Dialogs/DeleteDialog";

import styles from "./B2Cbanners.module.scss";
import { flatten } from "lodash";
import fields from "./mainListFields.json";

import { useQuery } from "react-query";
import AuthContext from "../../store/auth-contex";
import { getListB2Cbanners, deleteB2Cbanners } from "./services.js";

const B2Cbanners = ({}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [listData, setListData] = useState();
  const [fieldsColumns, setFieldsColumns] = useState(fields);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });

  const {
    isSuccess,
    data: response,
    isLoading,
    isError,
  } = useQuery(["openDeleteDialog.mutate", openDeleteDialog.mutate], () =>
    getListB2Cbanners(user.access_token)
  );

  useEffect(() => {
    if (response) {
      setListData(response?.data?.payload);
    }
  }, [response]);

  const handleActions = (id, type) => () => {
    switch (type) {
      case "edit":
        navigate(`/B2C-banners/${id}`);
        break;
      case "delete":
        setOpenDeleteDialog({ show: true, id: id, mutate: null });
        break;
      case "preview":
        console.log("preview set", id);
        break;

      default:
        break;
    }
  };

  const handleCreateNew = (e) => {
    navigate(`/B2C-banners/new`);
  };

  const onColumnsChange = (newFields) => {
    setFieldsColumns(newFields);
  };

  const handleConfirm = async () => {
    try {
      await deleteB2Cbanners(user.access_token, openDeleteDialog.id);
    } catch (error) {
      console.warn(error);
    } finally {
      setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
    }
  };

  const handleCancel = (e) => {
    setOpenDeleteDialog({ show: false, id: null });
  };
  return (
    <>
      {!isLoading ? (
        <Paper elevation={0} className={styles.paperStyle}>
          <ListTableTitle
            title="B2C baneri"
            showButton={true}
            handleCreateNew={handleCreateNew}
          />

          <ListTableToolbar
            showToolbar={true}
            onColumnsChange={onColumnsChange}
            fields={fieldsColumns}
          />

          <ListTable
            fields={flatten(fieldsColumns).filter(
              ({ in_main_table }) => in_main_table
            )}
            listData={listData}
            handleActions={handleActions}
          />
        </Paper>
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="text" height={150} />
          <Stack spacing={1}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="rectangular" height={508} />
          </Stack>
        </Stack>
      )}
      <DeleteDialog
        title="Brisanje banera"
        description="Da li ste sigurni da želite da obrišete?"
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default B2Cbanners;
