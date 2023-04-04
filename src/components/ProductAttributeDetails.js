import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { faDesktop, faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import { faSave, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import Input from "./UI/Input";
import useInput from "../hooks/use-input";
import ConfirmModal from "./UI/ConfirmModal";

const ProductAttributeDetails = ({ productAttributeData, saveProductAttribute, removeProductAttribute }) => {
    const initState = [""];

    const [productAttributesValid, setProductAttributesValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [haveProductAttributeDuplicate, setHaveProductAttributeDuplicate] = useState(false);
    const [confirmWhat, confirm] = useState();

    const [productAttributes, setProductAttributes] = useState(productAttributeData && productAttributeData.attribute_value_name ? productAttributeData.attribute_value_name : initState);
    const [selectedProductAttributeId, setSelectedProductAttributeId] = useState(null);

    let {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput((value) => value.trim() !== "");

    useEffect(() => {
        nameChangeHandler({ target: { value: productAttributeData?.attribute_name ?? "" } });
        nameBlurHandler(null);
        setSelectedProductAttributeId(productAttributeData?.id ?? null);

        let data = [...(productAttributeData?.attribute_values ?? initState)];
        if (data instanceof Array) {
            data.push("");
        }
        setProductAttributes(data ?? initState);
        checkIsProductAttributesValid(data ?? initState);
        checkHaveProductAttributeDuplicate(data ?? initState);
        setIsTouched(false);
    }, [productAttributeData]);

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

    const submitHandler = () => {
        if (!nameIsValid || !productAttributesValid || haveProductAttributeDuplicate) {
            toast.warning("Forma nije validna!");
            return;
        }

        let data = [...productAttributes];

        data = data.filter((item) => item.trim() !== "");

        saveProductAttribute({
            id: selectedProductAttributeId,
            attribute_name: nameValue,
            attribute_values: data,
        });
        resetName();
        setProductAttributes(initState);
        setIsTouched(false);
        setSelectedProductAttributeId(null);
        setHaveProductAttributeDuplicate(false);
    };

    const removeProductAttributeHandler = () => {
        removeProductAttribute(selectedProductAttributeId);
    };

    const productAttributeChange = (e, index) => {
        let data = [...productAttributes];
        data[index] = e.target.value;
        if (data[index + 1] === undefined && e.target.value.trim() !== "") {
            data.push("");
        }
        setProductAttributes(data);
        checkIsProductAttributesValid(data);
        checkHaveProductAttributeDuplicate(data ?? initState);
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

    return (
        <div className="add-role-modal">
            <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button disabled={!nameIsValid || !productAttributesValid || haveProductAttributeDuplicate} onClick={submitHandler} type="button" className="btn-control btn btn-add-details">
                    <FontAwesomeIcon className="me-1" icon={faSave} />
                    Sačuvajte
                </button>
                <button type="button" className="btn-control btn btn-delete-details" onClick={() => confirm(["Da li ste sigurni?", () => removeProductAttributeHandler()])}>
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
            <ConfirmModal confirmWhat={confirmWhat} confirm={confirm} />
        </div>
    );
};

export default ProductAttributeDetails;
