import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

import fields from "./formFields.json";

const PricesGroupsDetails = () => {
    const { priceGroupId } = useParams();
    const api = useAPI();
    const init = {
        id: null,
        slug: null,
        name: null,
        system: null,
        country: null,
        currency: null,
        type: null,
        group: null,
    };
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);

    const apiPath = "admin/product-items/prices-structure";

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`${apiPath}/${priceGroupId}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
        setIsLoading(false);
    };

    const saveData = async (data) => {
        api.post(`${apiPath}`, data)
            .then((response) => {
                setData(response?.payload);
                toast.success(`Uspešno`);
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <FormWrapper title={data?.id == null ? "Unos nove grupe" : data?.name} back={() => navigate(-1)}>
            {!isLoading ? <Form formFields={fields} initialData={data} onSubmit={saveData} /> : <LoadingForm fields={fields.length} />}
        </FormWrapper>
    );
};

export default PricesGroupsDetails;
