import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Form from "../Form/Form";
import styles from "./ChangePassword.module.scss";

import formFields from "./changePasswordForm.json";

const ChangePasswordDialog = ({ openDialog, setOpenDialog, apiPath }) => {
    const api = useAPI();

    const submitHandler = (data) => {
        if (!(formData.repeat_password !== "" && formData.repeat_password !== formData.password)) {
            api.post(apiPath, { id: openDialog.userId, ...data })
                .then((response) => {
                    toast.success("Uspešno!");
                    setOpenDialog({ ...openDialog, show: false });
                })
                .catch((error) => {
                    console.warn(error);
                });
        } else {
            toast.warn("Lozinke se ne poklapaju!");
        }
    };

    const init = {
        password: "",
        repeat_password: "",
        sent_mail: "",
    };
    const [formData, setFormData] = useState(init);
    const changeHandler = (data) => {
        setFormData(data);
    };

    useEffect(() => {
        if (openDialog.userId == null) {
            setOpenDialog({ ...openDialog, show: false });
        }
    }, []);

    return (
        <Dialog open={openDialog.show ?? false}>
            <DialogTitle>{"Promena lozinke"}</DialogTitle>

            <DialogContent>
                {formData.repeat_password !== "" && formData.repeat_password !== formData.password && <p className={styles.error}>Lozinke se ne poklapaju</p>}
                <Form formFields={formFields} initialData={formData} onSubmit={submitHandler} onChange={changeHandler} />
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={() => setOpenDialog({ ...openDialog, show: false })} data-test-id="btn-cancel">
                    Zatvori
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;
