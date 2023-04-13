import { useEffect, useState } from "react";

import { faCog, faIcons } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import Input from "./UI/Input";
import noImage from "./../assets/images/no-image.png";
import useInput from "../hooks/use-input";
import { toast } from "react-toastify";

const SettingsDetails = ({ locationData, saveLocation, removeLocation }) => {
    let {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput((value) => value.trim() !== "");

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(undefined);

    useEffect(() => {
        nameChangeHandler({ target: { value: locationData?.name ?? "" } });
    }, [locationData]);

    const submitHandler = () => {
        if (!nameIsValid) {
            toast.warning("Forma nije validna!");
            return;
        }
        saveLocation({
            name: nameValue,
        });
        resetName();
    };

    return (
        <div className="add-role-modal">
            <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button disabled={!nameIsValid} onClick={submitHandler} type="button" className="btn-control btn btn-add-details">
                    <FontAwesomeIcon className="me-1" icon={faSave} />
                    Sačuvajte
                </button>
            </div>
            <div className="row">
                <div className="col-6">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="alert-info">
                                <FontAwesomeIcon icon={faCog} />
                                Osnovna podešavanja:
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-12">
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
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="col-6">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="alert-info">
                                <FontAwesomeIcon icon={faIcons} />
                                Logo:
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-12">
                                        <div>
                                            {selectedImage && (
                                                <div className="selected-img-container">
                                                    <img alt={selectedImage} src={selectedImage} />
                                                    <button
                                                        onClick={() => {
                                                            setSelectedImage(null);
                                                            setSelectedImageFile(null);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </div>
                                            )}
                                            {!selectedImage && (
                                                <div className="no-img-container">
                                                    <p className="no-img-text">Click here to add image.</p>
                                                    <img src={noImage} alt={noImage} />
                                                    <input
                                                        className="img-input"
                                                        type="file"
                                                        name="myImage"
                                                        accept="image/*"
                                                        onChange={(event) => addImg(event.target.files[0])}
                                                        onClick={(e) => (e.target.value = null)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default SettingsDetails;
