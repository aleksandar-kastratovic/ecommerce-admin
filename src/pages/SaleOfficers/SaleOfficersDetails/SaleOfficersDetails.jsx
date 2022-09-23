import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";

import fields from "./formFields.json";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";

const init = {
    id: null,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    order: 0,
};
const SaleOfficersDetails = () => {
    const { id } = useParams();
    const api = useAPI();
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);

    const handleData = async () => {
        setIsLoading(true);
        api.get(`admin/referents-b2b/${id}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            })
            .then(() => {
                setIsLoading(false);
            });
    };

    const saveData = async (data) => {
        api.post(`admin/referents-b2b`, data)
            .then((response) => {
                setData(response?.payload);
                toast.success(`Uspešno ${id === "new" ? "dodati" : "izmenjeni"} podaci`);
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    useEffect(() => {
        if (id !== "new") {
            handleData();
        }
    }, []);

    return (
        <PageWrapper title={data?.id == null ? "Unos novog komercijaliste" : data?.name} back={() => navigate(-1)}>
            {!isLoading ? <Form formFields={fields} initialData={data} onSubmit={saveData} /> : <LoadingForm fields={fields.length} />}
        </PageWrapper>
    );
};

export default SaleOfficersDetails;
