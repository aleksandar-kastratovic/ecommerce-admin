import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import Form from "../../../components/shared/Form/Form";

import fields from "./formField.json";

const NewsDetails = () => {
    const { nid } = useParams();
    const api = useAPI();
    const apiPath = "admin/news-b2c/news";
    const init = {
        id: null,
        slug: null,
        title: null,
        id_country: null,
        country_name: null,
        short_description: null,
        description: null,
    };
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);

    const handleData = async () => {
        setIsLoading(true);
        api.get(`${apiPath}/${nid}`)
            .then((response) => {
                setData(response?.payload);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error);
                setIsLoading(false);
            });
    };

    const saveData = async (data) => {
        api.post(apiPath, data)
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
        <FormWrapper title={data?.id == null ? "Nova vest" : data?.title} back={() => navigate(-1)}>
            {!isLoading ? <Form formFields={fields} initialData={data} onSubmit={saveData} /> : <LoadingForm fields={fields.length} />}
        </FormWrapper>
    );
};

export default NewsDetails;
