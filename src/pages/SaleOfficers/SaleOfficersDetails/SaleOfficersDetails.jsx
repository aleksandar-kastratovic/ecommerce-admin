import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

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
    status: "on",
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
        let oldId = data.id;
        api.post(`admin/referents-b2b`, { ...init, ...data })
            .then((response) => {
                setData(response?.payload);
                toast.success(`Uspešno ${id === "new" ? "dodati" : "izmenjeni"} podaci`);
                if (oldId === null) {
                    let tId = response?.payload?.id;
                    navigate(`/b2b-sales-officers/${tId}`, { replace: true });
                }
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
        <FormWrapper title={data?.id == null ? "Unos novog komercijaliste" : `${data?.first_name} ${data?.last_name}`} back={() => navigate(-1)}>
            {!isLoading ? <Form formFields={fields} initialData={data} onSubmit={saveData} /> : <LoadingForm fields={fields.length} />}
        </FormWrapper>
    );
};

export default SaleOfficersDetails;
