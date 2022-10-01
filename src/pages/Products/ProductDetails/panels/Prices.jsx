import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "../forms/prices.json";

const Prices = ({ productId }) => {
    const init = {
        id: null,
        id_product: productId,
        id_price_structure: null,
        id_product_variant: null,
        system: "",
        country: "",
        currency: "",
        type: "",
        group: "",
        price_single_with_out_vat: null,
        price_single_with_vat: null,
        price_vat_procent: "20.00",
        price_quantity: 1,
        price_unit: "kom",
        price_with_out_vat: null,
        price_with_vat: null,
    };

    const [listData, setListData] = useState([]);
    const api = useAPI();
    const navigate = useNavigate();
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

    const additionalButtons = [
        {
            text: "Grupe cena",
            action: () => {
                navigate("/products/prices-groups");
            },
        },
    ];

    const validateData = (data, field) => {
        let ret = data;
        switch (field) {
            case "price_single_with_out_vat":
            case "price_vat_procent":
            case "price_quantity":
                ret.price_with_out_vat = ret.price_quantity * ret.price_single_with_out_vat;
                ret.price_with_vat = (ret.price_vat_procent / 100 + 1) * ret.price_with_out_vat;
                return ret;
            case "price_with_out_vat":
                ret.price_with_vat = (ret.price_vat_procent / 100 + 1) * ret.price_with_out_vat;
                ret.price_single_with_out_vat = ret.price_with_out_vat / ret.price_quantity;
                return ret;
            case "price_with_vat":
                ret.price_with_out_vat = ret.price_with_vat / (ret.price_vat_procent / 100 + 1);
                ret.price_single_with_out_vat = ret.price_with_out_vat / ret.price_quantity;
                return ret;
            default:
                return ret;
        }

        return { ...data, price_with_vat: 170 };
    };

    return <List formFields={formFields} init={init} listFields={listData} onSave={handleSubmit} onDelete={handleDelete} additionalButtons={additionalButtons} validateData={validateData} />;
};

export default Prices;
