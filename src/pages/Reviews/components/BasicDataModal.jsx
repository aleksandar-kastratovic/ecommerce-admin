import { useContext, useState } from "react";
import { toast } from "react-toastify";

// import Form from "../Form/Form";
// import styles from "./ChangePassword.module.scss";
// import formFields from "./changePasswordForm.json";
import ListPageModalWrapper from "../../../components/shared/Modal/ListPageModalWrapper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AuthContext from "../../../store/auth-contex";

const BasicDataModal = ({ openModal, setOpenModal, apiUrl }) => {
    console.log("openModal", openModal);
    const { product_name, name, display_comment } = openModal.data;

    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const init = {
        password: "",
        repeat_password: "",
        sent_mail: 0,
    };

    const [formData, setFormData] = useState(init);

    const changeHandler = (data) => {
        setFormData(data);
    };

    const submitHandler = (data) => {
        if (!(formData.repeat_password !== "" && formData.repeat_password !== formData.password)) {
            api.post(apiUrl, { id: openModal.id, ...data })
                .then((response) => {
                    toast.success("Uspešno!");
                    setOpenModal({ show: false });
                })
                .catch((error) => {
                    toast.warning(error.response.data.message ?? error?.response?.data?.payload?.message ?? "Greška");
                });
        } else {
            toast.warn("Lozinke se ne poklapaju!");
        }
    };

    return (
        <ListPageModalWrapper
            anchor="right"
            open={openModal.show ?? false}
            onClose={() => setOpenModal({ ...openModal, show: false })}
            onCloseButtonClick={() => setOpenModal({ ...openModal, show: false })}
            styleBox={{ display: "flex" }}
        >
            <Box sx={{ padding: "2rem" }}>
                <Typography variant="h5">Osnovni podaci</Typography>

                <Typography variant="body1" sx={{ mt: 5 }}>
                    <strong style={{ marginRight: "12px" }}>Proizvod:</strong>
                    {product_name}
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong style={{ marginRight: "12px" }}>Autor:</strong>
                    {name}
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong style={{ marginRight: "12px" }}>Komentar:</strong>
                    {display_comment}
                </Typography>

                {/* <Form formFields={formFields} initialData={formData} onSubmit={submitHandler} onChange={changeHandler} /> */}
            </Box>
        </ListPageModalWrapper>
    );
};

export default BasicDataModal;
