import tblFields from "../../tblFields.json";
import { useEffect, useState } from "react";
import ListPage from "../../../../../components/shared/ListPage/ListPage";
import Form from "../../../../../components/shared/Form/Form";
import { useMutation, useQuery } from "react-query";
import useAPI from "../../../../../api/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Basic = () => {
    const [fields, setFields] = useState(tblFields);
    const [data, setData] = useState();
    const navigate = useNavigate();
    const api = useAPI();
    const { pid } = useParams();
    const { mutate, isLoading } = useMutation(
        ["createPromoCode"],
        async (data) => {
            return await api
                .post(`admin/campaigns/promo-codes/basic-data`, data)
                .then((res) => {
                    toast.success(`Uspešno!`);
                    navigate(`/promotions/promo-codes/${res?.payload?.id}?system=${res?.payload?.system}`);
                })
                .catch((error) => {
                    toast.error(error.response?.data?.message || error.response?.data?.payload?.message || "Greška!");
                });
        },
        {}
    );

    const { data: campaignInfo, refetch } = useQuery(
        ["campaignInfo", pid],
        async () => {
            return await api.get(`admin/campaigns/product-catalog/basic-data/${pid}`).then((res) => {
                setData(res?.payload);
                if (res?.payload?.system) {
                    navigate(`/promotions/promo-codes/${pid}?system=${res?.payload?.system}`);
                }
            });
        },
        {}
    );

    const formatFields = () => {
        if (data?.slug) {
            let ret;
            ret = fields?.find((i) => i?.prop_name === "slug");
            ret.in_main_table = true;
            ret.editable = true;
            ret.in_details = true;
            setFields([...fields]);
        } else {
            let ret;
            ret = fields?.find((i) => i?.prop_name === "slug");
            ret.in_main_table = false;
            ret.editable = false;
            ret.in_details = false;
            setFields([...fields]);
        }
    };

    useEffect(() => {
        formatFields();
    }, [data]);

    return (
        <Form
            formFields={fields}
            onSubmit={(data) => {
                mutate(data);
            }}
            initialData={data}
            isLoading={isLoading}
        />
    );
};

export default Basic;
