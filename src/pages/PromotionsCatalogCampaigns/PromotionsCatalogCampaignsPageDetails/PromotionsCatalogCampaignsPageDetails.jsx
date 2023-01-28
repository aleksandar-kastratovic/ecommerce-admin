import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import IconList from "../../../helpers/icons";
import Form from "../../../components/shared/Form/Form";
import basic_data from "./forms/basic_data.json";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import InfoConditions from "./panels/InfoConditions";

const PromotionsCatalogCampaignsPageDetails = () => {
    const { nid } = useParams();
    const api = useAPI();
    const apiPath = "admin/product-item-specifications/set";
    const navigate = useNavigate();

    const init = {
        id: null,
        slug: null,
        name: null,
        description: null,
        status: "on",
    };

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
        let oldId = data.id;
        api.post(apiPath, data)
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");

                if (oldId === null) {
                    let tId = response?.payload?.id;
                    navigate(`/promotions-catalog-campaigns/${tId}`, { replace: true });
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

    const fields = [
        {
            name: "Informacije o akciji",
            icon: IconList.settings,
            enabled: true,
            component: <Form formFields={basic_data} initialData={data} onSubmit={saveData} />,
        },
        {
            name: "Informacije o uslovima",
            icon: IconList.settings,
            enabled: data?.id,
            component: <InfoConditions newsId={data?.id} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Akcija" : data?.name} fields={fields} ready={[nid === "new" || data?.id]} />;
};

export default PromotionsCatalogCampaignsPageDetails;
