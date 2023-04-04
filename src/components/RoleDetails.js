import { useContext, useEffect, useState } from "react";

import { faDesktop, faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import { faSave, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Form } from "react-bootstrap";
import Input from "./UI/Input";
import AuthContext from "../store/auth-contex";
import useInput from "../hooks/use-input";
import { toast } from "react-toastify";
import ConfirmModal from "./UI/ConfirmModal";

const RoleDetails = ({ roleData, saveRole, removeRole }) => {
    const { referenceData } = useContext(AuthContext);
    const [selectedScreensList, setSelectedScreensList] = useState(roleData && roleData.screen_ids ? roleData.screen_ids : []);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [selectedScreensValid, setSelectedScreensValid] = useState(false);
    const [confirmWhat, confirm] = useState();

    let {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput((value) => value.trim() !== "");

    useEffect(() => {
        setSelectedScreensList(roleData?.screen_ids ?? []);
        nameChangeHandler({ target: { value: roleData?.name ?? "" } });
        nameBlurHandler(null);
        setSelectedRoleId(roleData?.id ?? null);
        setSelectedScreensValid(roleData && roleData.screen_ids ? true : false);
    }, [roleData]);

    const checkScreen = (id) => {
        let idExsist = false;
        for (var i = 0; i < selectedScreensList.length; i++) {
            if (selectedScreensList[i] === id) {
                let data = [...selectedScreensList];
                data.splice(i, 1);
                setSelectedScreensValid(data.length > 0);
                setSelectedScreensList(data);
                idExsist = true;
            }
        }
        if (!idExsist) {
            setSelectedScreensList([...selectedScreensList, id]);
            setSelectedScreensValid(true);
        }
    };

    const submitHandler = () => {
        if (!nameIsValid || !selectedScreensValid) {
            toast.warning("Forma nije validna!");
            return;
        }
        saveRole({
            id: selectedRoleId,
            name: nameValue,
            screen_ids: selectedScreensList,
        });
        resetName();
        setSelectedScreensList([]);
        setSelectedRoleId(null);
    };

    const checkScreenIsSelected = (screnID) => {
        return selectedScreensList.includes(screnID);
    };

    const removeRoleHandler = () => {
        removeRole(selectedRoleId);
    };

    return (
        <div className="add-role-modal">
            <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button disabled={!nameIsValid || !selectedScreensValid} onClick={submitHandler} type="button" className="btn-control btn btn-add-details">
                    <FontAwesomeIcon className="me-1" icon={faSave} />
                    Sačuvajte
                </button>
                <button type="button" className="btn-control btn btn-delete-details" onClick={() => confirm(["Da li ste sigurni?", () => removeRoleHandler()])}>
                    <FontAwesomeIcon className="me-1" icon={faTrashAlt} />
                    Izbrišite
                </button>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="alert-info">
                                <FontAwesomeIcon icon={faPeopleArrows} />
                                Podaci uloge:
                            </Accordion.Header>
                            <Accordion.Body>
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
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="col-xl-6">
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header className="alert-warning">
                                <FontAwesomeIcon icon={faDesktop} />
                                Ekrani za ulogu:
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="row screens-wrapper">
                                    <p className="m-0 required form-control-label">Lista Ekrana:</p>
                                    {referenceData.screens !== undefined &&
                                        referenceData.screens.map(function (object) {
                                            return (
                                                <Form.Group key={object.id} className="remember-checkbox remember-checkbox-details" controlId="formBasicCheckbox5">
                                                    <Form.Check
                                                        checked={checkScreenIsSelected(object.id)}
                                                        id={object.id}
                                                        type="checkbox"
                                                        label={object.screen}
                                                        onChange={() => checkScreen(object.id)}
                                                    />
                                                </Form.Group>
                                            );
                                        })}
                                    <p className="error-text"> {!selectedScreensValid ? "Odaberite bar jedan ekran!" : ""} </p>
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

export default RoleDetails;
