import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";

const ChangePasswordDialog = ({ openDialog, setOpenDialog }) => {
    return (
        <Dialog open={openDialog.show ?? false}>
            <DialogTitle>{"Promena lozinke"}</DialogTitle>

            <DialogContent>{openDialog.userId}</DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={() => setOpenDialog({ ...openDialog, show: false })} data-test-id="btn-cancel">
                    Zatvori
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;
