import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "./AttrModalForm.json";

const AttributesModal = ({ open = false, handleClose = () => {}, idGroup, idAttribute }) => {
    const initList = {
        id_group: idGroup,
        id_group_attribute: idAttribute,
        slug: null,
        name: null,
        image: null,
        use_in_variants: null,
        description: null,
        order: null,
        status: "on",
    };

    const [listFields, setListFields] = useState([]);
    const api = useAPI();

    const handleList = () => {
        api.list(`admin/product-item-specifications/group-attribute-values/${idAttribute}`)
            .then((response) => {
                setListFields(response?.payload?.items);
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    const handleDelete = (token, id) => {
        api.delete(`admin/product-item-specifications/group-attribute-values/${id}`)
            .then((response) => {
                handleList();
                setListFields(response?.payload?.items);
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    const saveListData = async (data) => {
        api.post("admin/product-item-specifications/group-attribute-values", { id_group: idGroup, id_group_attribute: idAttribute, ...data })
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
        if (open && idAttribute === undefined) {
            handleClose();
            toast.warning("Sačuvajte atribut da bi unosili vrednosti!");
        }

        if (open) {
            handleList();
        }
    }, [open]);

    return (
        <Dialog open={open} fullScreen>
            <DialogTitle>Unos vrednosti za select</DialogTitle>
            <DialogContent>
                <List listFields={listFields} formFields={formFields} init={initList} onDelete={handleDelete} onSave={saveListData} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Zatvori</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AttributesModal;
