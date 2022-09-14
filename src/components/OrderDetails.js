import { faUserTag, faFlag, faFileAlt, faTruck, faArchive, faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./UI/Input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-contex";
import useInput from "../hooks/use-input";
import { Accordion, Form } from "react-bootstrap";
import { currencyFormat } from "../helpers/functions";
import { toast } from "react-toastify";
import { InputSelect } from "./shared/Form/FormInputs/FormInputs";

const OrderDetails = ({ orderData, saveOrderStatus }) => {
    const { referenceData } = useContext(AuthContext);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [statusData, setStatusData] = useState([]);

    let { value: statusValue, valueChangeHandler: statusChangeHandler, reset: resetStatus } = useInput((value) => value);

    useEffect(() => {
        statusChangeHandler({ target: { value: orderData?.status ?? "" } });
        setStatusAvailableData(orderData?.status);
        setSelectedOrderId(orderData?.id ?? null);
    }, [orderData]);

    const statusChanged = (ev) => {
        const valueInput = { target: { value: ev && ev.id !== null ? ev.id : ev } };
        statusChangeHandler(valueInput);
    };

    const setStatusAvailableData = (ev) => {
        let data = [];
        if (referenceData?.order_statuses && referenceData?.order_statuses.length > 0) {
            for (let item of referenceData.order_statuses) {
                if (item.id === ev) {
                    data.push(item);
                    for (let elem of referenceData.order_statuses) {
                        if (item.next.includes(elem.id)) {
                            data.push(elem);
                        }
                    }
                    break;
                }
            }
        }
        setStatusData(data);
    };

    const saveStatus = () => {
        if (statusValue) {
            saveOrderStatus({
                order_id: selectedOrderId,
                status: statusValue,
            });
        } else {
            toast.warning("Status nije odabran!");
            return;
        }
    };

    const [select, setSelect] = useState(0);

    return (
        <div className="add-role-modal order-details-page">
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="orders-item-holder">
                                <h5>Podaci partnera:</h5>
                                <div className="row order-data-accordion">
                                    <div className="col-xl-6">
                                        <ul>
                                            <li>
                                                Kompanija:<span>Demo billing company</span>
                                            </li>
                                            <li>
                                                Matični broj:<span>00323412</span>
                                            </li>
                                            <li>
                                                PIB:<span>17889232</span>
                                            </li>
                                            <li>
                                                Ulica:<span>Demo address bb/15</span>
                                            </li>
                                            <li>
                                                Grad:<span>Novi Beograd (Beograd)</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-xl-6">
                                        <ul>
                                            <li>
                                                Poštanski broj:<span>11000</span>
                                            </li>
                                            <li>
                                                Država:<span>Srbija</span>
                                            </li>
                                            <li>
                                                Telefon:<span>064/3654789</span>
                                            </li>
                                            <li>
                                                Mobilni telefon:<span>064/3654789</span>
                                            </li>
                                            <li>
                                                E-mail:<span>demo@company.com</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="orders-item-holder">
                                <h5>Adresa za dostavu:</h5>
                                <div className="row order-data-accordion">
                                    <div className="col-xl-6">
                                        <ul>
                                            <li>
                                                Adresa:<span>Demo address bb/15</span>
                                            </li>
                                            <li>
                                                Grad:<span>Novi Beograd (Beograd)</span>
                                            </li>
                                            <li>
                                                Poštanski broj:<span>11000</span>
                                            </li>
                                            <li>
                                                Država:<span>Srbija</span>
                                            </li>
                                            <li>
                                                Napomena:<span>-</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-xl-6">
                                        <ul>
                                            <li>
                                                Način plaćanja:<span>Preko računa</span>
                                            </li>
                                            <li>
                                                Način dostave:<span>Dostava na adresu</span>
                                            </li>
                                            <li>
                                                Poručilac:<span>Marko Marković</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="orders-item-holder">
                                <h5>Status porudžbine:</h5>
                                <div className="row order-status-accordion accordion-p-0-body">
                                    <div className="col-12">
                                        {/* <div className="row">
                                    <div className="col-6 order-status-select"> */}
                                        <InputSelect
                                            value={select}
                                            onChange={({ target }) => {
                                                setSelect(target.value);
                                            }}
                                            disabled={false}
                                            options={[
                                                { id: 0, name: "Novo" },
                                                { id: 1, name: "U obradi" },
                                                { id: 2, name: "Realizovano" },
                                            ]}
                                            class="form-control input-style form-control-lg select-style"
                                            label="Status narudžbenice:"
                                        />
                                        {/* </div>
                                    <div className="col-6 order-status-checkboxs">
                                      <Form.Group className="remember-checkbox remember-checkbox-details">
                                        <Form.Check
                                          type="checkbox"
                                          label="Pošaljite poruku kupcu"
                                        />
                                      </Form.Group>
                                      <Form.Group className="remember-checkbox remember-checkbox-details">
                                        <Form.Check
                                          type="checkbox"
                                          label="Pošaljite definisanu statusnu poruku"
                                        />
                                      </Form.Group>
                                    </div>
                                  </div> */}
                                    </div>
                                    {/* <div className="col-12 order-status-textarea">
                                  <Input
                                    // inputValue={descriptionValue}
                                    // onInputChange={descriptionChangeHandler}
                                    // inputErrorVisible={false}
                                    inputType="textarea"
                                    type="text"
                                    class={"form-control input-style form-control-lg"}
                                    text="Poruka za kupca:"
                                    text_class="m-0"
                                  />
                                </div> */}
                                </div>
                                <div className="col-12 order-status-buttons">
                                    <button onClick={() => saveStatus()} className="btn-control save-btn">
                                        Sačuvajte
                                    </button>
                                    {/* <button className="btn-control button-add">Istorija poruka</button> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-xl-6">
                      <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                              <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faInfoCircle} />Napomene:</Accordion.Header>
                              <Accordion.Body className="accordion-p-0">
                                <div className="row accordion-p-0-body">
                                  <div className="col-6">
                                    <Input
                                      isMulti={false}
                                      disabled={false}
                                      data={referenceData?.order_statuses ?? []}
                                      inputType="select-react"
                                      type="text"
                                      class="form-control input-style form-control-lg select-style"
                                      text="Odaberite status:"
                                    />
                                    <Input
                                      // inputValue={descriptionValue}
                                      // onInputChange={descriptionChangeHandler}
                                      // inputErrorVisible={false}
                                      inputType="textarea"
                                      type="text"
                                      class={"form-control input-style form-control-lg"}
                                      text="Napomena:"
                                      text_class="m-0"
                                    />
                                  </div>
                                  <div className="col-xl-6 align-self-center order-note-history">
                                    <ul className="history-note">
                                      <li><span className="badge badge-success">Poruka</span> <small>12:45 / 23.04.2021.</small> Test poruka broj jedan.</li>
                                      <hr/>
                                      <li><span className="badge badge-warning">Upozorenje</span> <small>12:45 / 23.04.2021.</small> Test poruka broj jedan.</li>
                                      <hr/>
                                      <li><span className="badge badge-info">Obaveštenje</span> <small>12:45 / 23.04.2021.</small> Test poruka broj jedan.</li>
                                      <hr/>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-12 order-status-buttons">
                                  <button className="btn-control save-btn">Sačuvajte</button>
                                  <button className="btn-control button-add">Istorija napomena</button>
                              </div>
                              </Accordion.Body>
                          </Accordion.Item>
                      </Accordion>
                    </div> */}
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="orders-item-holder">
                        <h5>Proizvodi u porudžbini:</h5>
                        <div className="order-items-accordion">
                            <div className="order-items-header-accordion">
                                <div className="row">
                                    <div className="col-3">
                                        <p>Proizvod:</p>
                                    </div>
                                    <div className="col-1">
                                        <p>Šifra:</p>
                                    </div>
                                    <div className="col-1">
                                        <p>Količina:</p>
                                    </div>
                                    <div className="col-1">
                                        <p>J.C. bez PDV:</p>
                                    </div>
                                    <div className="col-1">
                                        <p>PDV (%):</p>
                                    </div>
                                    <div className="col-1">
                                        <p>Iznos PDV:</p>
                                    </div>
                                    <div className="col-1">
                                        <p>Rabat (%):</p>
                                    </div>
                                    <div className="col-1">
                                        <p>Iznos rabata:</p>
                                    </div>
                                    <div className="col-1">
                                        <p>Ukupno:</p>
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            </div>
                            <div className="table-for-products">
                                <div className="row">
                                    <div className="col-3">
                                        <p>Demo artikal 1</p>
                                    </div>
                                    <div className="col-1">
                                        <p>123132234</p>
                                    </div>
                                    <div className="col-1">
                                        <p>1</p>
                                    </div>
                                    <div className="col-1">
                                        <p>{currencyFormat(1000)}</p>
                                    </div>
                                    <div className="col-1">
                                        <p>20</p>
                                    </div>
                                    <div className="col-1">
                                        <p>{currencyFormat(200)}</p>
                                    </div>
                                    <div className="col-1">
                                        <p>{0}</p>
                                    </div>
                                    <div className="col-1">
                                        <p>{currencyFormat(0)}</p>
                                    </div>
                                    <div className="col-1">
                                        <p>{currencyFormat(1200)}</p>
                                    </div>
                                    <div className="col-1 buttons-col"></div>
                                </div>
                            </div>
                            {orderData &&
                                orderData?.order_items &&
                                orderData?.order_items.map(function (object) {
                                    return (
                                        <div key={object.id} className="table-for-products">
                                            <div className="row">
                                                <div className="col-3">
                                                    <p>{object.name}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>{object.code}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>{object.quantity}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>{currencyFormat(object.price)}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>{object.vat}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>{currencyFormat(object.vat_amount)}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>{object.rebate}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>{currencyFormat(object.rebate_amount)}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>{currencyFormat(object.total_price)}</p>
                                                </div>
                                                <div className="col-1 buttons-col">
                                                    <a href={window.location.origin + "/products/" + object.id} className="btn-control btn btn-show-details" target="_blank" rel="noopener noreferrer">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="orders-item-holder">
                        <h5>Porudžbina:</h5>
                        <div className="row order-details-accordion">
                            <div className="col-12">
                                <h6>Porudžbina: B2B-2022-0000125</h6>
                                <hr />
                                <p>
                                    Vreme kreiranja:<span>01.01.2022.</span>
                                </p>
                                <p>
                                    Iznos:<span>{currencyFormat(1000) + " RSD"}</span>
                                </p>
                                {/* <p>Rabat:<span>{"- " + orderData.rebate + "%"}</span></p> */}
                                <p>
                                    Iznos rabata:<span>- {currencyFormat(0) + " RSD"}</span>
                                </p>
                                <p>
                                    Ukupna osnovica:<span>{currencyFormat(1000) + " RSD"}</span>
                                </p>
                                <p>
                                    PDV:<span>{currencyFormat(200) + " RSD"}</span>
                                </p>
                                {/* <p>Troškovi dostave:<span>???</span></p> */}
                                <hr />
                                <h6>
                                    Ukupno za uplatu:<span>{currencyFormat(1200) + " RSD"}</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
