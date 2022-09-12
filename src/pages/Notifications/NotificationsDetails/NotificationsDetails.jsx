import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import fields from "./formField.json";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";
import CreateForm from "../../../components/shared/Form/CreateForm";

import companyField from "./companyField.json";
import userField from "./userField.json";

const NotificationsDetails = () => {
    const { notifid } = useParams();
    const api = useAPI();
    const init = {
        id: null,
        id_company: null,
        title: null,
        message: null,
        button: null,
        link: null,
        seen_date: null,
    };
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`admin/notifications/${notifid}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
        setIsLoading(false);
    };

    const saveData = async (data) => {
        api.post(`admin/notifications`, { ...data, id_company: selectedCompany, id_company_user: selectedUser })
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
        <FormWrapper title={data?.id == null ? "Unos nove notifikacije" : data?.title} back={() => navigate(-1)}>
            {!isLoading ? (
                <>
                    <CreateForm item={companyField} value={selectedCompany} onChangeHandler={({ target }) => setSelectedCompany(target.value)} />
                    <CreateForm
                        item={{ ...userField, fillFromApi: selectedCompany != null ? `${userField.fillFromApi}/${selectedCompany}` : null }}
                        value={selectedUser}
                        onChangeHandler={({ target }) => setSelectedUser(target.value)}
                    />
                    <Form formFields={fields} initialData={data} onSubmit={saveData} />
                </>
            ) : (
                <LoadingForm fields={fields.length} />
            )}
        </FormWrapper>
    );
};

export default NotificationsDetails;
