import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import fields from "./formField.json";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

const StoresDetails = () => {
    const { ssid } = useParams();
    const api = useAPI();
    const init = {
        id: null,
        slug: null,
        name: null,
        store_type: null,
        id_country: null,
        country_name: null,
        id_town: null,
        town: null,
        zip_code: null,
        address: null,
        email: null,
        phone: null,
        longitude: null,
        latitude: null,
        work_hours: null,
        short_description: null,
        description: null,
        b2b_store: null,
        b2c_store: null,
        status: "on",
    };
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`admin/stores/${ssid}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
        setIsLoading(false);
    };

    const saveData = async (data) => {
        api.post(`admin/stores`, data)
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
        <FormWrapper title={ssid === "new" ? "Unos novog skladišta" : data.name} back={() => navigate(-1)}>
            {!isLoading ? <Form formFields={fields} initialData={data} onSubmit={saveData} /> : <LoadingForm fields={fields.length} />}
        </FormWrapper>
    );
};

export default StoresDetails;
