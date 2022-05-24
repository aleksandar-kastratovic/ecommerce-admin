import { faUserTag, faFlag, faFileAlt, faTruck, faArchive, faInfoCircle, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./UI/Input";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-contex";
import useInput from "../hooks/use-input";
import { Accordion, Form } from "react-bootstrap";
import { currencyFormat } from '../helpers/functions';
import { toast } from 'react-toastify';

const OrderDetails = ({ orderData, saveOrderStatus }) => {

  const { referenceData } = useContext(AuthContext);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [statusData, setStatusData] = useState([]);

  let {
    value: statusValue,
    valueChangeHandler: statusChangeHandler,
    reset: resetStatus
  } = useInput((value) => value);

  useEffect(() => {
    statusChangeHandler({target: {value : (orderData?.status ?? '') }});
    setStatusAvailableData(orderData?.status);
    setSelectedOrderId(orderData?.id ?? null);
  }, [orderData]);

  const statusChanged = (ev) => {
    const valueInput = {target: {value : (ev && ev.id !== null) ? ev.id : ev}};
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
          break
        }
      }
    }
    setStatusData(data);
  };

  const saveStatus = () => {
    if (statusValue) {
      saveOrderStatus({
        order_id: selectedOrderId,
        status: statusValue
      });
    } else {
      toast.warning("Status nije odabran!");
      return;
    }
  }

  return (
    <div className="add-role-modal order-details-page">
        <div className="row">
            <div className="col-xl-12">
                <div className="row">
                    <div className="col-xl-6">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faUserTag} />Podaci partnera:</Accordion.Header>
                                <Accordion.Body>
                                    <div className="row order-data-accordion">
                                    <div className="col-xl-6">
                                        <ul>
                                          <li>Kompanija:<span>{orderData.company_name}</span></li>
                                          <li>Matični broj:<span>{orderData.registry_number}</span></li>
                                          <li>PIB:<span>{orderData.tin}</span></li>
                                          <li>Ulica:<span>{orderData.billing_address}</span></li>
                                          <li>Grad:<span>{orderData.billing_city}</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-xl-6">
                                        <ul>
                                          <li>Poštanski broj:<span>{orderData.billing_zip}</span></li>
                                          <li>Država:<span>{orderData.billing_country}</span></li>
                                          <li>Telefon:<span>{orderData.phone}</span></li>
                                          <li>Mobilni telefon:<span>{orderData.mobile_phone}</span></li>
                                          <li>E-mail:<span>{orderData.email}</span></li>
                                        </ul>
                                    </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className="col-xl-6">
                      <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faTruck} />Dodatne informacije:</Accordion.Header>
                                <Accordion.Body>
                                    <div className="row order-data-accordion">
                                        <div className="col-xl-6">
                                            <ul>
                                              <li>Adresa:<span>{orderData.shipping_address}</span></li>
                                              <li>Grad:<span>{orderData.shipping_city}</span></li>
                                              <li>Poštanski broj:<span>{orderData.shipping_zip}</span></li>
                                              <li>Država:<span>{orderData.shipping_country}</span></li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-6">
                                            <ul>
                                              <li>Način plaćanja:<span>???</span></li>
                                              <li>Način dostave:<span>???</span></li>
                                              <li>Poručilac:<span>{orderData.full_name}</span></li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-12">
                                          <li>Napomena:<span>{orderData.note}</span></li>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className="col-xl-12">
                <div className="row">
                    <div className="col-xl-6">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faFlag} />Status porudžbine:</Accordion.Header>
                            <Accordion.Body className=" accordion-p-0">
                              <div className="row order-status-accordion accordion-p-0-body">
                                <div className="col-12">
                                  {/* <div className="row">
                                    <div className="col-6 order-status-select"> */}
                                      <Input
                                        value={statusValue}
                                        isMulti={false}
                                        handleChange={statusChanged}
                                        disabled={false}
                                        data={statusData ?? []}
                                        inputType="select-react"
                                        type="text"
                                        class="form-control input-style form-control-lg select-style"
                                        text="Status narudžbenice:"
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
                                <button onClick={() => saveStatus()} className="btn-control save-btn">Sačuvajte</button>
                                {/* <button className="btn-control button-add">Istorija poruka</button> */}
                              </div>
                            </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
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
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faArchive} />Proizvodi u porudžbini:</Accordion.Header>
                                <Accordion.Body>
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
                                          <div className="col-1">
                                          </div>
                                        </div>
                                      </div>
                                      {orderData && orderData?.order_items && orderData?.order_items.map(function(object) {
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
                                                <p>{currencyFormat(object.price_with_tax)}</p>
                                              </div>
                                              <div className="col-1">
                                                <p>???</p>
                                              </div>
                                              <div className="col-1">
                                                <p>???</p>
                                              </div>
                                              <div className="col-1">
                                                <p>???</p>
                                              </div>
                                              <div className="col-1">
                                                <p>???</p>
                                              </div>
                                              <div className="col-1">
                                                <p>{currencyFormat(object.total_price)}</p>
                                              </div>
                                              <div className="col-1 buttons-col">
                                                <a
                                                  href={window.location.origin + "/products/" + object.id}
                                                  className="btn-control btn btn-show-details"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  <FontAwesomeIcon icon={faEye} />
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className="col-xl-12">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faFileAlt} />Porudžbina:</Accordion.Header>
                                <Accordion.Body>
                                    <div className="row order-details-accordion">
                                        <div className="col-12">
                                            <h5>Porudžbina: {orderData.order_name}</h5>
                                            <hr/>
                                            <p>Vreme kreiranja:<span>{orderData.order_date}</span></p>
                                            <p>Iznos:<span>{currencyFormat(orderData.base_total_price) + " RSD"}</span></p>
                                            <p>Rabat:<span>{"- " + orderData.rebate + "%"}</span></p>
                                            <p>Iznos rabata:<span>- {currencyFormat(orderData.rebate_amount) + " RSD"}</span></p>
                                            <p>Osnovica:<span>{currencyFormat(orderData.price_discounted) + " RSD"}</span></p>
                                            <p>PDV:<span>{currencyFormat(orderData.vat_amount) + " RSD"}</span></p>
                                            {/* <p>Troškovi dostave:<span>???</span></p> */}
                                            <hr/>
                                            <h5>Ukupno za uplatu:<span>{currencyFormat(orderData.total_price) + " RSD"}</span></h5>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
        </div>
    </div>
  );
}

export default OrderDetails;