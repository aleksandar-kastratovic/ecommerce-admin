import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";

const DeleteModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  title = "",
  description = "",
  confirmIcon = "delete",
  cancelIcon = "cancel",
}) => {
  return (
    <Dialog
      open={openDeleteModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          data-test-id="confirm-dialog-confirm"
          disableFocusRipple
          variant="outlined"
          color="primary"
          startIcon={<Icon>{confirmIcon}</Icon>}
          //   disabled={disabler?.confirm}
          onClick={() => setOpenDeleteModal(false)}
        >
          obrisi
        </Button>
        <Button
          data-test-id="confirm-dialog-cancel"
          disableFocusRipple
          variant="outlined"
          color="error"
          startIcon={<Icon>{cancelIcon}</Icon>}
          //   disabled={disabler?.cancel}
          onClick={() => setOpenDeleteModal(false)}
        >
          otkazi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
