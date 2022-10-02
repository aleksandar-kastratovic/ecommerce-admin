import { Form, Modal } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-contex";
import { toast } from 'react-toastify';

const AddRoleModal = ({ openModal, handleClose, saveRole }) => {

    const { referenceData } = useContext(AuthContext);
    const [selectedScreensList, setSelectedScreensList] = useState([]);
    const [selectedScreensValid, setSelectedScreensValid] = useState(false);

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput((value) => value.trim() !== '');

    const checkScreen = (id) => {
        let idExsist = false;
        for(var i = 0; i < selectedScreensList.length; i++) {
            if (selectedScreensList[i] === id) {
                let data = selectedScreensList;
                data.splice(i, 1);
                if (data.length < 1) {
                    setSelectedScreensValid(false);
                }
                setSelectedScreensList(data);
                idExsist = true;
            }
        }
        if (!idExsist) {
            setSelectedScreensList(oldArray => [...oldArray, id]);
            setSelectedScreensValid(true);
        }
    }

    const submitHandler = () => {
        if (!nameIsValid || !selectedScreensValid) {
            toast.warning("Forma nije validna!");
            return;
        }
        saveRole({
            name: nameValue,
            screen_ids: selectedScreensList
        });
        handleClose();
        resetName();
        setSelectedScreensList([]);
    };

    return (
        <Modal
          show={openModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          size="xl"
          scrollable={true}
          className="add-role-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Nova uloga</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="orders-item-holder">
                            <h5>Podaci uloge:</h5>
                                <div className="buyers">
                                    <Input
                                        inputValue={nameValue}
                                        onInputChange={nameChangeHandler}
                                        onInputBlur={nameBlurHandler}
                                        hasInputError={nameHasError}
                                        disabled={false}
                                        inputType="input"
                                        type="text"
                                        class={"form-control input-style form-control-lg " + (nameHasError ? 'invalid' : '')}
                                        text="Naziv"
                                        text_class="m-0 required"
                                        inputErrorText="je obavezan!"
                                    />
                                </div>
                            </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="orders-item-holder">
                            <h5>Ekrani za ulogu:</h5>
                                <div className="row screens-wrapper buyers">
                                    <p className="m-0 required form-control-label">Lista Ekrana:</p>
                                    { referenceData.screens !== undefined && ( referenceData.screens.map(function(object) {
                                    return  <Form.Group key={object.id} className="remember-checkbox" controlId="formBasicCheckbox5">
                                                <Form.Check id={object.id} type="checkbox" label={object.screen} onChange={() => checkScreen(object.id)}/>
                                            </Form.Group>;
                                    }))}

                                </div>
                            </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn-control cancel-btn" onClick={handleClose}>Odustanite</button>
                <button disabled={ !nameIsValid || !selectedScreensValid } type="button" className="btn-control save-btn" onClick={submitHandler}>Sačuvajte</button>
            </Modal.Footer>
        </Modal>
    );
}
  
export default AddRoleModal;