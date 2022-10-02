import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import formFields from "./formField.json";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import useAPI from "../../../api/api";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import IconList from "../../../helpers/icons";
import RolesListPanel from "./RolesListPanel";

const RolesDetailsPage = () => {
    const { roleId } = useParams();
    const api = useAPI();
    const init = {
        id: null,
        screen: null,
        name: null,
    };
    const apiPath = "admin/roles/main";
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`${apiPath}/${roleId}`)
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

    const fields = [
        {
            name: "Osnovne informacije",
            icon: IconList.dataThresholding,
            enabled: true,
            component: <Form formFields={formFields} initialData={data} onSubmit={saveData} />,
        },
        {
            name: "Stranice",
            icon: IconList.screenShare,
            enabled: data?.id,
            component: <RolesListPanel roleId={data?.id} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Unos nove uloge" : data?.name} fields={fields} ready={!isLoading} />;
};

export default RolesDetailsPage;
