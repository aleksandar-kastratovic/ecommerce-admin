import { useState } from "react";
import { useParams } from "react-router-dom";
import IconList from "../../../helpers/icons";
import DetailsGroups from "./DetailsGroups/DetailsGroups";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
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

    const handleSubmit = (data) => {
        api.post(`admin/product-item-specifications/set/`, data)
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
            .get(`admin/product-item-specifications/set/${specId}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });

        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const fields = [
        {
            name: "Osnovno",
            icon: IconList.dataThresholding,
            enabled: true,
            component: <div>{!isLoading ? <Form formFields={formFields} initialData={data} onSubmit={handleSubmit} /> : <LoadingForm fields={formFields.length} />}</div>,
        },
        {
            name: "Grupe",
            icon: IconList.group,
            enabled: data?.id,
            component: <DetailsGroups specId={specId} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Unos novog seta" : data?.name} fields={fields} />;
};

export default ProductSpecsDetails;
