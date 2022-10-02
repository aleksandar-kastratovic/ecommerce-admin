import { Box } from "@mui/material";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Button from "../Button/Button";
import CreateForm from "./CreateForm";
import Buttons from "./Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { formatDate, formatDateTime } from "../../../helpers/dateFormat";
import ImageDialog from "../Dialogs/ImageDialog";
import { isUrlValid } from "./util";

const Form = ({ formFields = [], initialData = {}, onSubmit = () => null, cancelButton = false, submitButton = true, queryString = "", onChange = () => {}, validateData = (data) => data }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(initialData);
    const [inputsError, setInputsError] = useState([]);
    const [openImageDialog, setOpenImageDialog] = useState({
        show: false,
        image: null,
        label: "",
        width: 300,
        height: 200,
        name: "",
    });

    const submitHandler = (event) => {
        event.preventDefault && event.preventDefault();

        const errors = {};
        for (const field of formFields) {
            if (field.required && field.input_type !== "switch" && (data[field.prop_name] === "" || data[field.prop_name] == null)) {
                errors[field.prop_name] = {
                    content: "Polje je obavezno, molim Vas unesite vrednost.",
                };
            }
        }
        isEmpty(errors) ? onSubmit(data) : setInputsError(errors);
    };

    const formItemChangeHandler = ({ target }, type) => {
        let newData;
        if (type === "date") {
            newData = { ...data, [target.name]: formatDate(target.value) };
        } else if (type === "date_time") {
            newData = { ...data, [target.name]: formatDateTime(target.value) };
        } else if (type === "checkbox") {
            newData = { ...data, [target.name]: target.checked ? 1 : 0 };
        } else if (type === "switch") {
            newData = { ...data, [target.name]: target.checked ? 1 : 0 };
        } else {
            newData = { ...data, [target.name]: target.value };
        }
        setData(validateData(newData, target.name));

        setInputsError((inputsError) => {
            delete inputsError[target.name];
            return inputsError;
        });
    };

    useEffect(() => {
        onChange(data);
    }, [data]);

    const formImageUpload = useCallback(
        (event) => {
            event.preventDefault();
            const selectedFile = event.target.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                const timeOutId = setTimeout(() => {
                    setter(event, reader.result);
                }, 500);
                return () => clearTimeout(timeOutId);
            };
            reader.readAsDataURL(selectedFile);
        },
        [data]
    );

    const onOpenImageDialog = (img, label, imageName, width, height) => {
        const found = data[imageName];
        const checkImage = isUrlValid(img);

        if (checkImage) {
            setOpenImageDialog({
                show: true,
                image: found,
                label: label,
                width: width,
                height: height,
                name: imageName,
                showDimensions: false,
            });
        } else {
            setOpenImageDialog({
                show: true,
                image: img,
                label: label,
                width: width,
                height: height,
                name: imageName,
                showDimensions: false,
            });
        }
    };

    const handleCloseImageDialog = () => {
        setOpenImageDialog({ show: false, image: null, label: "", name: "" });
    };

    const handleSaveEditImage = (imageName, image) => {
        setData({ ...data, [imageName]: image });
    };

    const handleDeleteImage = (imageName) => {
        setData({ ...data, [imageName]: null });
    };

    const setter = (event, result) => {
        setData({ ...data, [event.target.name]: result });
    };

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={submitHandler}>
                {(formFields ?? [])
                    .filter((field) => field.in_details)
                    .map((item, index) => {
                        return (
                            <CreateForm
                                data-test-id="admin-form"
                                onChangeHandler={formItemChangeHandler}
                                onImageUpload={formImageUpload}
                                onOpenImageDialog={onOpenImageDialog}
                                item={item}
                                key={index}
                                error={inputsError[item.prop_name] ? inputsError[item.prop_name].content : null}
                                value={Array.isArray(item) && data ? data[item.prop_name] : data[item.prop_name]}
                                queryString={queryString}
                                disabled={item.disabled || (item.prop_name === "slug" && data.system_required === 1)}
                            />
                        );
                    })}
                <Buttons>
                    {cancelButton && <Button label="Odustani" onClick={() => navigate(-1)} />}
                    {submitButton && <Button type="submit" label="Sačuvaj" variant="contained" />}
                </Buttons>
            </Box>

            {/* <FileDialog
                openFullPageDialog={openImageDialog}
                setOpenFullPageDialog={setOpenImageDialog}
                setImageList={() => {}}
                imageList={[]}
                handleCloseImageDialog={handleCloseImageDialog}
                onImageUpload={formImageUpload}
                handleDeleteImage={handleDeleteImage}
            /> */}
            <ImageDialog
                title="Obrada slike"
                openImageDialog={openImageDialog}
                handleCloseImageDialog={handleCloseImageDialog}
                onImageUpload={formImageUpload}
                handleSaveEditImage={handleSaveEditImage}
                handleDeleteImage={handleDeleteImage}
            />
        </>
    );
};

export default Form;
