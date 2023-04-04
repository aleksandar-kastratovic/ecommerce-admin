import { useEffect, useState } from "react";

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faSave, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import Input from "./UI/Input";
import useInput from "../hooks/use-input";
import { toast } from "react-toastify";
import ConfirmModal from "./UI/ConfirmModal";

const LocationDetails = ({ locationData, saveLocation, removeLocation }) => {
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [confirmWhat, confirm] = useState();

    let {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput((value) => value.trim() !== "");

    let { value: cityValue, valueChangeHandler: cityChangeHandler, reset: resetCity } = useInput((value) => value.trim() !== "");

    let { value: zipValue, valueChangeHandler: zipChangeHandler, reset: resetZip } = useInput((value) => value.trim() !== "");

    let { value: addressValue, valueChangeHandler: addressChangeHandler, reset: resetAddress } = useInput((value) => value.trim() !== "");

    useEffect(() => {
        nameChangeHandler({ target: { value: locationData?.name ?? "" } });
        cityChangeHandler({ target: { value: locationData?.city ?? "" } });
        zipChangeHandler({ target: { value: locationData?.zip ?? "" } });
        addressChangeHandler({ target: { value: locationData?.address ?? "" } });
        setSelectedLocationId(locationData?.id ?? null);
    }, [locationData]);

    const submitHandler = () => {
        if (!nameIsValid) {
            toast.warning("Forma nije validna!");
            return;
        }
        saveLocation({
            id: selectedLocationId,
            name: nameValue,
            city: cityValue,
            zip: zipValue,
            address: addressValue,
        });
        resetName();
        resetCity();
        resetZip();
        resetAddress();
        setSelectedLocationId(null);
    };

    const removeLocationHandler = () => {
        removeLocation(selectedLocationId);
    };

    return (
        <div className="add-role-modal">
            <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button disabled={!nameIsValid} onClick={submitHandler} type="button" className="btn-control btn btn-add-details">
                    <FontAwesomeIcon className="me-1" icon={faSave} />
                    Sačuvajte
                </button>
                <button type="button" className="btn-control btn btn-delete-details" onClick={() => confirm(["Da li ste sigurni?", () => removeLocationHandler()])}>
                    <FontAwesomeIcon className="me-1" icon={faTrashAlt} />
                    Izbrišite
                </button>
            </div>
            <div className="row">
                <div className="col-12">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="alert-info">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                Podaci lokacije:
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
            <ConfirmModal confirmWhat={confirmWhat} confirm={confirm} />
        </div>
    );
};

export default LocationDetails;
