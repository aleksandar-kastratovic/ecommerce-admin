import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faSave, faTrashAlt  } from "@fortawesome/free-regular-svg-icons";
import { Accordion, Form } from "react-bootstrap";
import Input from "./UI/Input";
import ImageCrop from "./UI/ImageCrop";
import useInput from "../hooks/use-input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { remappingCategories } from "../helpers/functions";
import noImage from "./../assets/images/no-image.png";
import ConfirmModal from "./UI/ConfirmModal";

const CategoryDetails = ({ categoryListData, categorySynchroListData, saveCategory, removeCategory, categoryData, addCategory }) => {

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput((value) => value.trim() !== '');

    const {
        value: parentIdValue,
        valueChangeHandler: parentIdValueChangeHandler
    } = useInput((value) => value);
    
    const {
        value: seoKeyValue,
        valueChangeHandler: seoKeyChangeHandler,
        reset: resetSeoKey
    } = useInput((value) => value);

    const {
        value: seoDecriptionValue,
        valueChangeHandler: seoDecriptionChangeHandler,
        reset: resetSeoDecription
    } = useInput((value) => value);

    const [categoryFocus, setCategoryFocus] = useState(false);
    let [categoryList, setCategoryList] = useState([]);
    const [selectedScreenId, setSelectedScreenId] = useState(null);
    let [categorySynchroList, setCategorySynchroList] = useState([]);
    const [categorySynchroListCopy, setCategorySynchroListCopy] = useState([]);
    const [categorySynchroFocus, setCategorySynchroFocus] = useState(false);
    const [categorySynchroIds, setCategorySynchroIds] = useState([]);

    const [confirmWhat, confirm] = useState();
    const [dataForCrop, setDataForCrop] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(undefined);
    const [selectedIconFile, setSelectedIconFile] = useState(undefined);
    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(1);

    useEffect(() => {
        resetForm();
    }, [addCategory]);


    const resetForm = () => {
        setSelectedScreenId(null);
        setSelectedImage(null);
        setSelectedIcon(null);
        setSelectedImageFile(undefined);
        setSelectedIconFile(undefined);
        resetName();
        if (parentIdValue > 0) {
            onChangeParentCategory({value : (parentIdValue) });
        }
        setCategorySynchroIds([]);
        setCategorySynchroList(JSON.parse(JSON.stringify(categorySynchroListCopy)));
        resetSeoKey();
        resetSeoDecription();
        setIsActive(1);
    };

    useEffect(() => {
        setSelectedScreenId(categoryData?.id ?? null);
        setCategorySynchroIds(categoryData?.category_import_ids ? JSON.parse(JSON.stringify(categoryData.category_import_ids)) : []);
        categoryData?.category_import_ids?.map(id => {
            onChangeSynchroCategoryGet({value : id });
        });
        nameChangeHandler({target: {value : (categoryData?.name ?? '') }});
        if (categoryData?.name) {
            nameBlurHandler(null);
        }
        if (parentIdValue > 0) {
            onChangeParentCategory({value : (parentIdValue) });
        }
        if (categoryData?.parent_id > 0) {
            onChangeParentCategory({value : (categoryData.parent_id) });
        }
        seoKeyChangeHandler({target: {value : (categoryData?.seo_word ?? '') }});
        seoDecriptionChangeHandler({target: {value : (categoryData?.seo_description ?? '') }});
        setIsActive(categoryData?.is_active ?? 1);
        setSelectedImage(categoryData?.image ?? null);
        setSelectedIcon(categoryData?.icon ?? null);
    }, [categoryData]);

    useEffect(() => {
        let data = [...categorySynchroListData];
        data = remappingCategories(data);
        setCategorySynchroList(JSON.parse(JSON.stringify(data)));
        setCategorySynchroListCopy(JSON.parse(JSON.stringify(data)));
    }, [categorySynchroListData]);

    useEffect(() => {
        let data = [...categoryListData];
        data = remappingCategories(data);
        setCategoryList(data);
        if (parentIdValue > 0) {
            onChangeParentCategory({value : (parentIdValue) });
        }
    }, [categoryListData]);

    const submitHandler = () => {
        if (!nameIsValid) {
            toast.warning("Forma nije validna!");
            return;
        }
        saveCategory({
            id: selectedScreenId,
            is_active: isActive,
            name: nameValue,
            parent_id: parentIdValue,
            seo_word: seoKeyValue,
            category_import_ids: categorySynchroIds,
            seo_description: seoDecriptionValue,
            image: selectedImageFile,
            icon: selectedIconFile
        });
        resetForm();
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
                } else if (node.checked) {
                    node.checked = false;
                    returnData.removed = true;
                }
                node.children && stack.push(...node.children)
            }
        }
        return null
    }

    const searchSynchro = (tree, value, key = 'id', reverse = false) => {
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

    const searchWhenNotUncheked = (tree, value, key = 'id', reverse = false) => {
        for (const elem in tree) {
            let stack = [ tree[elem] ]
            while (stack.length) {
                const node = stack[reverse ? 'pop' : 'shift']()
                if (node[key] !== value)  {
                    if (node.checked) {
                        node.checked = false;
                        return null
                    }
                }
                node.children && stack.push(...node.children)
            }
        }
        return null
    }

    const onChangeParentCategory = (currentNode, isRemoved) => {
        const nodeData = search(categoryList, currentNode?.value, 'value');
        if (parentIdValue != '' && !isRemoved) {
            if (!nodeData.removed) {
                searchWhenNotUncheked(categoryList, currentNode?.value, 'value');
            }
        }
        parentIdValueChangeHandler({target: {value : (nodeData?.node.checked ? nodeData.node.value : '') }});
        setCategoryFocus(false);
    }

    const onNodeFocus = (currentNode) => {
        setCategoryFocus(true);
    }

    const onNodeBlur = (currentNode) => {
        setCategoryFocus(false);
    }

    const onChangeSynchroCategory = (currentNode) => {
        if (categorySynchroList.length > 0) {
            const nodeData = searchSynchro(categorySynchroList, currentNode?.value, 'value');
            checkCategory(nodeData?.node.value);
        }
        
        setCategoryFocus(false);
    }

    const onChangeSynchroCategoryGet = (currentNode) => {
        if (categorySynchroList.length > 0) {
            const nodeData = searchSynchro(categorySynchroList, currentNode?.value, 'value');
        }
        
        setCategoryFocus(false);
    }

    const checkCategory = (id) => {
        let idExsist = false;
        for (var i = 0; i < categorySynchroIds.length; i++) {
            if (categorySynchroIds[i] === id) {
            let data = [...categorySynchroIds];
            data.splice(i, 1);
            setCategorySynchroIds(data);
            idExsist = true;
            }
        }
        if (!idExsist) {
            setCategorySynchroIds([...categorySynchroIds, id]);
        }
    }

    const onNodeSynchroFocus = (currentNode) => {
        setCategorySynchroFocus(true);
    }

    const onNodeSynchroBlur = (currentNode) => {
        setCategorySynchroFocus(false);
    }

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        })
    }

    const addImg = async (img) => {
        setSelectedImageFile(img);
        const imageDataUrl = await readFile(img);
        setDataForCrop(
            {
                img: imageDataUrl,
                cropWidth: 1000,
                cropHeight: 500,
                flag: 'category-img'
            }
        );
        setShow(true);
    }

    const addIcon = async (icon) => {
        setSelectedIconFile(icon);
        const imageDataUrl = await readFile(icon);
        setDataForCrop(
            {
                img: imageDataUrl,
                cropWidth: 512,
                cropHeight: 512,
                flag: 'category-icon'
            }
        );
        setShow(true);
    }

    const setCropedImg = (imgData) => {
        if (imgData.flag == 'category-icon') {
            setSelectedIcon(imgData.img);
            var iconFile = new FormData();
            iconFile.append('icon', imgData.imgFile, selectedIconFile.name);
            setSelectedIconFile(iconFile);
        } else if (imgData.flag == 'category-img') {
            setSelectedImage(imgData.img);
            var imageFile = new FormData();
            imageFile.append('image', imgData.imgFile, selectedImageFile.name);
            setSelectedImageFile(imageFile);
        }
    }

    const removeCategoryHandler = () => {
        if (selectedScreenId > 0) {
            removeCategory(selectedScreenId);
            resetForm();
        }
    }

    return (
        <div className="add-role-modal col-pr-2">
            <div className="btn-group mb-4" role="group" aria-label="Basic example">
            <button
                disabled={!nameIsValid}
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
                disabled={!selectedScreenId > 0}
                onClick={() => confirm(["Da li ste sigurni?", ()=> removeCategoryHandler() ])}
            >
                <FontAwesomeIcon className="me-1" icon={faTrashAlt} />
                Izbrišite
            </button>
            </div>
            <div className="row">
                <div className="col-xl-12">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="alert-info"><FontAwesomeIcon icon={faUser} />Podaci o kategoriji:</Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-12">
                                        <Form.Group className="remember-checkbox remember-checkbox-details">
                                            <Form.Check
                                                type="checkbox"
                                                label="Aktivna"
                                                checked={isActive}
                                                onChange={() => setIsActive(isActive ? 0 : 1)}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-6">
                                        <Input
                                            inputValue={nameValue}
                                            onInputChange={nameChangeHandler}
                                            onInputBlur={nameBlurHandler}
                                            hasInputError={nameHasError}
                                            disabled={false}
                                            inputType="input"
                                            type="text"
                                            class={"form-control input-style form-control-lg " + (nameHasError ? 'invalid' : '')}
                                            text="Naziv kategorije"
                                            text_class="m-0 required"
                                            inputErrorText="je obavezan!"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <p htmlFor="dropdownTreeSelectCategory" className="m-0 form-control-label">Roditeljska kategorija</p>
                                        <DropdownTreeSelect
                                            className={
                                                "form-control input-style form-control-lg select-style dropdown-tree-style "
                                                + (parentIdValue != '' ? ' dropdown-tree-selected' : '')
                                                + (categoryFocus ? ' dropdown-tree-focus' : '')
                                            }
                                            id="dropdownTreeSelectCategory"
                                            data={categoryList}
                                            mode="radioSelect"
                                            texts={{ placeholder: ' ' }}
                                            onChange={onChangeParentCategory}
                                            onBlur={onNodeBlur}
                                            onFocus={onNodeFocus}
                                            keepTreeOnSearch
                                        />
                                        <p className="error-text"></p>
                                    </div>
                                    <div className="col-12">
                                        <p htmlFor="dropdownTreeSelectCategory" className="m-0 form-control-label">ERP sinhronizacija</p>
                                        <DropdownTreeSelect
                                            className={
                                                "form-control input-style form-control-lg select-style dropdown-tree-multiselect-style dropdown-tree-style "
                                                + (categorySynchroIds.length > 0 ? ' dropdown-tree-selected' : '')
                                                + (categorySynchroFocus ? ' dropdown-tree-focus' : '')
                                            }
                                            id="dropdownTreeSelectCategory"
                                            data={categorySynchroList}
                                            mode="hierarchical"
                                            texts={{ placeholder: ' ' }}
                                            onChange={onChangeSynchroCategory}
                                            onBlur={onNodeSynchroBlur}
                                            onFocus={onNodeSynchroFocus}
                                            clearSearchOnChange={true}
                                            keepTreeOnSearch
                                        />
                                        <p className="error-text"></p>
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            inputValue={seoKeyValue}
                                            onInputChange={seoKeyChangeHandler}
                                            inputErrorVisible={false}
                                            disabled={false}
                                            inputType="input"
                                            type="text"
                                            class="form-control input-style form-control-lg"
                                            text="Ključne reči kategorije za SEO"
                                            text_class="m-0"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            inputValue={seoDecriptionValue}
                                            onInputChange={seoDecriptionChangeHandler}
                                            inputErrorVisible={false}
                                            disabled={false}
                                            inputType="textarea"
                                            type="text"
                                            class={"form-control input-style form-control-lg "}
                                            text="Opis kategorije za SEO"
                                            text_class="m-0"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <div>
                                            <p className="m-0 form-control-label">Slika kategorije</p>
                                            {selectedImage && (
                                                <div className="selected-img-container">
                                                    <img alt={selectedImage} src={selectedImage} />
                                                    <button onClick={()=> { setSelectedImage(null); setSelectedImageFile(null); }}><FontAwesomeIcon icon={faTimes} /></button>
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
                                                        onClick={e => (e.target.value = null)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div>
                                            <p className="m-0 form-control-label">Ikonica kategorije</p>
                                            {selectedIcon && (
                                                <div className="selected-img-container">
                                                    <img alt={selectedIcon} src={selectedIcon} />
                                                    <button onClick={()=>{setSelectedIcon(null); setSelectedIconFile(null);}}><FontAwesomeIcon icon={faTimes} /></button>
                                                </div>
                                            )}
                                            {!selectedIcon && (
                                                <div className="no-img-container">
                                                    <p className="no-img-text">Click here to add image.</p>
                                                    <img src={noImage} alt={noImage} />
                                                    <input
                                                        className="img-input"
                                                        type="file"
                                                        name="myImage"
                                                        accept="image/*"
                                                        onChange={(event) => addIcon(event.target.files[0])}
                                                        onClick={e => (e.target.value = null)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <ImageCrop
                                        openModal={show}
                                        handleClose={() => {setShow(false)}}
                                        imageCroped={(imgData) => { setCropedImg(imgData);}}
                                        imgForCrooping={dataForCrop}
                                    />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
            <ConfirmModal confirmWhat={confirmWhat} confirm={confirm} />
        </div>
    );
}

export default CategoryDetails;