import { Accordion, Modal } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faMoneyBill, faBoxes, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { inventoryOptions } from "../../helpers/const";
import { toast } from "react-toastify";

const EditVariantModal = ({ openModal, handleClose, saveVariant, selectedVariant, gallery, locationsMulti, checkVariantCombination }) => {

    let {
        value: priceValue,
        valueChangeHandler: priceChangeHandler,
        reset: resetPrice
    } = useInput((value) => value);

    let {
        value: purchasePriceValue,
        valueChangeHandler: purchasePriceChangeHandler,
        reset: resetPurchasePrice
    } = useInput((value) => value);

    let {
        value: skuValue,
        valueChangeHandler: skuChangeHandler,
        reset: resetSku
    } = useInput((value) => value);

    let {
        value: barcodeValue,
        valueChangeHandler: barcodeChangeHandler,
        reset: resetBarcode
    } = useInput((value) => value);

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedInventoryOptions, setSelectedInventoryOptions] = useState(inventoryOptions[1].id ?? null);
    const [locationsMultiQuantityList, setLocationsMultiQuantityList] = useState(locationsMulti ?? []);
    const [locationsQuantityList, setLocationsQuantityList] = useState({location_id: null, quantity: 0});
    const [selectedProductAttributesModal, setSelectedProductAttributesModal] = useState([]);
    const [variant, setVariant] = useState([]);
    const [variantError, setVariantError] = useState(false);
    const [variantBlur, setVariantBlur] = useState(false);

    useEffect(() => {
        priceChangeHandler({target: {value : (selectedVariant?.price ?? '') }});
        purchasePriceChangeHandler({target: {value : (selectedVariant?.purchase_price ?? '') }});
        if (selectedVariant?.images) {
            setSelectedImages(JSON.parse(JSON.stringify(selectedVariant.images)));
        } else {
            setSelectedImages([]);
        }
        if (selectedVariant?.locations && Array.isArray(selectedVariant?.locations)) {
            setLocationsMultiQuantityList(JSON.parse(JSON.stringify(selectedVariant.locations)));
            setSelectedInventoryOptions(inventoryOptions[0].id);
        } else if (selectedVariant?.locations && !Array.isArray(selectedVariant?.locations)) {
            setLocationsQuantityList(JSON.parse(JSON.stringify(selectedVariant.locations)));
            setSelectedInventoryOptions(inventoryOptions[1].id);
        }
        skuChangeHandler({target: {value : (selectedVariant?.sku ?? '') }});
        if (selectedVariant?.selectedProductAttributes) {
            setSelectedProductAttributesModal(JSON.parse(JSON.stringify(selectedVariant?.selectedProductAttributes)));
        }
        setVariant(selectedVariant?.variant_combinations ?? []);
    }, [selectedVariant]);

    const checkImage = (id) => {
        let idExsist = false;
        for (var i = 0; i < selectedImages.length; i++) {
            if (selectedImages[i] === id) {
                let data = [...selectedImages];
                data.splice(i, 1);
                setSelectedImages(data);
                idExsist = true;
            }
        }
        if (!idExsist) {
            setSelectedImages([...selectedImages, id]);
        }
    }

    const quantityMultiChange = (ev, index) => {
        let data = [...locationsMultiQuantityList];
        data[index].quantity = ev.target.value;
        setLocationsMultiQuantityList(data);
    }

    const quantityChange = (ev) => {
        let data = {...locationsQuantityList};
        data.quantity = ev.target.value;
        setLocationsQuantityList(data);
    }

    const submitHandler = () => {

        if ((!variant.length > 0) || variantError) {
            toast.warning("Forma nije validna!");
            return;
        }

        let locationsForSave = []; 
        if (selectedInventoryOptions) {
            locationsForSave = JSON.parse(JSON.stringify(locationsMultiQuantityList));
        } else {
            locationsForSave = JSON.parse(JSON.stringify(locationsQuantityList));
        }

        saveVariant({
            price: priceValue,
            purchase_price: purchasePriceValue,
            images: selectedImages,
            sku: skuValue,
            barcode: barcodeValue,
            locations: locationsForSave,
            variant_combinations: variant
        });
        handleClose();
        resetForm();
    };

    const attributeValuesChangeHandler = (ev, index) => {
        let data = [...selectedProductAttributesModal];
        data[index].valueIds = [];
        if (ev?.id) {
            data[index].valueIds.push(ev.id);
        }
        let variants = [];
        let variantsForCheck = [];

        data.map((item, index) => {
            if (item) {
                item.valueIds.map(value => {
                    if (value) {
                        variants[index] = value;
                        variantsForCheck.push(value);
                    }
                })
            }
        });

        checkVariantError(variantsForCheck);
        setVariant(variants);
        setSelectedProductAttributesModal(data);
    };

    const resetForm = () => {
        setSelectedImages([]);
        resetPurchasePrice();
        resetPrice();
        resetSku();
        resetBarcode();
        setLocationsMultiQuantityList(locationsMulti ?? []);
        setLocationsQuantityList(({location_id: null, quantity: 0}));
        setSelectedInventoryOptions(inventoryOptions[1].id);
        setSelectedProductAttributesModal([]);
        setVariantError(false);
        setVariantBlur(false);
        setVariant([]);
    }

    const checkImageIsSelected = (imageId) => {
        return selectedImages?.includes(imageId);
    };

    const variantBlurHandler = () => {
        if (!variantBlur) {
            setVariantBlur(true);
            checkVariantError(variant);
        }
    }

    const checkVariantError = (data) => {
        if (data.length < 1) {
            setVariantError(true);
        } else {
            setVariantError(checkVariantCombination(data));
        }
    }

    return (
        <Modal
            show={openModal}
            onHide={ () => { handleClose(); resetForm(); }}
            backdrop="static"
            keyboard={false}
            centered
            size="xl"
            scrollable={true}
            className="add-role-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Varijacija</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-xl-6">

                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className="alert-warning"><FontAwesomeIcon icon={faMoneyBill} />Cena:</Accordion.Header>
                                <Accordion.Body>
                                    <Input
                                        inputValue={priceValue}
                                        onInputChange={priceChangeHandler}
                                        disabled={false}
                                        inputType="input"
                                        type="number"
                                        class={"form-control input-style form-control-lg"}
                                        text="Cena"
                                    />
                                    <Input
                                        inputValue={purchasePriceValue}
                                        onInputChange={purchasePriceChangeHandler}
                                        disabled={false}
                                        inputType="input"
                                        type="number"
                                        class={"form-control input-style form-control-lg"}
                                        text="Nabavna cena"
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className="alert-warning"><FontAwesomeIcon icon={faBoxes} />Inventar:</Accordion.Header>
                                <Accordion.Body>
                                    <Input
                                        value={selectedInventoryOptions}
                                        isMulti={false}
                                        handleChange={(ev) => setSelectedInventoryOptions(ev.id)}
                                        data={inventoryOptions}
                                        disabled={false}
                                        inputType="select-react"
                                        type="text"
                                        class={"form-control input-style form-control-lg select-style form-control-4"}
                                        text="Tip skladištenja"
                                    />
                                    <div className="row row-m0">
                                        <div className="col-6 ps-0">
                                            <Input
                                                inputValue={skuValue}
                                                onInputChange={skuChangeHandler}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg"}
                                                text="SKU"
                                            />
                                        </div>
                                        <div className="col-6 pe-0">
                                            <Input
                                                inputValue={barcodeValue}
                                                onInputChange={barcodeChangeHandler}
                                                disabled={false}
                                                inputType="input"
                                                type="text"
                                                class={"form-control input-style form-control-lg form-control-6"}
                                                text="Bar-kod"
                                            />
                                        </div>
                                    </div>
                                    <hr className="form-fields-separation"></hr>
                                    <div className="row row-m0">
                                        <div className="col-6 ps-0">
                                            <p className="m-0 form-control-label">Naziv lokacije</p>
                                        </div>
                                        <div className="col-6 pe-0">
                                            <p className="m-0 form-control-label">Količina</p>
                                        </div>
                                    </div>
                                    <hr className="form-field-separation"></hr>
                                    { (locationsMultiQuantityList && selectedInventoryOptions) && ( locationsMultiQuantityList.map(function(object, index) {
                                        return (
                                            <div key={index} className="row row-m0 align-items-center no-error-text">
                                                <div className="col-6 ps-0">
                                                    <p className="warehouse-item-name">{object.name}</p>
                                                </div>
                                                <div className="col-6 pe-0">
                                                    <Input
                                                        inputValue={object.quantity}
                                                        onInputChange={(ev) => quantityMultiChange(ev, index)}
                                                        disabled={false}
                                                        inputType="input"
                                                        type="number"
                                                        class={"form-control input-style form-control-lg form-control-6"}
                                                    />
                                                </div>
                                                <hr className="form-field-separation"></hr>
                                            </div>
                                        )
                                    }))}

                                    {(!selectedInventoryOptions) && (
                                        <div className="row row-m0 align-items-center no-error-text">
                                            <div className="col-6 ps-0">
                                                <p className="warehouse-item-name">Jedna Lokacija</p>
                                            </div>
                                            <div className="col-6 pe-0">
                                                <Input
                                                    inputValue={locationsQuantityList.quantity}
                                                    onInputChange={(ev) => quantityChange(ev)}
                                                    disabled={false}
                                                    inputType="input"
                                                    type="number"
                                                    class={"form-control input-style form-control-lg form-control-6"}
                                                />
                                            </div>
                                            <hr className="form-field-separation"></hr>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </div>

                    <div className="col-xl-6">
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className="alert-warning"><FontAwesomeIcon icon={faImages} />Galerija:</Accordion.Header>
                                <Accordion.Body>
                                    <div className="galley-container galley-container-select">

                                        {gallery && ( gallery.map(function(object, index) {
                                            return (
                                                <div className={"selected-img-container" + (checkImageIsSelected(object.id) ? ' selected-img-var' : '') + ( selectedImages?.length > 0 && object.id === selectedImages[0] ? ' main-img-var' : '')} key={index} onClick={() => {checkImage(object.id)}}>
                                                    <img alt={object.image_url} src={object.image_url} />
                                                </div>
                                            );
                                        }))}
                                        
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        { selectedProductAttributesModal.length > 0 && (
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className="alert-warning"><FontAwesomeIcon icon={faLayerGroup} />Opcije:</Accordion.Header>
                                <Accordion.Body>
                                    {selectedProductAttributesModal.map(function(object, index) {
                                        return (
                                            <Input
                                                values={selectedProductAttributesModal[index].valueIds}
                                                isMulti={false}
                                                handleChange={(ev) => attributeValuesChangeHandler(ev, index)}
                                                onInputBlur={variantBlurHandler}
                                                data={selectedProductAttributesModal[index].data}
                                                disabled={false}
                                                inputType="select-react"
                                                hasInputError={variantError}
                                                type="text"
                                                class={"form-control input-style form-control-lg select-style form-control-8 " + (variantError ? 'invalid' : '')}
                                                text={"Vrednost opcije " + (index + 1)}
                                                key={index}
                                                text_class="m-0 required"
                                                inputErrorText={variant.length > 0 ? "nije jedinstvena!" : "je obavezna!"}
                                            />  
                                        )
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        )}

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn-control cancel-btn" onClick={() => {handleClose(); resetForm();}}>Odustanite</button>
                <button disabled={(!variant.length > 0) || variantError} type="button" className="btn-control save-btn" onClick={submitHandler}>Sačuvajte</button>
            </Modal.Footer>
        </Modal>
    );
}
  
export default EditVariantModal;