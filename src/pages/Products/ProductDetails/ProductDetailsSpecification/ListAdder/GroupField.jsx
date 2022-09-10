import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useState } from "react";

import groupForm from "../groupForm.json";
import CreateForm from "../../../../../components/shared/Form/CreateForm";
import { formatDate } from "../../../../../helpers/dateFormat";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../../../../store/auth-contex";
import { getFieldsByGroupId, getProductGroupAttributeDDL, postProductGroupAttribute } from "../../../services";

const GroupField = ({ name = "", slug = "", groupId, setId, nameSet, slugSet, onChange = () => {}, productId, productVariantId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [data, setData] = useState({});

    const { user } = useContext(AuthContext);

    const isOpenToggle = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit = async () => {
        try {
            for (const field of formFields) {
                if (data[field.name] !== undefined) {
                    let repack = { id: data.id !== undefined ? data.id : null };
                    repack = {
                        ...repack,
                        id_product: productId,
                        id_set: setId,
                        id_group: groupId,
                        id_attribute: field.id,
                        slug_set: slugSet,
                        set_name: nameSet,
                        group_name: name,
                        slug_group: slug,
                        slug_attribute: field.slug,
                        id_product_variant: productVariantId ?? 1,
                        name_attribute: field.name,
                        id_attribute_value: null,
                        slug_attribute_value: "",
                        order: 0,
                        name_attribute_value: data[field.name],
                    };
                    if (field.field_type === "select") {
                        //repack
                    }

                    let response = await postProductGroupAttribute(user.access_token, repack);
                    console.log(response);
                }
            }
            //let response = await postProductGroupAttribute(user.access_token);
        } catch (error) {
            console.warn(error);
        }
    };

    const formItemChangeHandler = ({ target }, type) => {
        onChange();
        if (type === "date") {
            setData({ ...data, [target.name]: formatDate(target.value) });
        } else if (type) {
            setData({ ...data, [target.name]: target.checked });
        } else {
            setData({ ...data, [target.name]: target.value });
        }
    };

    const groupFiledsHandler = async () => {
        try {
            let response = await getFieldsByGroupId(user.access_token, groupId);

            console.log(response?.data?.payload);
        } catch (error) {
            console.warn(error);
        }
    };

    const attributeDdlHandler = async (idAttr) => {
        try {
            let response = await getProductGroupAttributeDDL(user.access_token, groupId, idAttr);
            return response?.data?.payload;
        } catch (error) {
            console.warn(error);
            return [];
        }
    };

    useEffect(() => {
        if (open) {
            groupFiledsHandler();
        }
    }, [open]);

    return (
        <Box>
            <div onClick={isOpenToggle}>
                {name}
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {isOpen && (
                <Box component="form" autoComplete="off">
                    {formFields &&
                        formFields.map((item, index) => {
                            let repackItem = {
                                ...item,
                                field_name: item.name,
                                prop_name: item.name,
                                input_type: item.field_type,
                                editable: true,
                                required: false,
                            };
                            if (item.field_type === "select") {
                                repackItem = {
                                    ...repackItem,
                                    options: attributeDdlHandler(item.id),
                                };
                            }
                            return (
                                <CreateForm
                                    data-test-id="admin-form"
                                    onChangeHandler={formItemChangeHandler}
                                    item={repackItem}
                                    key={index}
                                    value={Array.isArray(repackItem) && data ? data[repackItem.prop_name] : data[repackItem.prop_name]}
                                />
                            );
                        })}
                    <Button onClick={onSubmit}>Sačuvaj</Button>
                </Box>
            )}
        </Box>
    );
};

export default GroupField;
