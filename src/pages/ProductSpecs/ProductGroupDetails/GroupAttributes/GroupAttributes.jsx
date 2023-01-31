import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";
import AttributesModal from "../AttributesModal/AtrributesModal";

import formFields from "./formFields.json";

const GroupAttributes = ({ groupId }) => {
    const [listFields, setListFields] = useState([]);
    const [attrModal, setAttrModal] = useState({ open: false, id: null });

    const init = {
        slug: null,
        name: null,
        field_type: null,
        filter_display: null,
        filter_name: null,
        use_in_variants: null,
        description: null,
        required: null,
        order: null,
        status: "on",
    };

    const api = useAPI();
    const apiPath = "admin/product-item-specifications/group-attribute";
    const listActions = {
        field_type: {
            value: ["select", "multi_select"],
            button: {
                id: 1,
                text: "Unos vrednosti",
                action: (id) => {
                    setAttrModal({ open: true, id: id });
                },
            },
        },
    };

    const handleList = () => {
        api.list(`${apiPath}/${groupId}`)
            .then((response) => {
                setListFields(response?.payload?.items);
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    const onSave = (data) => {
        api.post(apiPath, { id_group: groupId, ...data })
            .then((response) => {
                console.log(response);
                handleList();

                toast.success("Uspešno!");
            })
            .catch((error) => {
                console.warn(error.response);
                toast.warning("Greška ");
            });
    };

    const onDelete = (token, id) => {
        api.delete(`${apiPath}/${id}`)
            .then((response) => {
                console.log(response);
                handleList();
                toast.success("Uspešno!");
            })
            .catch((error) => {
                console.warn(error.response);
                toast.warning("Greška ");
            });
    };

    useEffect(() => {
        handleList();
    }, []);

    return (
        <>
            <List listFields={listFields} formFields={formFields} init={init} onDelete={onDelete} onSave={onSave} actions={listActions} />
            <AttributesModal
                open={attrModal.open}
                idAttribute={attrModal.id}
                idGroup={groupId}
                handleClose={() => {
                    setAttrModal({ open: false, id: attrModal.id });
                }}
            />
        </>
    );
};

export default GroupAttributes;
