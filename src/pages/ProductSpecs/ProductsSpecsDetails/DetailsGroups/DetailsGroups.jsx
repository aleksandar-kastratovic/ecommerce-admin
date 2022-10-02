import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Button from "../../../../components/shared/Button/Button";
import Buttons from "../../../../components/shared/Form/Buttons/Buttons";
import SearchableListForm from "../../../../components/shared/Form/SearchableListForm/SearchableListForm";
import Loading from "../../../../components/shared/Loading/Loading";

const DetailsGroups = ({ specId }) => {
    const [listData, setListData] = useState([]);

    const [isLoading, setIsLoading] = useState([]);

    const navigate = useNavigate();

    const api = useAPI();
    const apiPath = "admin/product-item-specifications/set-group";

    const handleList = (isMounted) => {
        setIsLoading(true);
        api.get(`${apiPath}/${specId}`)
            .then((response) => {
                if (isMounted) {
                    setListData(response?.payload);
                    setIsLoading(false);
                }
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
        let isMounted = true;
        handleList(isMounted);

        return () => {
            isMounted = false;
        };
    }, []);

    return !isLoading ? (
        <>
            <Buttons>
                <Button label="Dodaj grupu" variant="contained" onClick={() => navigate("/product-specs/groups/new")} />
            </Buttons>
            <SearchableListForm available={listData.available} selected={listData.selected} onSubmit={handleSubmit} />
        </>
    ) : (
        <Loading />
    );
};

export default DetailsGroups;
