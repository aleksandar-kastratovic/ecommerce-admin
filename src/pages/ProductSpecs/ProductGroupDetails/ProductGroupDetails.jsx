import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconList from "../../../helpers/icons";
import GroupAttributes from "./GroupAttributes/GroupAttributes";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";
import { toast } from "react-toastify";

import formFields from "./DetailsFields.json";

const ProductGroupDetails = () => {
    const init = {
        id: null,
        slug: null,
        name: null,
        description: null,
        order: null,
        status: "on",
    };

    const { groupId } = useParams();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const api = useAPI();
    const apiPath = "admin/product-item-specifications/group";

    const handleSubmit = (data) => {
        api.post(apiPath, data)
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");
            })
            .catch((error) => {
                console.warn(error);
                toast.success("Greška");
            });
    };

    const getData = async () => {
        setIsLoading(true);
        await api
            .get(`${apiPath}/${groupId}`)
            .then((response) => {
                setData(response?.payload);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const fields = [
        {
            name: "Osnovno",
            icon: IconList.dataThresholding,
            enabled: true,
            component: <Form formFields={formFields} initialData={data} onSubmit={handleSubmit} />,
        },
        {
            name: "Atributi",
            icon: IconList.attribution,
            enabled: data?.id,
            component: <GroupAttributes groupId={groupId} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Unos nove grupe" : data?.name} fields={fields} ready={!isLoading} />;
};

export default ProductGroupDetails;
