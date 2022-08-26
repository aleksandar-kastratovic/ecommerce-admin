import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import ListTable from "../ListTable/ListTable";
import ListTableTitle from "../ListTable/ListTableTitle";
import ListTableToolbar from "../ListTable/ListTableToolbar";
import DeleteDialog from "../Dialogs/DeleteDialog";

import styles from "./ListPage.module.scss";
import { flatten } from "lodash";
import { useQuery } from "react-query";
import AuthContext from "../../../store/auth-contex";

const ListPage = ({
  getData = () => {},
  deleteData = () => {},
  title = "",
  showNewButton = false,
  newPath = "",
  columnFields = [],
  showToolbar = false,
  editPath = "",
  deleteTitle = "",
  deleteDescription = "",
  className = "",
  additionalButtons = [],
  showDatePicker,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [listData, setListData] = useState();
  const [fieldsColumns, setFieldsColumns] = useState(columnFields);
  const [search, setSearch] = useState("");
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
  } = useQuery(
    ["openDeleteDialog.mutate", openDeleteDialog.mutate, search],
    () => getData(user.access_token, search)
  );

  useEffect(() => {
    if (response) {
      setListData(response?.data?.payload);
    }
  }, [response]);

  useEffect(() => {
    if (response) {
      setListData(response?.data?.payload);
    }
  }, []);

  const handleCreateNew = (e) => {
    navigate(newPath);
  };

  const onColumnsChange = (newFields) => {
    setFieldsColumns(newFields);
  };

  const handleConfirm = async () => {
    try {
      let response = await deleteData(user.access_token, openDeleteDialog.id);
    } catch (error) {
      console.warn(error);
      toast.warning("Greška");
    } finally {
      setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
    }
  };

  const handleActions = (id, type) => () => {
    switch (type) {
      case "edit":
        navigate(`${editPath}${id}`);
        break;
      case "delete":
        setOpenDeleteDialog({ show: true, id: id, mutate: null });
        break;

      default:
        break;
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCancel = (e) => {
    setOpenDeleteDialog({ show: false, id: null });
  };

  useEffect(() => {
    if (isError) {
      toast.warning("Greška");
    }
  }, [isError]);

  return (
    <>
      <Paper elevation={0} className={`${styles.paperStyle} ${className}`}>
        <ListTableTitle
          title={title}
          showButton={showNewButton}
          handleCreateNew={handleCreateNew}
          additionalButtons={additionalButtons}
        />

        <ListTableToolbar
          showToolbar={showToolbar}
          onColumnsChange={onColumnsChange}
          fields={fieldsColumns}
          onSearch={handleSearch}
          searchValue={search}
          showDatePicker={showDatePicker}
        />
        {!isLoading ? (
          <ListTable
            fields={flatten(fieldsColumns).filter(
              ({ in_main_table }) => in_main_table
            )}
            listData={listData}
            handleActions={handleActions}
          />
        ) : (
          <Stack spacing={1}>
            <Skeleton variant="text" height={150} />
            <Stack spacing={1}>
              <Skeleton variant="text" height={60} />
              <Skeleton variant="rectangular" height={508} />
            </Stack>
          </Stack>
        )}
      </Paper>

      <DeleteDialog
        title={deleteTitle}
        description={deleteDescription}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default ListPage;
