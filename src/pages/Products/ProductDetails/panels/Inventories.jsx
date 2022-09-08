import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "../forms/inventories.json";

const Inventories = ({ productId }) => {
    const init = {
        id: null,
        id_product: null,
        id_product_variant: null,
        id_category: null,
        category_path: null,
    };

    const [listData, setListData] = useState([]);
    const api = useAPI();
    const apiPath = "admin/product-items/inventories";

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

export default Inventories;
