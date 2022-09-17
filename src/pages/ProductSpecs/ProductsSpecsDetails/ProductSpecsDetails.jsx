import { useState } from "react";
import { useParams } from "react-router-dom";
import IconList from "../../../helpers/icons";
import DetailsGroups from "./DetailsGroups/DetailsGroups";
import Form from "../../../components/shared/Form/Form";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import useAPI from "../../../api/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

import formFields from "./formFields.json";

const ProductSpecsDetails = () => {
    const { specId } = useParams();

    const init = {
        id: null,
        slug: null,
        name: null,
        description: null,
        status: "on",
    };

    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const api = useAPI();

    const apiPath = "admin/product-item-specifications/set";

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
            .get(`${apiPath}/${specId}`)
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
            name: "Grupe",
            icon: IconList.group,
            enabled: data?.id,
            component: <DetailsGroups specId={data?.id} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Unos novog seta" : data?.name} fields={fields} ready={!isLoading} />;
};

export default ProductSpecsDetails;
