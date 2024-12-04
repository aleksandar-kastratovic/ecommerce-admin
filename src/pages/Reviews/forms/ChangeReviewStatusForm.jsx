import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { InputCheckbox, InputSelect } from "../../../components/shared/Form/FormInputs/FormInputs";
import Button from "../../../components/shared/Button/Button";
import Buttons from "../../../components/shared/Form/Buttons/Buttons";
import AuthContext from "../../../store/auth-contex";

const ChangeReviewStatusForm = ({ id, currentStatus, setCurrentStatus, setOpenModal, statusList, oldStatus }) => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const [sendMail, setSendMail] = useState(false);

    const submitHandler = () => {
        if (currentStatus) {
            api.post(`admin/reviews/product-items-b2c/marks/basic-data`, { id, status: currentStatus.id, sent_mail: sendMail ? 1 : 0 })
                .then(() => {
                    toast.success("Uspešno!");
                    setOpenModal({ show: false });
                })
                .catch((error) => {
                    toast.warning(error.response.data.message ?? error?.response?.data?.payload?.message ?? "Greška");
                });
        } else {
            toast.warn("Odaberi status");
        }
    };

    return (
        <>
            <InputSelect
                label="Status"
                required={true}
                name="status"
                value={currentStatus ? currentStatus.id : ""}
                onChange={({ target }) => {
                    setCurrentStatus(statusList.find((statusObj) => statusObj.id == target.value));
                }}
                usePropName={false}
                options={statusList}
                styleFormControl={{ ".MuiFormLabel-root": { fontSize: "0.875rem" }, "&.MuiFormControl-root": { marginTop: "32px" } }}
            />

            {/* <CircularProgress size={`1.5rem`} /> */}

            <>
                <InputCheckbox
                    label="Pošalji mail autoru"
                    name="send_mail"
                    value={sendMail}
                    onChange={({ target }) => {
                        setSendMail(target.checked);
                    }}
                />
            </>

            <Buttons>
                <Button
                    label="Sačuvaj"
                    variant="contained"
                    onClick={submitHandler}
                    disabled={currentStatus && oldStatus && currentStatus.name === oldStatus ? true : false}
                    sx={{
                        "@media (max-width: 500px)": {
                            minWidth: "fit-content !important",
                            padding: "0.2rem 0.5rem !important",
                        },
                    }}
                />
            </Buttons>
        </>
    );
};

export default ChangeReviewStatusForm;
