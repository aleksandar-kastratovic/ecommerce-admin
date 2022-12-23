import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import SearchableListForm from "../../../../components/shared/Form/SearchableListForm/SearchableListForm";
import Loading from "../../../../components/shared/Loading/Loading";

const Categories = ({ productId }) => {
    const [listData, setListData] = useState([]);

    const [isLoading, setIsLoading] = useState([]);

    const api = useAPI();
    const apiPath = "admin/product-items/categories";

    const handleList = () => {
        setIsLoading(true);
        api.get(`${apiPath}/${productId}`)
            .then((response) => {
                setListData(response?.payload);
                setIsLoading(false);
            })
            .catch((error) => console.warn(error));
    };

    const handleSubmit = (data) => {
        api.post(apiPath, { id_product: productId, id_categories: data })
            .then((response) => {
                toast.success("Uspešno");
            })
            .catch((error) => {
                console.warn(error);
                toast.warn("Greška");
            });
    };

    useEffect(() => {
        handleList();
    }, []);

    return !isLoading ? <SearchableListForm available={listData.available} selected={listData.selected} onSubmit={handleSubmit} /> : <Loading />;
};

export default Categories;
