import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "../forms/prices.json";

const Prices = ({ productId }) => {
    const init = {
        id: null,
        id_product: productId,
        system: null,
        country: null,
        currency: null,
        type: null,
        group: null,
        id_product_variant: null,
        price_single_with_out_vat: null,
        price_single_with_vat: null,
        price_vat_procent: null,
        price_quantity: null,
        price_unit: null,
        active_to: null,
        price_with_out_vat: null,
        price_with_vat: null,
    };

    const [listData, setListData] = useState([]);
    const api = useAPI();
    const apiPath = "admin/product-items/prices";

    const handleList = () => {
        api.list(`${apiPath}/${productId}`)
            .then((response) => setListData(response?.payload?.items))
            .catch((error) => console.warn(error));
    };

    const handleSubmit = (data) => {
        api.post(apiPath, data)
            .then((response) => {
                toast.success("Uspešno");
                handleList();
            })
            .catch((error) => {
                console.warn(error);
                toast.warn(error);
            });
    };

    const handleDelete = (token, id) => {
        api.delete(`${apiPath}/${id}`)
            .then((response) => {
                toast.success("Uspešno");
                handleList();
            })
            .catch((error) => {
                console.warn(error);
                toast.warn(error);
            });
    };

    useEffect(() => {
        handleList();
    }, []);

    return <List formFields={formFields} init={init} listFields={listData} onSave={handleSubmit} onDelete={handleDelete} />;
};

export default Prices;
