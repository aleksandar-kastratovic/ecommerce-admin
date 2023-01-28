import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import fields from "./formField.json";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";
import Buttons from "../../../components/shared/Form/Buttons/Buttons";
import Button from "../../../components/shared/Button/Button";
import ChangePasswordDialog from "../../../components/shared/ChangePasswordDialog/ChangePasswordDialog";

const UsersDetils = () => {
    const { userId } = useParams();
    const api = useAPI();
    const init = {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        role_id: null,
    };
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const apiPath = "admin/users";

    const [openDialog, setOpenDialog] = useState({ show: false, userId });

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`${apiPath}/${userId}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
        setIsLoading(false);
    };

    const saveData = async (data) => {
        let oldId = data.id;
        api.post(apiPath, data)
            .then((response) => {
                setData(response?.payload);
                toast.success(`Uspešno`);

                if (oldId === null) {
                    let tId = response?.payload?.id;
                    navigate(`/users/${tId}`, { replace: true });
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
        <FormWrapper title={data?.id == null ? "Unos novog korisnika" : data?.first_name + " " + data?.last_name} back={() => navigate(-1)} ready={!isLoading}>
            <Form formFields={fields} initialData={data} onSubmit={saveData} />
            {data?.id != null && (
                <Buttons>
                    <Button
                        onClick={() => {
                            setOpenDialog({ show: true, userId: data?.id });
                        }}
                        label="Promeni lozinku"
                    />
                </Buttons>
            )}
            <ChangePasswordDialog openDialog={openDialog} setOpenDialog={setOpenDialog} apiPath="admin/users/reset-password" />
        </FormWrapper>
    );
};

export default UsersDetils;
