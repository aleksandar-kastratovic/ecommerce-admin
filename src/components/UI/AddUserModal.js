import { Accordion, Modal } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import { regax } from "../../helpers/const";
import Loader from "./Loader";
import { rolesListService } from "../../helpers/services";

const AddUserModal = ({ openModal, handleClose, saveUser }) => {

    const regex = regax;

    const { isLoading, sendRequest: rolesListRequest } = useHttp();

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput((value) => value.trim() !== '');

    const {
        value: lastnameValue,
        isValid: lastnameIsValid,
        hasError: lastnameHasError,
        valueChangeHandler: lastnameChangeHandler,
        inputBlurHandler: lastnameBlurHandler,
        reset: resetLastname
    } = useInput((value) => value.trim() !== '');

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput((value) => (!value && value.trim() !== '') || regex.test(value) !== false);

    const {
        value: phoneValue,
        valueChangeHandler: phoneChangeHandler,
        reset: resetPhone
    } = useInput((value) => value);

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useInput((value) => value.length > 5);

    const {
        value: passwordConfirmValue,
        isValid: passwordConfirmIsValid,
        hasError: passwordConfirmHasError,
        valueChangeHandler: passwordConfirmChangeHandler,
        inputBlurHandler: passwordConfirmBlurHandler,
        reset: resetPasswordConfirm
    } = useInput((value) => value === passwordValue);

    let {
        value: roleValue,
        isValid: roleIsValid,
        inputBlurHandler: roleBlurHandler,
        valueChangeHandler: roleValueChangeHandler,
        hasError: roleHasError,
        reset: resetRole
    } = useInput((value) => value !== undefined && value !== null && value != '');

    const [rolesList, setRolesList] = useState([]);

    const roleChangeHandler = (ev) => {
        const valueInput = {target: {value : (ev && ev.id !== null) ? ev.id : ev}};
        roleValueChangeHandler(valueInput);
    };

    useEffect(() => {
        const setRoles = async () => {
            const data = await rolesListService(rolesListRequest);
            setRolesList(data);
        };

        setRoles();
    }, [rolesListRequest]);

    const submitHandler = () => {
        if (!nameIsValid || !lastnameIsValid || !emailIsValid || !passwordIsValid || !passwordConfirmIsValid || !roleIsValid) {
            toast.warning("Forma nije validna!");
            return;
        }
        saveUser({
            first_name: nameValue,
            last_name: lastnameValue,
            email: emailValue,
            phone: phoneValue,
            password: passwordValue,
            password_confirmation: passwordConfirmValue,
            role_id: roleValue
        });
        handleClose();
        resetName();
        resetLastname();
        resetEmail();
        resetPhone();
        resetPassword();
        resetPasswordConfirm();
        resetRole();
    };

    return (
        <>
        <Modal
          show={openModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          size="xl"
          scrollable={true}
          className="add-role-modal modal-for-dropdown"
        >
            <Modal.Header closeButton>
                <Modal.Title>Novi korisnik</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-xl-12">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faUser} />Podaci o korisniku:</Accordion.Header>
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
                                                class={"form-control input-style form-control-lg " + (nameHasError ? 'invalid' : '')}
                                                text="Ime"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezno!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={lastnameValue}
                                                onInputChange={lastnameChangeHandler}
                                                onInputBlur={lastnameBlurHandler}
                                                hasInputError={lastnameHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg " + (lastnameHasError ? 'invalid' : '')}
                                                text="Prezime"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezno!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={emailValue}
                                                onInputChange={emailChangeHandler}
                                                onInputBlur={emailBlurHandler}
                                                hasInputError={emailHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg " + (emailHasError ? 'invalid' : '')}
                                                text="Mail"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezan!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={phoneValue}
                                                onInputChange={phoneChangeHandler}
                                                inputErrorVisible={false}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg "}
                                                text="Telefon"
                                                text_class="m-0"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={passwordValue}
                                                onInputChange={passwordChangeHandler}
                                                onInputBlur={passwordBlurHandler}
                                                hasInputError={passwordHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="password"
                                                class={"form-control input-style form-control-lg " + (passwordHasError ? 'invalid' : '')}
                                                text="Lozinka"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezna!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={passwordConfirmValue}
                                                onInputChange={passwordConfirmChangeHandler}
                                                onInputBlur={passwordConfirmBlurHandler}
                                                hasInputError={passwordConfirmHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="password"
                                                class={"form-control input-style form-control-lg " + (passwordConfirmHasError ? 'invalid' : '')}
                                                text="Potvrdite lozinku"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezno!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                value={roleValue}
                                                isMulti={false}
                                                handleChange={roleChangeHandler}
                                                onInputBlur={roleBlurHandler}
                                                hasInputError={roleHasError}
                                                disabled={false}
                                                data={rolesList}
                                                inputType="select-react"
                                                type="text"
                                                class={"form-control input-style form-control-lg select-style " + (roleHasError ? 'invalid' : '')}
                                                text="Uloga"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezna!"
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
                <button type="button" className="btn-control cancel-btn" onClick={handleClose}>Odustanite</button>
                <button
                    disabled={ !nameIsValid || !lastnameIsValid || !emailIsValid || !passwordIsValid || !passwordConfirmIsValid || !roleIsValid }
                    type="button"
                    className="btn-control save-btn"
                    onClick={submitHandler}
                >Sačuvajte</button>
            </Modal.Footer>
        </Modal>
        {isLoading && (
            <Loader />
        )}
        </>
    );
}
  
export default AddUserModal;