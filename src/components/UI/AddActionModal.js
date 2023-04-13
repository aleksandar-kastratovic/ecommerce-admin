import { Accordion, Modal } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const AddActionModal = ({ openModal, handleClose, saveAction }) => {
    let {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput((value) => value.trim() !== "");

    let { value: cityValue, valueChangeHandler: cityChangeHandler, reset: resetCity } = useInput((value) => value);

    let { value: zipValue, valueChangeHandler: zipChangeHandler, reset: resetZip } = useInput((value) => value);

    let { value: addressValue, valueChangeHandler: addressChangeHandler, reset: resetAddress } = useInput((value) => value);

    const submitHandler = () => {
        if (!nameIsValid) {
            toast.warning("Forma nije validna!");
            return;
        }
        saveAction({
            name: nameValue,
            city: cityValue,
            zip: zipValue,
            address: addressValue,
        });
        handleClose();
        resetName();
        resetCity();
        resetZip();
        resetAddress();
    };

    return (
        <Modal show={openModal} onHide={handleClose} backdrop="static" keyboard={false} centered size="xl" scrollable={true} className="add-role-modal">
            <Modal.Header closeButton>
                <Modal.Title>Nova akcija</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info">
                                    <FontAwesomeIcon icon={faPercentage} />
                                    Podaci akcije:
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        <div className="col-6">
                                            <Input
                                                inputValue={nameValue}
                                                onInputChange={nameChangeHandler}
                                                onInputBlur={nameBlurHandler}
                                                hasInputError={nameHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg " + (nameHasError ? "invalid" : "")}
                                                text="Naziv"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezan!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={cityValue}
                                                onInputChange={cityChangeHandler}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class="form-control input-style form-control-lg "
                                                text="Grad"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={zipValue}
                                                onInputChange={zipChangeHandler}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class="form-control input-style form-control-lg "
                                                text="ZIP"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={addressValue}
                                                onInputChange={addressChangeHandler}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class="form-control input-style form-control-lg "
                                                text="Adresa"
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
                <button type="button" className="btn-control cancel-btn" onClick={handleClose}>
                    Odustanite
                </button>
                <button disabled={!nameIsValid} type="button" className="btn-control save-btn" onClick={submitHandler}>
                    Sačuvajte
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddActionModal;
