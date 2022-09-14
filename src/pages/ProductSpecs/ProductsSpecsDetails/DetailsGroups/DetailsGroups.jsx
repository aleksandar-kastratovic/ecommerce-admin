import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import SearchableListForm from "../../../../components/shared/Form/SearchableListForm/SearchableListForm";
import Loading from "../../../../components/shared/Loading/Loading";

const DetailsGroups = ({ specId }) => {
    const [listData, setListData] = useState([]);

    const [isLoading, setIsLoading] = useState([]);

    const api = useAPI();
    const apiPath = "admin/product-item-specifications/set-group";

    const handleList = () => {
        setIsLoading(true);
        api.get(`${apiPath}/${specId}`)
            .then((response) => {
                setListData(response?.payload);
                setIsLoading(false);
            })
            .catch((error) => console.warn(error));
    };

    const handleSubmit = (data) => {
        api.post(apiPath, { id_set: specId, id_groups: data })
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

export default DetailsGroups;
