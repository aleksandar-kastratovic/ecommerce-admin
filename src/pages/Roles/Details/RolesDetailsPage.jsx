import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import fields from "./formField.json";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";
import SearchableListForm from "../../../components/shared/Form/SearchableListForm/SearchableListForm";

const RolesDetailsPage = () => {
    const { roleId } = useParams();
    const api = useAPI();
    const init = {
        id: null,
        screen: null,
        name: null,
    };
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`admin/roles/${roleId}`)
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
        api.post(`admin/roles`, data)
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
        <FormWrapper title={data?.id == null ? "Unos novog mesta" : data?.name} back={() => navigate(-1)} ready={!isLoading}>
            <Form formFields={fields} initialData={data} onSubmit={saveData} />
            <SearchableListForm />
        </FormWrapper>
    );
};

export default RolesDetailsPage;
