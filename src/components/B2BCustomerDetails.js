import { faSave, faTrashAlt  } from "@fortawesome/free-regular-svg-icons";
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import Input from "./UI/Input";
import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";
import { toast } from "react-toastify";
import ConfirmModal from "./UI/ConfirmModal";

const B2BCustomerDetails = ({ customerData, saveCustomer, removeCustomer, companyList }) => {

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [confirmWhat, confirm] = useState();

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

  useEffect(() => {
    firstNameChangeHandler({target: {value : (customerData?.first_name ?? '') }});
    lastNameChangeHandler({target: {value : (customerData?.last_name ?? '') }});
    companyChangeHandler({target: {value : (customerData?.company_id ?? '') }});
    emailChangeHandler({target: {value : (customerData?.email ?? '') }});
    phoneChangeHandler({target: {value : (customerData?.phone ?? '') }});
    mobilePhoneChangeHandler({target: {value : (customerData?.mobile_phone ?? '') }});
    setSelectedCustomerId(customerData?.id ?? null);
  }, [customerData]);

  const submitHandler = () => {
    if (
      !firstNameIsValid || !lastNameIsValid || !companyIsValid || !emailIsValid || !phoneIsValid
    ) {
      toast.warning("Forma nije validna!");
      return;
    }

    saveCustomer({
      id: selectedCustomerId,
      first_name: firstNameValue,
      last_name: lastNameValue,
      company_id: companyValue,
      email: emailValue,
      phone: phoneValue,
      mobile_phone: mobilePhoneValue
    });

    resetForm();
  };

  const resetForm = () => {
    resetFirstName();
    resetLastName();
    resetCompany();
    resetEmail();
    resetPhone();
    resetMobilePhone();
    setSelectedCustomerId(null);
  }

  const removeCustomerHandler = () => {
    removeCustomer(selectedCustomerId);
  };

  const companyChanged = (ev) => {
    const valueInput = {target: {value : (ev && ev.id !== null) ? ev.id : ev}};
    companyChangeHandler(valueInput);
  };

  return (
    <div className="add-role-modal">
      <div className="btn-group mb-4" role="group" aria-label="Basic example">
        <button
          disabled={
            !firstNameIsValid || !lastNameIsValid || !companyIsValid || !emailIsValid || !phoneIsValid
          }
          onClick={submitHandler}
          type="button"
          className="btn-control btn btn-add-details"
        >
          <FontAwesomeIcon className="me-1" icon={faSave} />
          Sačuvajte
        </button>
        <button
          type="button"
          className="btn-control btn btn-delete-details"
          onClick={() => confirm(["Da li ste sigurni?", ()=> removeCustomerHandler() ])}
        >
          <FontAwesomeIcon className="me-1" icon={faTrashAlt} />
          Izbrišite
        </button>
      </div>
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
                      onInputBlur={companyBlurHandler}
                      data={companyList ?? []}
                      hasInputError={companyHasError}
                      disabled={false}
                      inputType="select-react"
                      type="text"
                      class={"form-control input-style form-control-lg select-style " + (companyHasError ? 'invalid' : '')}
                      text="Naziv firme"
                      text_class="m-0 required"
                      inputErrorText="je obavezan!"
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
                      type="number"
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
                      type="number"
                      class="form-control input-style form-control-lg "
                      text="Mobilni telefon"
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <ConfirmModal confirmWhat={confirmWhat} confirm={confirm} />
    </div>
  );
}

export default B2BCustomerDetails;