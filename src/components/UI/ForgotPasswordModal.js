import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import { toast } from "react-toastify";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { regax } from "../../helpers/const";
import Button from "../shared/Button/Button";
import Modal from "../shared/Modal/Modal";

const ForgotPasswordModal = ({ openModal, handleClose, forgotPassword }) => {
    let {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput((value) => (!value && value.trim() !== "") || regax.test(value) !== false);

    const submitHandler = () => {
        if (!emailIsValid) {
            toast.warning("Forma nije validna!");
            return;
        }
        forgotPassword({
            email: emailValue,
        });
        handleClose();
        resetForm();
    };

    const resetForm = () => {
        resetEmail();
    };

    return (
        <Modal
            maxWidth="xs"
            title="Restartujte šifru"
            open={openModal}
            closeModal={handleClose}
            dividers={true}
            content={
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {/* <FontAwesomeIcon icon={faUserTag} /> */}
                        <PersonIcon />
                        Podaci o korisniku:
                    </AccordionSummary>
                    <AccordionDetails>
                        <Input
                            inputValue={emailValue}
                            onInputChange={emailChangeHandler}
                            onInputBlur={emailBlurHandler}
                            hasInputError={emailHasError}
                            disabled={false}
                            inputType="input"
                            type="text"
                            class={"form-control input-style form-control-lg " + (emailHasError ? "invalid" : "")}
                            text="Email"
                            text_class="m-0 required"
                            inputErrorText="je obavezan!"
                        />
                    </AccordionDetails>
                </Accordion>
            }
            modalFooterButton={
                <>
                    <Button
                        label="Odustanite"
                        onClick={() => {
                            resetForm();
                            handleClose();
                        }}
                    />
                    <Button label="Pošaljite" onClick={submitHandler} disabled={!emailIsValid} />
                </>
            }
        />
    );
};

export default ForgotPasswordModal;
