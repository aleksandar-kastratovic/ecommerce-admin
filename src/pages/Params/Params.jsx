import { Paper, Skeleton, Stack } from "@mui/material";
import ListPage from "../../components/shared/ListPage/ListPage";
import ListTable from "../../components/shared/ListTable/ListTable";
import ListTableTitle from "../../components/shared/ListTable/ListTableTitle";
import ListTableToolbar from "../../components/shared/ListTable/ListTableToolbar";
import DeleteDialog from "../../components/shared/Dialogs/DeleteDialog";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-contex";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { flatten } from "lodash";
import tblFields from "./ParamsListFields.json";
import styles from "./Params.module.scss";
import { deleteParam, getListParams } from "./services";

const Params = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [search, setSearch] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async () => {
    try {
      setIsLoading(true);
      let response = await getListParams(user.access_token, search);
      let { payload } = response.data;
      setData(payload);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onColumnsChange = (newFields) => {
    setFields(newFields);
  };

  const handleCreateNew = () => {
    navigate("/params/new");
  };

  const handleActions = (id, type) => () => {
    switch (type) {
      case "edit":
        navigate(`/params/${id}`);
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
    } catch (error) {
      toast.warning("Neuspešno brisanje!");
      console.warn(error);
    } finally {
      toast.success("Uspešno obrisana forma!");
      setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
      handleData();
    }
  };

  const handleCancel = (e) => {
    setOpenDeleteDialog({ show: false, id: null });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    handleData();
  }, [search]);

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
     <ListPage
      getData={getListParams}
      deleteData={deleteParam}
      title="Parametri"
      showNewButton={true}
      newPath="/params/new"
      columnFields={tblFields}
      showToolbar={true}
      editPath="/params/"
      deleteTitle="Brisanje"
      deleteDescription="Da li ste sigurni da želite da obrišete?"
      showDatePicker={false}
    />
      {/* <Paper elevation={0} className={styles.paperStyle}>
        <ListTableTitle
          title="Parametri"
          showButton={true}
          handleCreateNew={handleCreateNew}
        />

        <ListTableToolbar
          showToolbar={true}
          onColumnsChange={onColumnsChange}
          fields={fields}
          showDatePicker={false}
          onSearch={handleSearch}
          searchValue={search}
        />
        {!isLoading ? (
          <ListTable
            fields={flatten(fields).filter(
              ({ in_main_table }) => in_main_table
            )}
            listData={data}
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
        title="Brisanje"
        description="Da li ste sigurni da želite da obrišete?"
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      /> */}
    </>
  );
};

export default Params;
