import { faBullhorn, faImages, faFileSignature, faLayerGroup, faMoneyBill, faRandom, faTimes, faBoxes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faSave, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Form } from "react-bootstrap";
import Input from "./UI/Input";
import useInput from "../hooks/use-input";
import DropdownTreeSelect from "react-dropdown-tree-select";
import noImage from "./../assets/images/no-image.png";
import { useEffect, useState } from "react";
import ImageCrop from "./UI/ImageCrop";
import useHttp from "../hooks/use-http";
import { imageForId, remappingCategories } from "../helpers/functions";
import { attributesListService, attributeValuesListService, categoryListService, locationsListService } from "../helpers/services";
import Loader from "./UI/Loader";
import EditVariantModal from "./UI/EditVariantModal";
import { inventoryOptions } from "../helpers/const";
import { toast } from "react-toastify";
import ConfirmModal from "./UI/ConfirmModal";
import DatailsTabs from "./UI/DatailsTabs";

const ProductDetails = ({ saveProduct, productData, addProduct, removeProduct }) => {

    const optionInit = { id: null, data:[], valueIds: [] };
    const variationInit = { variantId : null, mainImg: null, images: [], variant_name: '', price: null, purchase_price: null, sku: '', barcode: '', locations: [], variant_combinations: [] };

    let initTab = [
        {
            eventKey: 0,
            title: "Osnovne informacije:",
            icon: faFileSignature,
            order: 1
        },
        {
            eventKey: 1,
            title: "Galerija:",
            icon: faImages,
            order: 2
        },
        {
            eventKey: 2,
            title: "Cena:",
            icon: faMoneyBill,
            order: 3
        },
        {
            eventKey: 3,
            title: "Inventar:",
            icon: faBoxes,
            order: 4
        },
        // {
        //     eventKey: 4,
        //     title: "Opcije:",
        //     icon: faLayerGroup,
        //     order: 5
        // },
        // {
        //     eventKey: 5,
        //     title: "Varijacije:",
        //     icon: faRandom,
        //     order: 6
        // },
        // {
        //     eventKey: 6,
        //     title: "SEO optimizacija:",
        //     icon: faBullhorn,
        //     order: 7
        // }
    ];
    
    const [tabsList, setTabsList] = useState(initTab);
    const [activeTab, setActiveTab] = useState(initTab[0].eventKey);

    const { isLoading, sendRequest: categoryListRequest } = useHttp();
    const { isLoading2, sendRequest: productAttributeListRequest } = useHttp();

    const [confirmWhat, confirm] = useState();

    let {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput((value) => value.trim() !== '');

    let {
        value: additionalNameValue,
        valueChangeHandler: additionalNameChangeHandler,
        reset: resetAdditionalName
    } = useInput((value) => value);

    let {
        value: descriptionValue,
        valueChangeHandler: descriptionChangeHandler,
        reset: resetDescription
    } = useInput((value) => value);

    let {
        value: codeValue,
        valueChangeHandler: codeChangeHandler,
        reset: resetCode
    } = useInput((value) => value);

    let {
        value: unitValue,
        valueChangeHandler: unitChangeHandler,
        reset: resetUnit
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

    const [isView, setIsView] = useState(1);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [locationsLoaded, setLocationsLoaded] = useState(false);
    const [productId, setProductId] = useState(null);
    const [categoryIds, setCategoryIds] = useState([]);
    const [mainImg, setMainImg] = useState(null);
    const [mainImgFile, setMainImgFile] = useState(undefined);
    const [gallery, setGallery] = useState([]);
    const [galleryIds, setGalleryIds] = useState([]);
    const [galleryFile, setGalleryFile] = useState([]);
    const [galleryRemoveIds, setGalleryRemoveIds] = useState([]);
    const [dataForCrop, setDataForCrop] = useState(null);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [categoryFocus, setCategoryFocus] = useState(false);
    const [categoryHasFocus, setCategoryHasFocus] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryListCopy, setCategoryListCopy] = useState([]);
    const [productAttributeList, setProductAttributeList] = useState([]);
    const [variationsList, setVariationsList] = useState([]);
    const [locationsMultiQuantityList, setLocationsMultiQuantityList] = useState([]);
    const [locationsMultiQuantityInitList, setLocationsMultiQuantityInitList] = useState([]);
    const [locationsQuantityList, setLocationsQuantityList] = useState({location_id: null, quantity: 0});
    const [selectedInventoryOptions, setSelectedInventoryOptions] = useState(inventoryOptions[1].id ?? null);
    const [selectedVariationForEdit, setSelectedVariationForEdit] = useState({});
    const [isPromoted, setIsPromoted] = useState(0);

    const [selectedProductAttributes, setSelectedProductAttributes] = useState([optionInit]);

    useEffect(() => {

        const getCategories = async () => {
            let data = await categoryListService(categoryListRequest);
            data = remappingCategories(data);
            setCategoryList(JSON.parse(JSON.stringify(data)));
            setCategoryListCopy(JSON.parse(JSON.stringify(data)));
            setCategoriesLoaded(true);
        };

        getCategories();

    }, [categoryListRequest]);

    useEffect(() => {

        const setProdcutAttribute = async () => {
            const data = await attributesListService(productAttributeListRequest);
            setProductAttributeList(data);
        };
    
        setProdcutAttribute();
    }, [productAttributeListRequest]);

    useEffect(() => {

        // const setLocations = async () => {
        //     const data = await locationsListService(productAttributeListRequest);
        //     createLocationInit(data);
            setLocationsLoaded(true);
        // };
    
        // setLocations();
    }, [productAttributeListRequest]);

    useEffect(() => {
        if (productData && Object.keys(productData).length > 0 && categoriesLoaded && locationsLoaded) {
            setProductId(productData.id);
            nameChangeHandler({target: {value : (productData?.name ?? '') }});
            additionalNameChangeHandler({target: {value : (productData?.additional_name ?? '') }});
            descriptionChangeHandler({target: {value : (productData?.description ?? '') }});
            codeChangeHandler({target: {value : (productData?.code ?? '') }});
            unitChangeHandler({target: {value : (productData?.unit ?? '') }});
            setCategoryIds(productData.category_ids ? JSON.parse(JSON.stringify(productData.category_ids)) : []);
            productData.category_ids.map(id => {
                onChangeParentCategoryGet({value : id });
            });
            setIsPromoted(productData?.is_promoted ?? 0);
            setMainImg(productData?.main_image ?? null);
            setIsView(productData?.is_view ?? 1);
            skuChangeHandler({target: {value : (productData?.sku ?? '') }});
            barcodeChangeHandler({target: {value : (productData?.barcode ?? '') }});
            priceChangeHandler({target: {value : (productData?.price ?? '') }});
            purchasePriceChangeHandler({target: {value : (productData?.purchase_price ?? '') }});
            if (productData.locations?.length > 0) {
                if (productData.locations[0].location_id === null) {
                    setSelectedInventoryOptions(null);
                    setLocationsQuantityList({location_id: null, quantity: productData.locations[0].quantity});
                } else {
                    let data = (JSON.parse(JSON.stringify(locationsMultiQuantityInitList)));
                    data.map(item => {
                        productData.locations.map(elem =>{
                            if (item.id === elem.location_id) {
                                item.quantity = elem.quantity;
                            }
                        })
                    })
                    setSelectedInventoryOptions(1);
                    setLocationsMultiQuantityList(data);
                }
            }
            if (productData.options?.length > 0) {
                const data = [];
                productData.options.map(item => {
                    data.push({id: item.attribute_id, data:[], valueIds: item.variants })
                })
                getMoreAttributeValues(data);
            }
            if (productData.variants?.length > 0) {
                const data = [];
                productData.variants.map(item => {
                    data.push({
                        variantId: item.variantId,
                        images: item.images,
                        variant_name: item.variant_name,
                        price: item.price,
                        purchase_price: item.purchase_price,
                        sku: item.sku,
                        barcode: item.barcode,
                        variant_combinations: item.variant_combinations,
                        locations: createLocationsFromGet(item.locations),
                        mainImg: item.images.length > 0 ? imageForId(productData.image_ids, item.images[0]) : null
                    })
                })
                setVariationsList(data);
            }
            if (productData.image_ids?.length > 0) {
                const data = [];
                productData.image_ids.map(item => {
                    data.push(item.image_url);
                })
                setGallery(data);
                setGalleryIds(productData.image_ids);
            }
        }
    }, [productData, categoriesLoaded, locationsLoaded]);

    useEffect(() => {
        resetForm();
    }, [addProduct]);

    const resetForm = () => {
        setProductId(null);
        setCategoryIds([]);
        setCategoryList(JSON.parse(JSON.stringify(categoryListCopy)));
        resetName();
        setIsPromoted(0);
        resetAdditionalName();
        resetDescription();
        resetCode();
        resetUnit();
        resetSku();
        resetBarcode();
        resetPrice();
        resetPurchasePrice();
        setGallery([]);
        setGalleryFile([]);
        setGalleryIds([]);
        setGalleryRemoveIds([]);
        setSelectedProductAttributes([optionInit]);
        setVariationsList([]);
        setSelectedInventoryOptions(inventoryOptions[1].id);
        setIsView(1);
        setLocationsQuantityList({location_id: null, quantity: 0});
        setLocationsMultiQuantityList(JSON.parse(JSON.stringify(locationsMultiQuantityInitList)));
        setMainImg(null);
        setMainImgFile(undefined);
    };

    const createLocationsFromGet = (locations) => {
        if (locations.length > 0) {
            if ( locations.length > 0 && locations[0].location_id === null) {
                setSelectedInventoryOptions(null);
                return {location_id: null, quantity: locations[0].quantity};
            } else {
                let data = (JSON.parse(JSON.stringify(locationsMultiQuantityInitList)));
                data.map(item => {
                    locations.map(elem =>{
                        if (item.id === elem.location_id) {
                            item.quantity = elem.quantity;
                        }
                    })
                })
                return data;
            }
        } else {
            let data = (JSON.parse(JSON.stringify(locationsMultiQuantityInitList)));
            return data;
        }
    }

    const createLocationInit = (data) => {
        let locationData = [];
        if (data) {
            data.map(item => {
                locationData.push({id: item.id, name: item.name, quantity: 0});
                return false
            });
        }
        setLocationsMultiQuantityList(JSON.parse(JSON.stringify(locationData)));
        setLocationsMultiQuantityInitList(JSON.parse(JSON.stringify(locationData)));
    }

    const setAttributeValues = async (attributeId, index) => {
        if (attributeId) {
            const data = await getAttributeValues(attributeId);
            let currentData = [...selectedProductAttributes];
            currentData[index].data = data;
            setSelectedProductAttributes(currentData);
        } else {
            let currentData = [...selectedProductAttributes];
            currentData[index].data = [];
            setSelectedProductAttributes(currentData);
        }
    };

    const getAttributeValues = async (attributeId) => {
        const data = await attributeValuesListService({attribute_id: attributeId}, productAttributeListRequest);
        return data;
    }

    const getMoreAttributeValues = async (data) => {
        const dataCopy = JSON.parse(JSON.stringify(data));

        data.map(async (item, index) => {
            const response = await getAttributeValues(item.id);
            dataCopy[index].data = response;
            setSelectedProductAttributes(JSON.parse(JSON.stringify(dataCopy)));
        });
    };

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    };

    const addImg = async (img) => {
        setMainImgFile(img);
        const imageDataUrl = await readFile(img);
        setDataForCrop(
            {
                img: imageDataUrl,
                cropWidth: 500,
                cropHeight: 500,
                flag: 'category-img'
            }
        );
        setShow(true);
    };

    const removeImg = (index) => {
        let data = [...gallery];
        let dataFile = [...galleryFile];
        if ((index - (gallery.length - galleryFile.length)) > -1) {
            dataFile.splice(index - (gallery.length - galleryFile.length), 1);
            setGalleryFile(dataFile);
        }
        data.splice(index, 1);
        setGallery(data);
        let dataIds = [...galleryIds];
        if (galleryIds[index]?.image_url == gallery[index]) {
            setGalleryRemoveIds([...galleryRemoveIds, galleryIds[index].id]);
            dataIds.splice(index, 1);
            setGalleryIds(dataIds);
        } else {
            for (let [i, item] of galleryIds.entries()) {
                if (item.image_url == gallery[index]) {
                    setGalleryRemoveIds([...galleryRemoveIds, galleryIds[i].id]);
                    dataIds.splice(i, 1);
                    setGalleryIds(dataIds);
                }
            }
        }
    };

    const setCropedImg = (imgData) => {
        setMainImg(imgData.img);
        const iconFile = {
            file: imgData.imgFile,
            name: mainImgFile.name
        }
        setMainImgFile(iconFile);
        setDataForCrop(null);
    }

    const setMulitiImg = async(imgData) => {
        // setGallery([...gallery, imgData.img]);
        // const iconFile = {
        //     file: imgData.imgFile,
        //     name: galleryFile[galleryFile.length -1].name
        // }
        let data = [...galleryFile];
        let dataGallery = [...gallery];
        for (let item of imgData) {
            const imageDataUrl = await readFile(item);
            data.push(item);
            dataGallery.push(imageDataUrl);
        }
        setGalleryFile(data);
        setGallery(dataGallery);
        setDataForCrop(null);
    };

    const search = (tree, value, key = 'id', reverse = false) => {
        let returnData = {
            node: {},
            removed: false
        }
        for (const elem in tree) {
            let stack = [ tree[elem] ]
            while (stack.length) {
                const node = stack[reverse ? 'pop' : 'shift']()
                if (node[key] === value)  {
                    if (node.checked) {
                        node.checked = false;
                        returnData.removed = true;
                    } else {
                        node.checked = true;
                    }
                    returnData.node = node; 
                    return returnData
                }
                node.children && stack.push(...node.children)
            }
        }
        return null
    }

    const onChangeParentCategory = (currentNode) => {
        if (categoryList.length > 0) {
            const nodeData = search(categoryList, currentNode?.value, 'value');
            checkCategory(nodeData?.node.value);
        }
        
        setCategoryFocus(false);
    }
    
    const onChangeParentCategoryGet = (currentNode) => {
        if (categoryList.length > 0) {
            const nodeData = search(categoryList, currentNode?.value, 'value');
        }
        
        setCategoryFocus(false);
    }

    const checkCategory = (id) => {
        let idExsist = false;
        for (var i = 0; i < categoryIds.length; i++) {
            if (categoryIds[i] === id) {
            let data = [...categoryIds];
            data.splice(i, 1);
            setCategoryIds(data);
            idExsist = true;
            }
        }
        if (!idExsist) {
            setCategoryIds([...categoryIds, id]);
        }
    }

    const onNodeFocus = (currentNode) => {
        setCategoryFocus(true);
    }

    const onNodeBlur = (currentNode) => {
        setCategoryFocus(false);
        setCategoryHasFocus(true);
    }

    const productAttributesChangeHandler = (ev, index) => {
        let data = [...selectedProductAttributes];
        data[index].valueIds = [];
        if (data.some((elem, i) => elem.id === ev?.id && i !== index && ev)) {
            toast.warning("Opcija je već odabrana!");
            return
        }
        data[index].id = ev?.id;
        updateVariationsOnOptionsChange(data);
        setSelectedProductAttributes(data);
        setAttributeValues(data[index].id, index);
    };

    const attributeValuesChangeHandler = (ev, index) => {
        let data = [...selectedProductAttributes];
        data[index].valueIds = [];
        ev.filter((obj) => data[index].valueIds.push(obj.id));
        updateVariationsOnOptionsChange(data);
        setSelectedProductAttributes(data);
    };

    const removeSelectedProductAttributes = (index) => {
        let data = [...selectedProductAttributes];
        data.splice(index, 1);
        updateVariationsOnOptionsChange(data);   
        setSelectedProductAttributes(data);
    };

    const updateVariationsOnOptionsChange = (optionsData) => {
        let data = [];
        let dataFiltered = [];
        let indexWithAttributes = -1;
        optionsData.map((item, index) => {
            if (index > indexWithAttributes + 1 && indexWithAttributes > -1 && dataFiltered.length > 0) {
                data = [...dataFiltered];
                dataFiltered = [];
            }
            item.valueIds.map((value, index2) => {
                if (indexWithAttributes === -1) {
                    indexWithAttributes = index;
                }
                if (index > indexWithAttributes) {
                    data.map(elem => {
                        const combinedVariation = {...updateVariationsCombinations(elem, value, item.data)};
                        combinedVariation.position = combinedVariation.position + index2.toString() + index.toString();
                        dataFiltered.push(combinedVariation);
                    });
                } else {
                    let optItm = {...variationInit};
                    optItm.price = priceValue;
                    optItm.purchase_price = purchasePriceValue;
                    optItm.variant_combinations = [value];
                    optItm.position = index2.toString() + index.toString();
                    optItm.variant_name = nameValue + '-' + getNameForId(item.data, value);
                    optItm.locations = locationsQuantityList;
                    data.push(optItm);
                }
            });
        });
        if (dataFiltered.length === 0) {
            dataFiltered = data;
        }
        dataFiltered.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));
        if (skuValue.trim() !== '') {
            dataFiltered.map((item, index) => {
                if (index === 0 ) {
                    item.sku = skuValue;
                } else {
                    if (Number.isInteger(+skuValue)) {
                        item.sku = (+skuValue + index).toString();
                    } else {
                        item.sku = skuValue + '-' + index;
                    }
                }
                return false
            });
        }
        setVariationsList(dataFiltered);
    }

    const getNameForId = (data, id) => {
        let name = '';
        data.map(item => {
            if (item.id === id) {
                name = item.name; 
            }          
        });
        return name;
    };

    const updateVariationsCombinations = (item, itemForMerge, data) => {
        let mergedItem = {...item};
        mergedItem.variant_combinations = [...mergedItem.variant_combinations , itemForMerge];
        mergedItem.variant_name = mergedItem.variant_name + '-' + getNameForId(data, itemForMerge);
        return mergedItem;
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

    const prepareOptions = () => {
        const optionsForSave = [];
        selectedProductAttributes.map(item => {
            if (item.id && item.valueIds.length > 0) {
                optionsForSave.push({attribute_id: item.id, variants: item.valueIds})
            }
        })
        const variantsForSave = [];
        variationsList.map(item => {
            if (item.variant_combinations.length > 0) {
                variantsForSave.push({
                    variantId: item.variantId,
                    image_ids: item.images,
                    price: +item.price,
                    purchase_price: +item.purchase_price,
                    sku: item.sku,
                    barode: item.barcode,
                    locations: prepareVariantLocations(item.locations),
                    variant_combinations: item.variant_combinations
                });
            }
        })
        return {
            id: productId,
            name: nameValue,
            additional_name: additionalNameValue,
            description: descriptionValue,
            code: codeValue,
            unit: unitValue,
            is_view: isView,
            category_ids: categoryIds,
            is_promoted: isPromoted,
            images: prepareImages(),
            main_image: mainImgFile,
            removeImgIds: galleryRemoveIds,
            options: optionsForSave,
            variants: variantsForSave
        }
    }

    const prepareImages = () => {
        let dataForSave = [];
        if (galleryFile.length > 0) {
            dataForSave = new FormData();
            galleryFile.map((item, index) => {
                dataForSave.append("images[]", item, item.name);   
            });
        } else {
            dataForSave = new FormData();
            dataForSave.append("images", []);
        }
        return dataForSave;
    }

    const prepareLocations = () => {
        if (!selectedInventoryOptions) {
            let data = [JSON.parse(JSON.stringify(locationsQuantityList))];
            data[0].quantity = +data[0].quantity; 
            return data;
        } else {
            let data = [];
            locationsMultiQuantityList.map(item => {
                data.push({location_id: item.id, quantity: +item.quantity})       
            });
            return data;
        }
    }

    const prepareVariantLocations = (locationsData) => {
        let data = [];
        if (locationsData && Array.isArray(locationsData) ) {
            locationsData.map(item => {
                data.push({location_id: item.id, quantity: item.quantity})
            })
        } else {
            data[0] = locationsData;
        }
        return data;
    }

    const submitHandler = () => {
        if (!nameIsValid || categoryIds.length < 1) {
            toast.warning("Forma nije validna!");
            return;
        }
        if (selectedProductAttributes.length > 1 || (selectedProductAttributes.length > 0 && selectedProductAttributes[0].id)) {
            saveProduct(prepareOptions());
        } else {
            saveProduct({
                id: productId,
                name: nameValue,
                additional_name :additionalNameValue,
                description: descriptionValue,
                code: codeValue,
                unit: unitValue,
                is_view: isView,
                category_ids: categoryIds,
                options: [],
                variants: [],
                price: priceValue,
                purchase_price: purchasePriceValue,
                sku: skuValue,
                barcode: barcodeValue,
                locations: prepareLocations(),
                images: prepareImages(),
                main_image: mainImgFile,
                is_promoted: isPromoted,
                removeImgIds: galleryRemoveIds
            });
        }
    };

    const checkOptionValueIsSelected = (newVariations) => {
        let data = [...selectedProductAttributes];
        newVariations.map(nv => {
            for (let [index, item] of selectedProductAttributes.entries()) {
                if (item.data.some(elem => elem.id === nv ) && !item.valueIds.includes(nv)) {
                    if (!data[index].valueIds.includes(nv)) {
                        data[index].valueIds.push(nv);
                        break
                    }
                }
            }
        })
        setSelectedProductAttributes(data);
    }

    const changeVariant = (data) => {
        let oldData = {...selectedVariationForEdit};
        oldData.price = data.price;
        oldData.purchase_price = data.purchase_price;
        oldData.images = JSON.parse(JSON.stringify(data.images));
        oldData.sku = data.sku;
        oldData.variant_combinations = [];
        data.variant_combinations.map(item => {
            if (item) {
                oldData.variant_combinations.push(item);
            }
        })
        checkOptionValueIsSelected(oldData.variant_combinations);
        oldData.mainImg = oldData.images.length > 0 ? imageForId( galleryIds,oldData.images[0]) : null;
        oldData.barcode = data.barcode;
        oldData.locations = JSON.parse(JSON.stringify(data.locations));
        if (oldData.variant_name.trim() === '') {
            oldData.variant_name = nameValue;
            data.variant_combinations.map((item, index) => {      
                if (item) {
                    oldData.variant_name = oldData.variant_name + '-' + getNameForId(selectedProductAttributes[index].data, item);
                } 
            });
        }
        delete oldData["selectedProductAttributes"];
        const variationIndex = variationsList.findIndex((elem) => elem.variant_name == oldData.variant_name);
        let newData = JSON.parse(JSON.stringify(variationsList));
        if (variationIndex >= 0) {
            newData[variationIndex] = oldData;
        } else {
            newData.push(oldData);
        }
        setVariationsList(newData);
        setSelectedVariationForEdit({});
    }

    const addNewVariation = () => {
        let optItm = {...variationInit};
        let selectedProductAttributesReset = JSON.parse(JSON.stringify(selectedProductAttributes));
        selectedProductAttributesReset.map(item => {
            item.valueIds = [];        
        });
        optItm.selectedProductAttributes = selectedProductAttributesReset;
        optItm.locations = locationsQuantityList;
        optItm.price = priceValue;
        optItm.purchase_price = purchasePriceValue;
        optItm.sku = createNextSku();
        setSelectedVariationForEdit(optItm);
        setShowModal(true);
    }

    const createNextSku = () => {
        let sku = '';
        const lastSku = variationsList[variationsList.length - 1].sku;
        if (lastSku.trim() !== '') {
            if (Number.isInteger(+lastSku)) {
                sku = (+lastSku + 1).toString();
            } else {
                sku = lastSku.slice(0, lastSku.length - ((variationsList.length - 1).toString()).length);
                sku = sku + variationsList.length;
            }
        }
        return sku
    }

    const checkVariantCombination = (data) => {
        let variationsListCopy = JSON.parse(JSON.stringify(variationsList));
        data.map(elem => {
            variationsListCopy.map((item, index) => {
                if (data.length === item.variant_combinations.length ) {
                    if (item.variant_combinations.includes(elem)) {
                        if (variationsListCopy[index].duplicate !== false) {
                            variationsListCopy[index].duplicate = true;
                        }
                    } else {
                        variationsListCopy[index].duplicate = false;
                    }
                }
            })
        })
        return variationsListCopy.some((item) => item.duplicate === true);
    }

    const removeVariation = (index) => {
        let data = [...variationsList];
        let varList = [...selectedProductAttributes];
        const itemForRemove = data[index];
        data.splice(index, 1);
        setVariationsList(data);
        itemForRemove.variant_combinations.reverse().map((elem) => {
            if (data.length < 1) {
                varList = removeOptions(elem, varList);
            } else if (!checkIncludes(elem, data)) {
                varList = removeOptions(elem, varList);
            }
        })
        setSelectedProductAttributes(varList);
    }

    const removeOptions = (id, varList) => {
        let index = -1;
        selectedProductAttributes.map((elem, i) => {
            index = elem.valueIds.indexOf(id);
            if (index > -1) {
                varList[i].valueIds.splice(index, 1);
                if (varList[i].valueIds.length < 1) {
                    varList.splice(i, 1);
                }
            }
        })
        return varList;
    } 

    const checkIncludes = (id, array) => {
        let exsist = false;
        array.map((item) => {
            if (item.variant_combinations.includes(id)) {
                exsist = true;
                return exsist;
            }
        })
        return exsist;
    }

    return (
        <div className="add-role-modal">
            <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button
                    onClick={()=> submitHandler()}
                    type="button"
                    className="btn-control btn btn-add-details"
                    disabled={!nameIsValid || categoryIds.length < 1}
                >
                    <FontAwesomeIcon className="me-1" icon={faSave} />
                    Sačuvajte
                </button>
                <button
                    type="button"
                    className="btn-control btn btn-show-details"
                    onClick={()=> setIsView(isView === 0 ? 1 : 0)}
                >
                    {isView === 0 && (
                        <>
                            <FontAwesomeIcon className="me-1" icon={faEye} />
                            {'Prikazujte'}
                        </>
                    )}
                    {isView === 1 && (
                        <>
                            <FontAwesomeIcon className="me-1" icon={faEyeSlash} />
                            {'Ne prikazujte'}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    className="btn-control btn btn-delete-details"
                    onClick={() => confirm(["Da li ste sigurni?", ()=> removeProduct({product_ids: [productId]})])}
                    disabled={!productId || productId < 0}
                >
                    <FontAwesomeIcon className="me-1" icon={faTrashAlt} />
                    Izbrišite
                </button>
            </div>
            <div className="row">
                <div className="col-3">
                    <DatailsTabs
                        tabsData={tabsList}
                        activeTabKey={activeTab}
                        onTabChange={ (activeTabKey) => { setActiveTab(activeTabKey) }}
                    />
                </div>
                { activeTab === initTab[0].eventKey && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
                                <Input
                                    inputValue={nameValue}
                                    onInputChange={nameChangeHandler}
                                    onInputBlur={nameBlurHandler}
                                    hasInputError={nameHasError}
                                    disabled={false}
                                    inputType="input"
                                    type="text"
                                    class={"form-control input-style form-control-lg " + (nameHasError ? 'invalid' : '')}
                                    text="Naziv proizvoda"
                                    text_class="m-0 required"
                                    inputErrorText="je obavezan!"
                                />
                                <Input
                                    inputValue={additionalNameValue}
                                    onInputChange={additionalNameChangeHandler}
                                    inputErrorVisible={false}
                                    disabled={false}
                                    inputType="input"
                                    type="text"
                                    class={"form-control input-style form-control-lg "}
                                    text="Dodatni naziv"
                                    text_class="m-0"
                                />
                                <Input
                                    inputValue={descriptionValue}
                                    onInputChange={descriptionChangeHandler}
                                    inputErrorVisible={false}
                                    disabled={false}
                                    inputType="textarea"
                                    type="text"
                                    class={"form-control input-style form-control-lg "}
                                    text="Opis proizvoda"
                                    text_class="m-0"
                                />
                                <div className="row row-m0">
                                    <div className="col-12 p-0">
                                        <p htmlFor="dropdownTreeSelectCategory" className="m-0 form-control-label required">Kategorije</p>
                                        <DropdownTreeSelect
                                            className={
                                                "form-control input-style form-control-lg select-style dropdown-tree-multiselect-style dropdown-tree-style "
                                                + (categoryIds.length > 0 ? ' dropdown-tree-selected' : '')
                                                + (categoryFocus ? ' dropdown-tree-focus' : '')
                                            }
                                            id="dropdownTreeSelectCategory"
                                            data={categoryList}
                                            mode="hierarchical"
                                            texts={{ placeholder: ' ' }}
                                            onChange={onChangeParentCategory}
                                            onBlur={onNodeBlur}
                                            onFocus={onNodeFocus}
                                            clearSearchOnChange={true}
                                            keepTreeOnSearch
                                        />
                                        <p className="error-text">{(categoryIds.length < 1 && categoryHasFocus) ? 'Kategorija je obavezno polje!' : ''}</p>
                                    </div>
                                </div>
                                <Input
                                    inputValue={codeValue}
                                    onInputChange={codeChangeHandler}
                                    inputErrorVisible={false}
                                    disabled={false}
                                    inputType="input"
                                    type="text"
                                    class={"form-control input-style form-control-lg "}
                                    text="Šifra"
                                    text_class="m-0"
                                />
                                <Input
                                    inputValue={unitValue}
                                    onInputChange={unitChangeHandler}
                                    inputErrorVisible={false}
                                    disabled={false}
                                    inputType="input"
                                    type="text"
                                    class={"form-control input-style form-control-lg "}
                                    text="Jedinica mere"
                                    text_class="m-0"
                                />
                                <Form.Group className="remember-checkbox remember-checkbox-details">
                                    <Form.Check
                                        type="checkbox"
                                        label="Istaknut proizvod"
                                        checked={isPromoted}
                                        onChange={() => setIsPromoted(isPromoted ? 0 : 1)}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                )}

                { activeTab === initTab[2].eventKey && variationsList.length < 1 && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
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
                            </div>
                        </div>
                    </div>
                )}

            { activeTab === initTab[2].eventKey && variationsList.length > 0 && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
                                <div className="products-list-holder">
                                    <p className="seo-text">Cene možete videti u varijacijama.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                { activeTab === initTab[6]?.eventKey && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
                                <p className="seo-text">Popunite polja za SEO optimizaciju da bi se Vaš proizvod bolje pozicionirao na Google pretrazi.</p>
                                <hr className="form-fields-separation"></hr>
                                <Input
                                    inputValue={nameValue}
                                    onInputChange={nameChangeHandler}
                                    onInputBlur={nameBlurHandler}
                                    hasInputError={true} 
                                    disabled={false}
                                    inputType="input"
                                    type="text"
                                    class={"form-control input-style form-control-lg"}
                                    text="Naslov stranice"
                                    errorClass="info-text"
                                    inputErrorText="0 od 70 karaktera iskorišćeno."
                                />
                                <Input
                                    inputValue={nameValue}
                                    onInputChange={nameChangeHandler}
                                    onInputBlur={nameBlurHandler}
                                    hasInputError={true}
                                    disabled={false}
                                    inputType="textarea"
                                    type="text"
                                    class={"form-control input-style form-control-lg"}
                                    text="Meta ključne reči"
                                    text_class="m-0"
                                    inputErrorText="0 od 320 karaktera iskorišćeno."
                                />
                                <p className="info-text">0 od 320 karaktera iskorišćeno.</p>
                                <Input
                                    inputValue={nameValue}
                                    onInputChange={nameChangeHandler}
                                    onInputBlur={nameBlurHandler}
                                    hasInputError={true}
                                    disabled={false}
                                    inputType="textarea"
                                    type="text"
                                    class={"form-control input-style form-control-lg"}
                                    text="Meta opis"
                                    text_class="m-0"
                                    inputErrorText="0 od 320 karaktera iskorišćeno. Meta opis treba optimalno da sadrži između 150-160 znakova."
                                />
                                <p className="info-text">0 od 320 karaktera iskorišćeno. Meta opis treba optimalno da sadrži između 150-160 znakova.</p>
                                <Input
                                    inputValue={nameValue}
                                    onInputChange={nameChangeHandler}
                                    onInputBlur={nameBlurHandler}
                                    disabled={false}
                                    inputType="input"
                                    type="text"
                                    class={"form-control input-style form-control-lg"}
                                    text="URL ključ"
                                />
                            </div>
                        </div>
                    </div>
                )}

                { activeTab === initTab[1].eventKey && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper row">
                                <div className="col-xl-4">
                                    <div className="gallery-wrapper">
                                        {mainImg && (
                                            <div className="selected-img-container">
                                                <img alt={mainImg} src={mainImg} />
                                                <button onClick={()=> { setMainImg(null); setMainImgFile(null); }}><FontAwesomeIcon icon={faTimes} /></button>
                                            </div>
                                        )}
                                        
                                        {!mainImg && (
                                        <div className={"no-img-container " + (gallery?.length > 0 ? "add-more-img-container" : "")}>
                                            <p className="no-img-text">Click here to add main image.</p>
                                            <div className="add-more-img-wrapper">
                                                <img src={noImage} alt={noImage} />
                                            </div>
                                            <input
                                                className="img-input"
                                                type="file"
                                                name="myImage"
                                                accept="image/*"
                                                onChange={(event) => addImg(event.target.files[0])}
                                                onClick={e => (e.target.value = null)}
                                            />
                                        </div>
                                        )}

                                        <ImageCrop
                                            openModal={show}
                                            handleClose={() => {setShow(false)}}
                                            imageCroped={(imgData) => { setCropedImg(imgData);}}
                                            imgForCrooping={dataForCrop}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="gallery-wrapper">
                                        <div className="galley-container">
                                            {gallery && ( gallery.map(function(object, index) {
                                                return (
                                                    <div className="selected-img-container" key={index}>
                                                        <img alt={object} src={object} />
                                                        <button onClick={()=> { removeImg(index) }}><FontAwesomeIcon icon={faTimes} /></button>
                                                    </div>
                                                );
                                            }))}
                                        
                                            <div className={"no-img-container " + (gallery?.length > 0 ? "add-more-img-container" : "")}>
                                                <p className="no-img-text">Click here to add images.</p>
                                                <div className="add-more-img-wrapper">
                                                    <img src={noImage} alt={noImage} />
                                                </div>
                                                <input
                                                    className="img-input"
                                                    type="file"
                                                    multiple
                                                    name="myImage"
                                                    accept="image/*"
                                                    onChange={(event) => setMulitiImg(event.target.files)}
                                                    onClick={e => (e.target.value = null)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                { activeTab === initTab[3].eventKey && variationsList.length < 1 && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
                                {/* <Input
                                    value={selectedInventoryOptions}
                                    isMulti={false}
                                    handleChange={(ev) => setSelectedInventoryOptions(ev.id)}
                                    data={inventoryOptions}
                                    disabled={false}
                                    inputType="select-react"
                                    type="text"
                                    class={"form-control input-style form-control-lg select-style form-control-4"}
                                    text="Tip skladištenja"
                                /> */}
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
                                {/* <hr className="form-fields-separation"></hr>
                                <div className="row row-m0">
                                    <div className="col-6 ps-0">
                                        <p className="m-0 form-control-label">Naziv lokacije</p>
                                    </div>
                                    <div className="col-6 pe-0">
                                        <p className="m-0 form-control-label">Količina</p>
                                    </div>
                                </div>
                                <hr className="form-field-separation"></hr>
                                { (locationsMultiQuantityList !== undefined && selectedInventoryOptions) && ( locationsMultiQuantityList.map(function(object, index) {
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
                                )} */}
                            </div>
                        </div>
                    </div>
                )}

                { activeTab === initTab[3].eventKey && variationsList.length > 0 && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
                                <div className="products-list-holder">
                                    <p className="seo-text">Inventar možete videti u varijacijama.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                { activeTab === initTab[4]?.eventKey && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
                                {selectedProductAttributes.map(function(object, index) {
                                    return (
                                        <div key={index} className="row row-m0">
                                            <div className="col-4 ps-0">
                                                <Input
                                                    value={selectedProductAttributes[index].id}
                                                    isMulti={false}
                                                    handleChange={(ev) => productAttributesChangeHandler(ev, index)}
                                                    onInputBlur={nameBlurHandler}
                                                    data={productAttributeList}
                                                    disabled={false}
                                                    inputType="select-react"
                                                    type="text"
                                                    class={"form-control input-style form-control-lg select-style form-control-4"}
                                                    text={"Opcija " + (index + 1)}
                                                />
                                            </div>
                                            <div className="col-8 pe-0">
                                                <Input
                                                    values={selectedProductAttributes[index].valueIds}
                                                    isMulti={true}
                                                    handleChange={(ev) => attributeValuesChangeHandler(ev, index)}
                                                    onInputBlur={nameBlurHandler}
                                                    data={selectedProductAttributes[index].data}
                                                    disabled={false}
                                                    inputType="select-react"
                                                    type="text"
                                                    class={"form-control input-style form-control-lg select-style form-control-8"}
                                                    text={"Vrednost opcije " + (index + 1)}
                                                    remove={true}
                                                    onRemove={() => confirm(["Da li ste sigurni?", ()=> removeSelectedProductAttributes(index) ])}
                                                />
                                            </div>
                                        </div>     
                                    )
                                })}
                                <hr className="form-fields-separation"></hr>
                                <button
                                    className="btn-control save-btn"
                                    onClick={ () => setSelectedProductAttributes([...selectedProductAttributes, optionInit])}
                                >Dodajte opciju</button>
                            </div>
                        </div>
                    </div>
                )}

                { activeTab === initTab[5]?.eventKey && variationsList.length > 0 && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
                                <div className="products-list-holder">
                                    {variationsList.map(function(object, index) {
                                        return (
                                            <div className="row" key={index} onClick={() => { setShowModal(true); setSelectedVariationForEdit(variationsList[index]); }}>
                                                <div className="col-xl-1 align-self-center align-self-center">
                                                    { object.images.length > 0 && (
                                                        <img className="img-fluid" src={object.mainImg} alt={object.mainImg} />
                                                    )}

                                                    { object.images.length < 1 && (
                                                        <img className="img-fluid" src={noImage} alt={noImage} />
                                                    )}
                                                </div>
                                                <div className="col-xl-5 align-self-center">
                                                    <p>{object.variant_name}</p>
                                                </div>
                                                <div className="col-xl-2 align-self-center">
                                                    <p>{object.sku}</p>
                                                </div>
                                                <div className="col-xl-2 align-self-center">
                                                    <p>{object.price}</p>
                                                </div>
                                                {(object.locations instanceof Array) && (
                                                    <div className="col-xl-1 align-self-center">
                                                        <p>{object.locations.reduce((total, currentValue) => total = total + +currentValue.quantity,0)}</p>
                                                    </div>
                                                )}
                                                {!(object.locations instanceof Array) && (
                                                    <div className="col-xl-1 align-self-center">
                                                        <p>{object.locations.quantity}</p>
                                                    </div>
                                                )}
                                                <div className="col-xl-1 align-self-center">
                                                    <button onClick={(e) => {e.stopPropagation(); confirm(["Da li ste sigurni?", ()=> removeVariation(index) ])}} className="btn-control remove-options">X</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <hr className="form-field-separation"></hr>
                                    <button
                                        className="btn-control save-btn"
                                        onClick={ () => addNewVariation()}
                                    >Dodajte varijaciju</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                { activeTab === initTab[5]?.eventKey && variationsList.length < 1 && (
                    <div className="col-9 details-wrapper-spacing">
                        <div className="row">
                            <div className="col-xl-12 details-wrapper">
                                <div className="products-list-holder">
                                    <p className="seo-text">Odaberite opcije da bi ste imali varijacije.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {(isLoading || isLoading2) &&  (
                <Loader />
            )}
            <EditVariantModal
                openModal={showModal}
                handleClose={() => { setShowModal(false); setSelectedVariationForEdit({}); }}
                selectedVariant={selectedVariationForEdit}
                gallery={galleryIds}
                locationsMulti={locationsMultiQuantityInitList}
                saveVariant={(variantData) => { changeVariant(variantData); }}
                checkVariantCombination={checkVariantCombination}
            />
            <ConfirmModal confirmWhat={confirmWhat} confirm={confirm} />
        </div>
    );
}

export default ProductDetails;