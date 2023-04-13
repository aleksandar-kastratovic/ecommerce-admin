import { useState } from "react";

import { toast } from "react-toastify";
import { Accordion, Modal } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleArrows, faDesktop } from "@fortawesome/free-solid-svg-icons";

const AddProductAttributeModal = ({ openModal, handleClose, saveProductAttribute }) => {
    const initState = [""];

    const [productAttributes, setProductAttributes] = useState(initState);
    const [productAttributesValid, setProductAttributesValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [haveProductAttributeDuplicate, setHaveProductAttributeDuplicate] = useState(false);

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput((value) => value.trim() !== "");

    const productAttributeChange = (e, index) => {
        let data = [...productAttributes];
        data[index] = e.target.value;
        if (data[index + 1] === undefined && e.target.value.trim() !== "") {
            data.push("");
        }
        setProductAttributes(data);
        checkIsProductAttributesValid(data);
        checkHaveProductAttributeDuplicate(data);
    };

    const keyDownCheckToRemoveInput = (e, index) => {
        if (e.keyCode === 8 || e.keyCode === 46) {
            if ((index > 0 && index !== productAttributes.length - 1) || (productAttributes.length > 1 && index !== productAttributes.length - 1)) {
                let data = [...productAttributes];
                if (data[index] == "") {
                    data.splice(index, 1);
                    setProductAttributes(data);
                    checkIsProductAttributesValid(data);
                    return;
                }
            }
        }
    };

    const checkIsProductAttributesValid = (data) => {
        data.every((item) => {
            if (item.trim() !== "") {
                setProductAttributesValid(true);
                return false;
            } else {
                setProductAttributesValid(false);
            }
            return true;
        });
    };

    const checkHaveProductAttributeDuplicate = (productAttributeList) => {
        const uniqueElements = new Set(productAttributeList);
        const filteredElements = productAttributeList.filter((item) => {
            if (uniqueElements.has(item)) {
                uniqueElements.delete(item);
            } else {
                return item;
            }
        });

        if (filteredElements.length > 0) {
            setHaveProductAttributeDuplicate(true);
        } else {
            setHaveProductAttributeDuplicate(false);
        }
    };

    const submitHandler = () => {
        if (!nameIsValid || !productAttributesValid || haveProductAttributeDuplicate) {
            toast.warning("Forma nije validna!");
            return;
        }

        let data = [...productAttributes];

        data = data.filter((item) => item.trim() !== "");

        saveProductAttribute({
            attribute_name: nameValue,
            attribute_values: data,
        });
        handleClose();
        resetName();
        setProductAttributes(initState);
        setProductAttributesValid(false);
        setIsTouched(false);
        setHaveProductAttributeDuplicate(false);
    };

    return (
        <Modal show={openModal} onHide={handleClose} backdrop="static" keyboard={false} centered size="xl" scrollable={true} className="add-role-modal">
            <Modal.Header closeButton>
                <Modal.Title>Nova varijacija</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-xl-6">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="alert-info">
                                    <FontAwesomeIcon icon={faPeopleArrows} />
                                    Podaci atributa:
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
                                    Vrednosti atributa:
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p className="m-0 required form-control-label">Vrednosti atributa:</p>
                                    {productAttributes !== undefined &&
                                        productAttributes.map(function (object, index) {
                                            return (
                                                <Input
                                                    key={index}
                                                    inputValue={object}
                                                    onInputChange={(e) => productAttributeChange(e, index)}
                                                    onInputKeyDown={(e) => keyDownCheckToRemoveInput(e, index)}
                                                    onInputBlur={() => setIsTouched(true)}
                                                    hasInputError={(!productAttributesValid && isTouched) || (haveProductAttributeDuplicate && isTouched)}
                                                    disabled={false}
                                                    inputType="input"
                                                    type="text"
                                                    class={"form-control input-style form-control-lg"}
                                                    text_class="m-0 required"
                                                    inputErrorText={!productAttributesValid ? "Atribut proizvoda je obavezan!" : "Vrednost atributa mora biti jedinstvena!"}
                                                />
                                            );
                                        })}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn-control cancel-btn" onClick={handleClose}>
                    Odustanite
                </button>
                <button disabled={!nameIsValid || !productAttributesValid || haveProductAttributeDuplicate} type="button" className="btn-control save-btn" onClick={submitHandler}>
                    Sačuvajte
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddProductAttributeModal;
