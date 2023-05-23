import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";


/**
 * Ask for confirmation when deleting a record.
 *
 * @param {{show: bool, i: int, mutate: *}} openDeleteDialog Additional details for the dialog..
 * @param {string} title The title for the dialog, or null for the default title.
 * @param {string} description The description to show to the user, or null for the default message.
 * @param {function} handleConfirm Callback that will handle confirmation.
 * @param {function} setOpenDeleteDialog Call to change the state of the dialog in the parent.
 *
 * @return {JSX.Element}
 * @constructor
 */
const DeleteModal = ({ openDeleteDialog, selectedRowData, title, description, handleConfirm, setOpenDeleteDialog, nameOfButton, deafultDeleteIcon = true, sx = {}, children }) => {

  const childrenData = () => {
    switch (true) {
      case children !== undefined:
        return children(selectedRowData);
      case openDeleteDialog?.children !== undefined:
        return openDeleteDialog.children;
      default:
        return (
          <>
            <span>
              {description ?? "Da li ste sigurni da želite da obrišete ovaj zapis?"}
            </span>
          </>
        );
    }
  };


  return (
    <Dialog open={openDeleteDialog.show ?? false}>
      <DialogTitle>{title ?? "Brisanje"}</DialogTitle>

      <DialogContent sx={{ margin: "0 auto" }}>
        <DialogContentText>{childrenData()}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => setOpenDeleteDialog({ ...openDeleteDialog, show: false })} data-test-id="btn-cancel">
          odustani
        </Button>
        <Button variant="contained" color="error" startIcon={deafultDeleteIcon ? <Icon>delete</Icon> : null} onClick={handleConfirm} data-test-id="btn-confirm" sx={sx}>
          {nameOfButton ?? "obriši"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
