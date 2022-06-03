import { Accordion, Modal } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

const AddB2BCustomerModal = ({ openModal, handleClose, saveCustomer, companyList, filterCompanies }) => {

    let {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName
    } = useInput((value) => value.trim() !== '');

    let {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName
    } = useInput((value) => value.trim() !== '');

    let {
        value: companyValue,
        isValid: companyIsValid,
        hasError: companyHasError,
        valueChangeHandler: companyChangeHandler,
        inputBlurHandler: companyBlurHandler,
        reset: resetCompany
    } = useInput((value) => value > 0);
    
    let {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetPhone
    } = useInput((value) => value.trim() !== '');

    let {
        value: mobilePhoneValue,
        valueChangeHandler: mobilePhoneChangeHandler,
        reset: resetMobilePhone
    } = useInput((value) => value);

    let {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput((value) => value.trim() !== '');

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useInput((value) => value.length > 5 || value.trim() !== '');
    
    const {
        value: passwordConfirmValue,
        isValid: passwordConfirmIsValid,
        hasError: passwordConfirmHasError,
        valueChangeHandler: passwordConfirmChangeHandler,
        inputBlurHandler: passwordConfirmBlurHandler,
        reset: resetPasswordConfirm
    } = useInput((value) => value === passwordValue);

    const [search, setSearch] = useState('');

    useEffect(() => {
        const timeOutId = setTimeout(() => {if (search.trim().length > 2) {filterCompanies({company_name: search})}}, 700);
        return () => clearTimeout(timeOutId);
    }, [search]);

    const submitHandler = () => {
        if (
            !firstNameIsValid || !lastNameIsValid || !companyIsValid || !emailIsValid || !phoneIsValid
            || !passwordIsValid || !passwordConfirmIsValid
        ) {
            toast.warning("Forma nije validna!");
            return;
        }
        saveCustomer({
            first_name: firstNameValue,
            last_name: lastNameValue,
            company_id: companyValue,
            email: emailValue,
            phone: phoneValue,
            mobile_phone: mobilePhoneValue,
            password: passwordValue,
            password_confirmation: passwordConfirmValue
        });
        handleClose();
        resetForm();
    };

    const resetForm = () => {
        resetFirstName();
        resetLastName();
        resetCompany();
        resetEmail();
        resetPhone();
        resetMobilePhone();
        resetPassword();
        resetPasswordConfirm();
        setSearch('');
    }

    const companyChanged = (ev) => {
        const valueInput = {target: {value : (ev && ev.id !== null) ? ev.id : ev}};
        companyChangeHandler(valueInput);
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
                <Modal.Title>Novi B2B kupac</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-xl-12">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faUserTag} />Podaci o kupcu:</Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        <div className="col-6">
                                            <Input
                                                inputValue={firstNameValue}
                                                onInputChange={firstNameChangeHandler}
                                                onInputBlur={firstNameBlurHandler}
                                                hasInputError={firstNameHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg " + (firstNameHasError ? 'invalid' : '')}
                                                text="Ime"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezno!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={lastNameValue}
                                                onInputChange={lastNameChangeHandler}
                                                onInputBlur={lastNameBlurHandler}
                                                hasInputError={lastNameHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg " + (lastNameHasError ? 'invalid' : '')}
                                                text="Prezime"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezno!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                value={companyValue}
                                                isMulti={false}
                                                handleChange={companyChanged}
                                                onInputBlur={(e, action) => { setSearch(e); companyBlurHandler}}
                                                hasInputError={companyHasError}
                                                placeHolder={"Minimalno 3 karaktera"}
                                                disabled={false}
                                                isSearchable
                                                data={companyList ?? []}
                                                inputType="select-react"
                                                type="text"
                                                class={"form-control input-style form-control-lg select-style " + (companyHasError ? 'invalid' : '')}
                                                text="Naziv firme"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezna!"
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
                                                text="Email"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezan!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={phoneValue}
                                                onInputChange={phoneChangeHandler}
                                                onInputBlur={phoneBlurHandler}
                                                hasInputError={phoneHasError}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg " + (emailHasError ? 'invalid' : '')}
                                                text="Telefon"
                                                text_class="m-0 required"
                                                inputErrorText="je obavezan!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                inputValue={mobilePhoneValue}
                                                onInputChange={mobilePhoneChangeHandler}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class="form-control input-style form-control-lg "
                                                text="Mobilni telefon"
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
                                            inputErrorText="mora da ima minimalno 6 karaktera!"
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
                                                inputErrorText="mora da se poklapa sa lozinkom!"
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
                    disabled={
                        !firstNameIsValid || !lastNameIsValid || !companyIsValid || !emailIsValid || !phoneIsValid
                        || !passwordIsValid || !passwordConfirmIsValid
                    }
                    type="button"
                    className="btn-control save-btn"
                    onClick={submitHandler}
                >Sačuvajte</button>
            </Modal.Footer>
        </Modal>
    );
}
  
export default AddB2BCustomerModal;