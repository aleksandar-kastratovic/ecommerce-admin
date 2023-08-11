import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/system/Box";
import Icon from "@mui/material/Icon";

import CreateForm from "../../../../../components/shared/Form/CreateForm";
import DeleteDialog from "../../../../../components/shared/Dialogs/DeleteDialog";
import GroupField from "./GroupField";
import chooseSetForm from "../chooseSetForm.json";
import IconList from "../../../../../helpers/icons";
import useAPI from "../../../../../api/api";

import styles from "./SetFormFields.module.scss";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const ListItem = ({ index, onDelete = () => { }, title = "", selectedSet = undefined, productId, apiPath, set, group, onChange }) => {
  const [loaded, setLoaded] = useState(false);
  // const [open, setOpen] = useState(false);

  //delected set
  const [selected, setSetlected] = useState(selectedSet);

  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const navigate = useNavigate();

  const api = useAPI();

  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    show: false,
    id: null,
    mutate: null,
  });

  const formItemChangeHandler = ({ target }, type) => {
    setSetlected(target.value);
  };

  const deleteHandler = () => {
    onDelete(index, selectedSet);
    setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
  };

  const onClickDelete = () => {
    setOpenDeleteDialog({ show: true, id: null, mutate: null });
  };

  const handleCancel = () => {
    setOpenDeleteDialog({ show: false, id: null });
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  const changeHandler = (data, attributes, attributeValues) => {
    onChange(data, attributes, attributeValues);
  }

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Tooltip title={'Obrišite specifikaciju'} placement="top" arrow>
            <Icon onClick={onClickDelete} className={styles.deleteButton}>
              {IconList.delete}
            </Icon>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ margin: "0 0 2rem 2rem" }} key={group.id}>
        <GroupField
          name={group.name}
          groupId={group.id}
          slug={group.slug}
          setId={set?.id}
          slugSet={set?.slug}
          nameSet={set?.name}
          productId={productId}
          onChange={changeHandler}
          apiPath={apiPath}
        />
      </Box>
      <DeleteDialog
        title="Brisanje"
        description="Da li ste sigurni da želite da obrišete?"
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleConfirm={deleteHandler}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default ListItem;
