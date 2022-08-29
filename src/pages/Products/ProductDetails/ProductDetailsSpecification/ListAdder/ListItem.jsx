import { ConstructionOutlined, Delete } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import CreateForm from "../../../../../components/shared/Form/CreateForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteDialog from "../../../../../components/shared/Dialogs/DeleteDialog";

import styles from "./SetFormFields.module.scss";
import { Button } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import GroupField from "./GroupField";
import { useContext } from "react";
import AuthContext from "../../../../../store/auth-contex";
import { getGrupsBySetID } from "../../../services";

const testGroups = [
  { id: 1, name: "grupa1" },
  { id: 2, name: "grupa2" },
  { id: 3, name: "grupa3" },
  { id: 4, name: "grupa4" },
  { id: 5, name: "grupa5" },
];

const ListItem = ({
  index,
  onDelete = () => {},
  setFormFields = [],
  selectedSet = undefined,
  productId,
}) => {
  const [loaded, setLoaded] = useState(false);
  //set form
  const [fields, setFields] = useState(setFormFields);
  const [selected, setSetlected] = useState(selectedSet);

  //set groups
  const [groups, setGroups] = useState([]);
  const [set, setSet] = useState({});

  const { user } = useContext(AuthContext);
  const [ddlDisabled, setDdlDisabled] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });

  const formItemChangeHandler = ({ target }, type) => {
    setSetlected(target.value);
  };

  const deleteHandler = () => {
    onDelete(index, setId);
    setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
  };

  const onClickDelete = () => {
    setOpenDeleteDialog({ show: true, id: null, mutate: null });
  };

  const handleCancel = () => {
    setOpenDeleteDialog({ show: false, id: null });
  };

  const groupsChangeHandler = async () => {
    try {
      let response = await getGrupsBySetID(user.access_token, selected);
      setSet(response?.data?.payload?.set);
      setGroups(response?.data?.payload?.groups);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (loaded) {
      groupsChangeHandler();
    }
  }, [selected, loaded]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.formFieldHeader}>
        <Box component="form" autoComplete="off" className={styles.setField}>
          <CreateForm
            data-test-id="form"
            onChangeHandler={formItemChangeHandler}
            item={fields[0]}
            key={index}
            value={selected}
            disabled={ddlDisabled}
          />
        </Box>
        <Button className={styles.deleteButton} onClick={onClickDelete}>
          <Delete />
        </Button>
      </div>

      <div>
        {groups.map((group) => {
          return (
            <GroupField
              key={group.id}
              name={group.name}
              groupId={group.id}
              slug={group.slug}
              setId={set.id}
              slugSet={set.slug}
              nameSet={set.name}
              productId={productId}
              onChange={() => {
                setDdlDisabled(true);
              }}
            />
          );
        })}
      </div>
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
