import { Accordion, Modal } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faMoneyCheckAlt,
  faTruck,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../store/auth-contex";

const AddCompanyModal = ({ openModal, handleClose, saveCompany }) => {
  const { referenceData } = useContext(AuthContext);

  let {
    value: companyValue,
    isValid: companyIsValid,
    hasError: companyHasError,
    valueChangeHandler: companyChangeHandler,
    inputBlurHandler: companyBlurHandler,
    reset: resetCompany,
  } = useInput((value) => value.trim() !== "");

  let {
    value: tinValue,
    isValid: tinIsValid,
    hasError: tinHasError,
    valueChangeHandler: tinChangeHandler,
    inputBlurHandler: tinBlurHandler,
    reset: resetTin,
  } = useInput((value) => value.trim() !== "");

  let {
    value: registryNumberValue,
    isValid: registryNumberIsValid,
    hasError: registryNumberHasError,
    valueChangeHandler: registryNumberChangeHandler,
    inputBlurHandler: registryNumberBlurHandler,
    reset: resetRegistryNumber,
  } = useInput((value) => value.trim() !== "");

  let {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput((value) => value.trim() !== "");

  let {
    value: mobilePhoneValue,
    valueChangeHandler: mobilePhoneChangeHandler,
    reset: resetMobilePhone,
  } = useInput((value) => value);

  let {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim() !== "");

  let {
    value: accountValue,
    valueChangeHandler: accountChangeHandler,
    reset: resetAccount,
  } = useInput((value) => value);

  let {
    value: dayPeymentValue,
    valueChangeHandler: dayPeymentChangeHandler,
    reset: resetDayPeyment,
  } = useInput((value) => value.trim() !== "");

  let {
    value: creditLimitValue,
    valueChangeHandler: creditLimitChangeHandler,
    reset: resetCreditLimit,
  } = useInput((value) => value.trim() !== "");

  let {
    value: billingAddressValue,
    valueChangeHandler: billingAddressChangeHandler,
    reset: resetBillingAddress,
  } = useInput((value) => value.trim() !== "");

  let {
    value: billingCityValue,
    valueChangeHandler: billingCityChangeHandler,
    reset: resetBillingCity,
  } = useInput((value) => value.trim() !== "");

  let {
    value: billingStateValue,
    valueChangeHandler: billingStateChangeHandler,
    reset: resetBillingState,
  } = useInput((value) => value.trim() !== "");

  let {
    value: billingZipValue,
    valueChangeHandler: billingZipChangeHandler,
    reset: resetBillingZip,
  } = useInput((value) => value.trim() !== "");

  let {
    value: billingCountryValue,
    valueChangeHandler: billingCountryChangeHandler,
    reset: resetBillingCountry,
  } = useInput((value) => value.trim() !== "");

  let {
    value: shippingAddressValue,
    valueChangeHandler: shippingAddressChangeHandler,
    reset: resetShippingAddress,
  } = useInput((value) => value.trim() !== "");

  let {
    value: shippingCityValue,
    valueChangeHandler: shippingCityChangeHandler,
    reset: resetShippingCity,
  } = useInput((value) => value.trim() !== "");

  let {
    value: shippingStateValue,
    valueChangeHandler: shippingStateChangeHandler,
    reset: resetShippingState,
  } = useInput((value) => value.trim() !== "");

  let {
    value: shippingZipValue,
    valueChangeHandler: shippingZipChangeHandler,
    reset: resetShippingZip,
  } = useInput((value) => value.trim() !== "");

  let {
    value: shippingCountryValue,
    valueChangeHandler: shippingCountryChangeHandler,
    reset: resetShippingCountry,
  } = useInput((value) => value.trim() !== "");

  let {
    value: statusValue,
    valueChangeHandler: statusChangeHandler,
    reset: resetStatus,
  } = useInput((value) => value);

  let {
    value: priceListValue,
    valueChangeHandler: priceListChangeHandler,
    reset: resetPriceList,
  } = useInput((value) => value);

  let {
    value: transportValue,
    valueChangeHandler: transportChangeHandler,
    reset: resetTransport,
  } = useInput((value) => value);

  let {
    value: rabatValue,
    valueChangeHandler: rabatChangeHandler,
    reset: resetRabat,
  } = useInput((value) => value);

  let {
    value: nonInvoiceRabatValue,
    valueChangeHandler: nonInvoiceRabatChangeHandler,
    reset: resetNonInvoiceRabat,
  } = useInput((value) => value);

  let {
    value: expectedDelayValue,
    valueChangeHandler: expectedDelayChangeHandler,
    reset: resetExpectedDelay,
  } = useInput((value) => value);

  const submitHandler = () => {
    if (
      !companyIsValid ||
      !tinIsValid ||
      !registryNumberIsValid ||
      !emailIsValid ||
      !phoneIsValid
    ) {
      toast.warning("Forma nije validna!");
      return;
    }
    saveCompany({
      company_name: companyValue,
      tin: +tinValue,
      registry_number: +registryNumberValue,
      email: emailValue,
      phone: phoneValue,
      mobile_phone: mobilePhoneValue,
      current_account: accountValue,
      number_day_payment: dayPeymentValue,
      credit_limit: +creditLimitValue,
      billing_address: billingAddressValue,
      billing_city: billingCityValue,
      billing_state: billingStateValue,
      billing_zip: billingZipValue,
      billing_country: billingCountryValue,
      shipping_address: shippingAddressValue,
      shipping_city: shippingCityValue,
      shipping_state: shippingStateValue,
      shipping_zip: shippingZipValue,
      shipping_country: shippingCountryValue,
      customer_status: statusValue,
      price_list: priceListValue,
      transport: transportValue,
      rabat: +rabatValue,
      non_invoice_rabat: +nonInvoiceRabatValue,
      expected_delay: +expectedDelayValue,
    });
    handleClose();
    resetForm();
  };

  const resetForm = () => {
    resetCompany();
    resetTin();
    resetRegistryNumber();
    resetEmail();
    resetPhone();
    resetMobilePhone();
    resetAccount();
    resetDayPeyment();
    resetCreditLimit();
    resetBillingAddress();
    resetBillingCity();
    resetBillingState();
    resetBillingZip();
    resetBillingCountry();
    resetShippingAddress();
    resetShippingCity();
    resetShippingState();
    resetShippingZip();
    resetShippingCountry();
    resetStatus();
    resetPriceList();
    resetTransport();
    resetRabat();
    resetNonInvoiceRabat();
    resetExpectedDelay();
  };

  const statusChanged = (ev) => {
    const valueInput = { target: { value: ev && ev.id !== null ? ev.id : ev } };
    statusChangeHandler(valueInput);
  };

  const transportChanged = (ev) => {
    const valueInput = { target: { value: ev && ev.id !== null ? ev.id : ev } };
    transportChangeHandler(valueInput);
  };

  const priceListChanged = (ev) => {
    const valueInput = { target: { value: ev && ev.id !== null ? ev.id : ev } };
    priceListChangeHandler(valueInput);
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
        <Modal.Title>Nova kompanija</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-xl-12">
            <div className="orders-item-holder">
              <h5>Podaci o kompaniji:</h5>
              <div className="row buyers">
                <div className="col-6">
                  <Input
                    inputValue={companyValue}
                    onInputChange={companyChangeHandler}
                    onInputBlur={companyBlurHandler}
                    hasInputError={companyHasError}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={
                      "form-control input-style form-control-lg " +
                      (companyHasError ? "invalid" : "")
                    }
                    text="Naziv firme"
                    text_class="m-0 required"
                    inputErrorText="je obavezan!"
                  />
                </div>
                <div className="col-6">
                  <Input
                    inputValue={tinValue}
                    onInputChange={tinChangeHandler}
                    onInputBlur={tinBlurHandler}
                    hasInputError={tinHasError}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class={
                      "form-control input-style form-control-lg " +
                      (tinHasError ? "invalid" : "")
                    }
                    text="PIB"
                    text_class="m-0 required"
                    inputErrorText="je obavezan!"
                  />
                </div>
                <div className="col-6">
                  <Input
                    inputValue={registryNumberValue}
                    onInputChange={registryNumberChangeHandler}
                    onInputBlur={registryNumberBlurHandler}
                    hasInputError={registryNumberHasError}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class={
                      "form-control input-style form-control-lg " +
                      (registryNumberHasError ? "invalid" : "")
                    }
                    text="MB"
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
                    class={
                      "form-control input-style form-control-lg " +
                      (emailHasError ? "invalid" : "")
                    }
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
                    class={
                      "form-control input-style form-control-lg " +
                      (phoneHasError ? "invalid" : "")
                    }
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
                    inputValue={accountValue}
                    onInputChange={accountChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class="form-control input-style form-control-lg "
                    text="Račun"
                  />
                </div>
                <div className="col-6">
                  <Input
                    inputValue={dayPeymentValue}
                    onInputChange={dayPeymentChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class={"form-control input-style form-control-lg"}
                    text="Broj dana za plaćanje"
                    text_class="m-0"
                  />
                </div>
                <div className="col-6">
                  <Input
                    inputValue={creditLimitValue}
                    onInputChange={creditLimitChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class={"form-control input-style form-control-lg"}
                    text="Kreditni limit"
                    text_class="m-0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="orders-item-holder">
              <h5>Podaci o naplati:</h5>
              <div className="row buyers">
                <div className="col-12">
                  <Input
                    inputValue={billingAddressValue}
                    onInputChange={billingAddressChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg"}
                    text="Adresa naplate"
                    text_class="m-0"
                  />
                </div>
                <div className="col-12">
                  <Input
                    inputValue={billingCityValue}
                    onInputChange={billingCityChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg"}
                    text="Grad naplate"
                    text_class="m-0"
                  />
                </div>
                <div className="col-12">
                  <Input
                    inputValue={billingStateValue}
                    onInputChange={billingStateChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg"}
                    text="Stanje naplate"
                    text_class="m-0"
                  />
                </div>
                <div className="col-12">
                  <Input
                    inputValue={billingZipValue}
                    onInputChange={billingZipChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class={"form-control input-style form-control-lg"}
                    text="ZIP naplate"
                    text_class="m-0"
                  />
                </div>
                <div className="col-12">
                  <Input
                    inputValue={billingCountryValue}
                    onInputChange={billingCountryChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg"}
                    text="Zemlja naplate"
                    text_class="m-0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="orders-item-holder">
              <h5>Podaci o dostavi:</h5>
              <div className="row buyers">
                <div className="col-12">
                  <Input
                    inputValue={shippingAddressValue}
                    onInputChange={shippingAddressChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg"}
                    text="Adresa dostave"
                    text_class="m-0"
                  />
                </div>
                <div className="col-12">
                  <Input
                    inputValue={shippingCityValue}
                    onInputChange={shippingCityChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg"}
                    text="Grad dostave"
                  />
                </div>
                <div className="col-12">
                  <Input
                    inputValue={shippingStateValue}
                    onInputChange={shippingStateChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg"}
                    text="Region dostave"
                    text_class="m-0"
                  />
                </div>
                <div className="col-12">
                  <Input
                    inputValue={shippingZipValue}
                    onInputChange={shippingZipChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class={"form-control input-style form-control-lg"}
                    text="ZIP dostave"
                    text_class="m-0"
                  />
                </div>
                <div className="col-12">
                  <Input
                    inputValue={shippingCountryValue}
                    onInputChange={shippingCountryChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg"}
                    text="Zemlja dostave"
                    text_class="m-0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="orders-item-holder">
              <h5>Podaci o plaćanju:</h5>
              <div className="row buyers">
                <div className="col-6">
                  <Input
                    value={statusValue}
                    isMulti={false}
                    handleChange={statusChanged}
                    disabled={false}
                    data={referenceData.customer_status ?? []}
                    inputType="select-react"
                    type="text"
                    class="form-control input-style form-control-lg select-style"
                    text="Status kupca"
                  />
                </div>
                <div className="col-6">
                  <Input
                    value={priceListValue}
                    isMulti={false}
                    handleChange={priceListChanged}
                    disabled={false}
                    data={referenceData.customer_price_list ?? []}
                    inputType="select-react"
                    type="text"
                    class="form-control input-style form-control-lg select-style"
                    text="Cenovnik"
                  />
                </div>
                <div className="col-6">
                  <Input
                    value={transportValue}
                    isMulti={false}
                    handleChange={transportChanged}
                    disabled={false}
                    data={referenceData.customer_transport ?? []}
                    inputType="select-react"
                    type="text"
                    class="form-control input-style form-control-lg select-style"
                    text="Transport"
                  />
                </div>
                <div className="col-6">
                  <Input
                    inputValue={rabatValue}
                    onInputChange={rabatChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class="form-control input-style form-control-lg "
                    text="Rabat"
                  />
                </div>
                <div className="col-6">
                  <Input
                    inputValue={nonInvoiceRabatValue}
                    onInputChange={nonInvoiceRabatChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class="form-control input-style form-control-lg "
                    text="Vanfakturni rabati"
                  />
                </div>
                <div className="col-6">
                  <Input
                    inputValue={expectedDelayValue}
                    onInputChange={expectedDelayChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class="form-control input-style form-control-lg "
                    text="Očekivano kašnjenje u plaćanju"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn-control cancel-btn"
          onClick={() => {
            resetForm();
            handleClose();
          }}
        >
          Odustanite
        </button>
        <button
          disabled={
            !companyIsValid ||
            !tinIsValid ||
            !registryNumberIsValid ||
            !emailIsValid ||
            !phoneIsValid
          }
          type="button"
          className="btn-control save-btn"
          onClick={submitHandler}
        >
          Sačuvajte
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCompanyModal;
