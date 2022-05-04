import { faSave, faTrashAlt  } from "@fortawesome/free-regular-svg-icons";
import { faCity, faMoneyCheckAlt, faTruck, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import Input from "./UI/Input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-contex";
import useInput from "../hooks/use-input";
import { toast } from "react-toastify";
import ConfirmModal from "./UI/ConfirmModal";

const CompanyDetails = ({ companyData, saveCompany, removeCompany }) => {

  const { referenceData } = useContext(AuthContext);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [confirmWhat, confirm] = useState();

  let {
    value: companyValue,
    isValid: companyIsValid,
    hasError: companyHasError,
    valueChangeHandler: companyChangeHandler,
    inputBlurHandler: companyBlurHandler,
    reset: resetCompany
  } = useInput((value) => value.trim() !== '');

  let {
    value: tinValue,
    isValid: tinIsValid,
    hasError: tinHasError,
    valueChangeHandler: tinChangeHandler,
    inputBlurHandler: tinBlurHandler,
    reset: resetTin
  } = useInput((value) => value > 0);

let {
    value: registryNumberValue,
    isValid: registryNumberIsValid,
    hasError: registryNumberHasError,
    valueChangeHandler: registryNumberChangeHandler,
    inputBlurHandler: registryNumberBlurHandler,
    reset: resetRegistryNumber
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

  let {
    value: accountValue,
    valueChangeHandler: accountChangeHandler,
    reset: resetAccount
  } = useInput((value) => value);

  let {
    value: dayPeymentValue,
    isValid: dayPeymentIsValid,
    hasError: dayPeymentHasError,
    valueChangeHandler: dayPeymentChangeHandler,
    inputBlurHandler: dayPeymentBlurHandler,
    reset: resetDayPeyment
  } = useInput((value) => value.trim() !== '');

  let {
    value: creditLimitValue,
    isValid: creditLimitIsValid,
    hasError: creditLimitHasError,
    valueChangeHandler: creditLimitChangeHandler,
    inputBlurHandler: creditLimitBlurHandler,
    reset: resetCreditLimit
  } = useInput((value) => value > 0);

  let {
    value: billingAddressValue,
    isValid: billingAddressIsValid,
    hasError: billingAddressHasError,
    valueChangeHandler: billingAddressChangeHandler,
    inputBlurHandler: billingAddressBlurHandler,
    reset: resetBillingAddress
  } = useInput((value) => value.trim() !== '');

  let {
    value: billingCityValue,
    isValid: billingCityIsValid,
    hasError: billingCityHasError,
    valueChangeHandler: billingCityChangeHandler,
    inputBlurHandler: billingCityBlurHandler,
    reset: resetBillingCity
  } = useInput((value) => value.trim() !== '');

  let {
    value: billingStateValue,
    isValid: billingStateIsValid,
    hasError: billingStateHasError,
    valueChangeHandler: billingStateChangeHandler,
    inputBlurHandler: billingStateBlurHandler,
    reset: resetBillingState
  } = useInput((value) => value.trim() !== '');

  let {
    value: billingZipValue,
    isValid: billingZipIsValid,
    hasError: billingZipHasError,
    valueChangeHandler: billingZipChangeHandler,
    inputBlurHandler: billingZipBlurHandler,
    reset: resetBillingZip
  } = useInput((value) => value.trim() !== '');

  let {
    value: billingCountryValue,
    isValid: billingCountryIsValid,
    hasError: billingCountryHasError,
    valueChangeHandler: billingCountryChangeHandler,
    inputBlurHandler: billingCountryBlurHandler,
    reset: resetBillingCountry
  } = useInput((value) => value.trim() !== '');

  let {
    value: shippingAddressValue,
    isValid: shippingAddressIsValid,
    hasError: shippingAddressHasError,
    valueChangeHandler: shippingAddressChangeHandler,
    inputBlurHandler: shippingAddressBlurHandler,
    reset: resetShippingAddress
  } = useInput((value) => value.trim() !== '');

  let {
    value: shippingCityValue,
    isValid: shippingCityIsValid,
    hasError: shippingCityHasError,
    valueChangeHandler: shippingCityChangeHandler,
    inputBlurHandler: shippingCityBlurHandler,
    reset: resetShippingCity
  } = useInput((value) => value.trim() !== '');

  let {
    value: shippingStateValue,
    isValid: shippingStateIsValid,
    hasError: shippingStateHasError,
    valueChangeHandler: shippingStateChangeHandler,
    inputBlurHandler: shippingStateBlurHandler,
    reset: resetShippingState
  } = useInput((value) => value.trim() !== '');

  let {
    value: shippingZipValue,
    isValid: shippingZipIsValid,
    hasError: shippingZipHasError,
    valueChangeHandler: shippingZipChangeHandler,
    inputBlurHandler: shippingZipBlurHandler,
    reset: resetShippingZip
  } = useInput((value) => value.trim() !== '');

  let {
    value: shippingCountryValue,
    isValid: shippingCountryIsValid,
    hasError: shippingCountryHasError,
    valueChangeHandler: shippingCountryChangeHandler,
    inputBlurHandler: shippingCountryBlurHandler,
    reset: resetShippingCountry
  } = useInput((value) => value.trim() !== '');

  let {
    value: statusValue,
    valueChangeHandler: statusChangeHandler,
    reset: resetStatus
  } = useInput((value) => value);

  let {
    value: priceListValue,
    valueChangeHandler: priceListChangeHandler,
    reset: resetPriceList
  } = useInput((value) => value);

  let {
    value: transportValue,
    valueChangeHandler: transportChangeHandler,
    reset: resetTransport
  } = useInput((value) => value);

  let {
    value: rabatValue,
    valueChangeHandler: rabatChangeHandler,
    reset: resetRabat
  } = useInput((value) => value);

  let {
    value: nonInvoiceRabatValue,
    valueChangeHandler: nonInvoiceRabatChangeHandler,
    reset: resetNonInvoiceRabat
  } = useInput((value) => value);

  let {
    value: expectedDelayValue,
    valueChangeHandler: expectedDelayChangeHandler,
    reset: resetExpectedDelay
  } = useInput((value) => value);

  useEffect(() => {
    companyChangeHandler({target: {value : (companyData?.company_name ?? '') }});
    tinChangeHandler({target: {value : (companyData?.tin ?? '') }});
    registryNumberChangeHandler({target: {value : (companyData?.registry_number ?? '') }});
    emailChangeHandler({target: {value : (companyData?.email ?? '') }});
    phoneChangeHandler({target: {value : (companyData?.phone ?? '') }});
    mobilePhoneChangeHandler({target: {value : (companyData?.mobile_phone ?? '') }});
    accountChangeHandler({target: {value : (companyData?.current_account ?? '') }});
    dayPeymentChangeHandler({target: {value : (companyData?.number_day_payment ?? '') }});
    creditLimitChangeHandler({target: {value : (companyData?.credit_limit ?? '') }});
    billingAddressChangeHandler({target: {value : (companyData?.billing_address ?? '') }});
    billingCityChangeHandler({target: {value : (companyData?.billing_city ?? '') }});
    billingStateChangeHandler({target: {value : (companyData?.billing_state ?? '') }});
    billingZipChangeHandler({target: {value : (companyData?.billing_zip ?? '') }});
    billingCountryChangeHandler({target: {value : (companyData?.billing_country ?? '') }});
    shippingAddressChangeHandler({target: {value : (companyData?.shipping_address ?? '') }});
    shippingCityChangeHandler({target: {value : (companyData?.shipping_city ?? '') }});
    shippingStateChangeHandler({target: {value : (companyData?.shipping_state ?? '') }});
    shippingZipChangeHandler({target: {value : (companyData?.shipping_zip ?? '') }});
    shippingCountryChangeHandler({target: {value : (companyData?.shipping_country ?? '') }});
    statusChangeHandler({target: {value : (companyData?.customer_status ?? '') }});
    priceListChangeHandler({target: {value : (companyData?.price_list ?? '') }});
    transportChangeHandler({target: {value : (companyData?.transport ?? '') }});
    rabatChangeHandler({target: {value : (companyData?.rabat ?? '') }});
    nonInvoiceRabatChangeHandler({target: {value : (companyData?.non_invoice_rabat ?? '') }});
    expectedDelayChangeHandler({target: {value : (companyData?.expected_delay ?? '') }});
    setSelectedCompanyId(companyData?.id ?? null);
  }, [companyData]);

  const submitHandler = () => {
    if (
      !companyIsValid || !tinIsValid || !shippingStateIsValid || !shippingZipIsValid
      || !registryNumberIsValid || !emailIsValid || !phoneIsValid || !dayPeymentIsValid
      || !creditLimitIsValid || !billingAddressIsValid || !billingCityIsValid
      || !billingCountryIsValid || !billingStateIsValid || !billingZipIsValid
      || !shippingAddressIsValid || !shippingCityIsValid|| !shippingCountryIsValid
    ) {
      toast.warning("Forma nije validna!");
      return;
    }

    saveCompany({
      id: selectedCompanyId,
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
      expected_delay: +expectedDelayValue
    });

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
    setSelectedCompanyId(null);
  }

  const removeCompanyHandler = () => {
    removeCompany(selectedCompanyId);
  };

  const statusChanged = (ev) => {
    const valueInput = {target: {value : (ev && ev.id !== null) ? ev.id : ev}};
    statusChangeHandler(valueInput);
  };

  const transportChanged = (ev) => {
    const valueInput = {target: {value : (ev && ev.id !== null) ? ev.id : ev}};
    transportChangeHandler(valueInput);
  };

  const priceListChanged = (ev) => {
    const valueInput = {target: {value : (ev && ev.id !== null) ? ev.id : ev}};
    priceListChangeHandler(valueInput);
  };

  return (
    <div className="add-role-modal">
      <div className="btn-group mb-4" role="group" aria-label="Basic example">
        <button
          disabled={
            !companyIsValid || !tinIsValid || !shippingStateIsValid || !shippingZipIsValid
            || !registryNumberIsValid || !emailIsValid || !phoneIsValid || !dayPeymentIsValid
            || !creditLimitIsValid || !billingAddressIsValid || !billingCityIsValid
            || !billingCountryIsValid || !billingStateIsValid || !billingZipIsValid
            || !shippingAddressIsValid || !shippingCityIsValid|| !shippingCountryIsValid
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
          onClick={() => confirm(["Da li ste sigurni?", ()=> removeCompanyHandler() ])}
        >
          <FontAwesomeIcon className="me-1" icon={faTrashAlt} />
          Izbrišite
        </button>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faCity} />Podaci o kompaniji:</Accordion.Header>
              <Accordion.Body>
                <Input
                  inputValue={companyValue}
                  onInputChange={companyChangeHandler}
                  onInputBlur={companyBlurHandler}
                  hasInputError={companyHasError}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class={"form-control input-style form-control-lg " + (companyHasError ? 'invalid' : '')}
                  text="Naziv firme"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
                <Input
                  inputValue={tinValue}
                  onInputChange={tinChangeHandler}
                  onInputBlur={tinBlurHandler}
                  hasInputError={tinHasError}
                  disabled={false}
                  inputType="input"
                  type="number"
                  class={"form-control input-style form-control-lg " + (tinHasError ? 'invalid' : '')}
                  text="PIB"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
                <Input
                  inputValue={registryNumberValue}
                  onInputChange={registryNumberChangeHandler}
                  onInputBlur={registryNumberBlurHandler}
                  hasInputError={registryNumberHasError}
                  disabled={false}
                  inputType="input"
                  type="number"
                  class={"form-control input-style form-control-lg " + (registryNumberHasError ? 'invalid' : '')}
                  text="MB"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
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
                <Input
                  inputValue={phoneValue}
                  onInputChange={phoneChangeHandler}
                  onInputBlur={phoneBlurHandler}
                  hasInputError={phoneHasError}
                  disabled={false}
                  inputType="input"
                  type="number"
                  class={"form-control input-style form-control-lg " + (emailHasError ? 'invalid' : '')}
                  text="Fiksni telefon"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
                <Input
                  inputValue={mobilePhoneValue}
                  onInputChange={mobilePhoneChangeHandler}
                  disabled={false}
                  inputType="input"
                  type="number"
                  class="form-control input-style form-control-lg "
                  text="Mobilni telefon"
                />
                <Input
                  inputValue={accountValue}
                  onInputChange={accountChangeHandler}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class="form-control input-style form-control-lg "
                  text="Račun"
                />
                <Input
                  inputValue={dayPeymentValue}
                  onInputChange={dayPeymentChangeHandler}
                  onInputBlur={dayPeymentBlurHandler}
                  hasInputError={dayPeymentHasError}
                  disabled={false}
                  inputType="input"
                  type="number"
                  class={"form-control input-style form-control-lg " + (dayPeymentHasError ? 'invalid' : '')}
                  text="Broj dana za plaćanje"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
                <Input
                  inputValue={creditLimitValue}
                  onInputChange={creditLimitChangeHandler}
                  onInputBlur={creditLimitBlurHandler}
                  hasInputError={creditLimitHasError}
                  disabled={false}
                  inputType="input"
                  type="number"
                  class={"form-control input-style form-control-lg " + (creditLimitHasError ? 'invalid' : '')}
                  text="Kreditni limit"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faFileInvoiceDollar} />Podaci o plaćanju:</Accordion.Header>
                <Accordion.Body>
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
                  <Input
                    inputValue={rabatValue}
                    onInputChange={rabatChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class="form-control input-style form-control-lg "
                    text="Rabat"
                  />
                  <Input
                    inputValue={nonInvoiceRabatValue}
                    onInputChange={nonInvoiceRabatChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class="form-control input-style form-control-lg "
                    text="Vanfakturni rabati"
                  />
                  <Input
                    inputValue={expectedDelayValue}
                    onInputChange={expectedDelayChangeHandler}
                    disabled={false}
                    inputType="input"
                    type="number"
                    class="form-control input-style form-control-lg "
                    text="Očekivano kašnjenje u plaćanju"
                  />
                </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="col-xl-6">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faMoneyCheckAlt} />Podaci o naplati:</Accordion.Header>
              <Accordion.Body>
                <Input
                  inputValue={billingAddressValue}
                  onInputChange={billingAddressChangeHandler}
                  onInputBlur={billingAddressBlurHandler}
                  hasInputError={billingAddressHasError}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class={"form-control input-style form-control-lg " + (billingAddressHasError ? 'invalid' : '')}
                  text="Adresa naplate"
                  text_class="m-0 required"
                  inputErrorText="je obavezna!"
                />
                <Input
                  inputValue={billingCityValue}
                  onInputChange={billingCityChangeHandler}
                  onInputBlur={billingCityBlurHandler}
                  hasInputError={billingCityHasError}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class={"form-control input-style form-control-lg " + (billingCityHasError ? 'invalid' : '')}
                  text="Grad naplate"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
                <Input
                  inputValue={billingStateValue}
                  onInputChange={billingStateChangeHandler}
                  onInputBlur={billingStateBlurHandler}
                  hasInputError={billingStateHasError}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class={"form-control input-style form-control-lg " + (billingStateHasError ? 'invalid' : '')}
                  text="Stanje naplate"
                  text_class="m-0 required"
                  inputErrorText="je obavezno!"
                />
                <Input
                  inputValue={billingZipValue}
                  onInputChange={billingZipChangeHandler}
                  onInputBlur={billingZipBlurHandler}
                  hasInputError={billingZipHasError}
                  disabled={false}
                  inputType="input"
                  type="number"
                  class={"form-control input-style form-control-lg " + (billingZipHasError ? 'invalid' : '')}
                  text="ZIP naplate"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
                <Input
                  inputValue={billingCountryValue}
                  onInputChange={billingCountryChangeHandler}
                  onInputBlur={billingCountryBlurHandler}
                  hasInputError={billingCountryHasError}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class={"form-control input-style form-control-lg " + (billingCountryHasError ? 'invalid' : '')}
                  text="Zemlja naplate"
                  text_class="m-0 required"
                  inputErrorText="je obavezna!"
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faTruck} />Podaci o dostavi:</Accordion.Header>
              <Accordion.Body>
                <Input
                    inputValue={shippingAddressValue}
                    onInputChange={shippingAddressChangeHandler}
                    onInputBlur={shippingAddressBlurHandler}
                    hasInputError={shippingAddressHasError}
                    disabled={false}
                    inputType="input"
                    type="text"
                    class={"form-control input-style form-control-lg " + (shippingAddressHasError ? 'invalid' : '')}
                    text="Adresa dostave"
                    text_class="m-0 required"
                    inputErrorText="je obavezna!"
                />
                <Input
                  inputValue={shippingCityValue}
                  onInputChange={shippingCityChangeHandler}
                  onInputBlur={shippingCityBlurHandler}
                  hasInputError={shippingCityHasError}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class={"form-control input-style form-control-lg " + (shippingCityHasError ? 'invalid' : '')}
                  text="Grad dostave"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
                <Input
                  inputValue={shippingStateValue}
                  onInputChange={shippingStateChangeHandler}
                  onInputBlur={shippingStateBlurHandler}
                  hasInputError={shippingStateHasError}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class={"form-control input-style form-control-lg " + (shippingStateHasError ? 'invalid' : '')}
                  text="Stanje dostave"
                  text_class="m-0 required"
                  inputErrorText="je obavezno!"
                />
                <Input
                  inputValue={shippingZipValue}
                  onInputChange={shippingZipChangeHandler}
                  onInputBlur={shippingZipBlurHandler}
                  hasInputError={shippingZipHasError}
                  disabled={false}
                  inputType="input"
                  type="number"
                  class={"form-control input-style form-control-lg " + (shippingZipHasError ? 'invalid' : '')}
                  text="ZIP dostave"
                  text_class="m-0 required"
                  inputErrorText="je obavezan!"
                />
                <Input
                  inputValue={shippingCountryValue}
                  onInputChange={shippingCountryChangeHandler}
                  onInputBlur={shippingCountryBlurHandler}
                  hasInputError={shippingCountryHasError}
                  disabled={false}
                  inputType="input"
                  type="text"
                  class={"form-control input-style form-control-lg " + (shippingCountryHasError ? 'invalid' : '')}
                  text="Zemlja dostave"
                  text_class="m-0 required"
                  inputErrorText="je obavezna!"
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <ConfirmModal confirmWhat={confirmWhat} confirm={confirm} />
    </div>
  );
}

export default CompanyDetails;