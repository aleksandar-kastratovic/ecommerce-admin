import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "./formFields.json";

const DetailsGroups = ({ specId }) => {
    const [listFields, setListFields] = useState([]);
    const navigate = useNavigate();
    const api = useAPI();

    const listInit = {
        id_set: specId,
        id: null,
        order: null,
        status: null,
    };

    const handleList = () => {
        api.list(`admin/product-item-specifications/set-group/${specId}`)
            .then((response) => {
                setListFields(response?.payload?.items);
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    const onSave = (data) => {
        api.post("admin/product-item-specifications/set-group/", data)
            .then((response) => {
                handleList();
                toast.success("Uspešno!");
            })
            .catch((error) => {
                console.warn(error.response);
                toast.warning("Greška ");
            });
    };

    const onDelete = (token, id) => {
        api.delete(`admin/product-item-specifications/set-group/${id}`)
            .then((response) => {
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

    const listButtons = [
        {
            id: 1,
            text: "Kreiraj grupu",
            action: () => {
                navigate(`/product-specs/groups/new`);
            },
        },
    ];

    const listActions = {
        field_type: {
            value: "select",
            button: {
                id: 1,
                text: "Unos vrednosti",
                action: (id) => {
                    setAttrModal({ open: true, id: id });
                },
            },
        },
    };

    return <List listFields={listFields} formFields={formFields} init={listInit} onDelete={onDelete} onSave={onSave} additionalButtons={listButtons} actions={listActions} />;
};

export default DetailsGroups;
