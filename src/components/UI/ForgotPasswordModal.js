import { Accordion, Modal } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { regax } from "../../helpers/const";

const ForgotPasswordModal = ({ openModal, handleClose, forgotPassword }) => {

    let {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput((value) => (!value && value.trim() !== '') || regax.test(value) !== false);

    const submitHandler = () => {
        if (
            !emailIsValid
        ) {
            toast.warning("Forma nije validna!");
            return;
        }
        forgotPassword({
            email: emailValue
        });
        handleClose();
        resetForm();
    };

    const resetForm = () => {
        resetEmail();
    }

    return (
        <Modal
            show={openModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            size="md"
            scrollable={true}
            className="add-role-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Restartujte šifru</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-xl-12">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faUserTag} />Podaci o korisniku:</Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        <div className="col-12">
                                            <Input
                                                inputValue={emailValue}
                                                onInputChange={emailChangeHandler}
                                                onInputBlur={emailBlurHandler}
                                                hasInputError={emailHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg " + (emailHasError ? 'invalid' : '')}
                                                text="Email"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezan!"
                                            />
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn-control cancel-btn" onClick={() => {resetForm(); handleClose();}}>Odustanite</button>
                <button
                    disabled={!emailIsValid}
                    type="button"
                    className="btn-control save-btn"
                    onClick={submitHandler}
                >Pošaljite</button>
            </Modal.Footer>
        </Modal>
    );
}
  
export default ForgotPasswordModal;