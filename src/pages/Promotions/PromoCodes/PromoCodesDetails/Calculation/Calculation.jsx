import tblFields from "./tblFields.json";
import { useEffect, useState } from "react";
import Form from "../../../../../components/shared/Form/Form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../../../api/api";
import PageWrapper from "../../../../../components/shared/Layout/PageWrapper/PageWrapper";
import { useNavigate } from "react-router-dom";

const Calculation = () => {
    const [fields, setFields] = useState(tblFields);
    const navigate = useNavigate();
    const [data, setData] = useState();
    const api = useAPI();
    const { pid } = useParams();

    const { mutate: onSubmit, isLoading } = useMutation(
        [pid, data],
        async (data) => {
            return await api
                .post(`admin/campaigns/promo-codes/calculations`, data)
                .then((res) => {
                    toast.success(`Uspešno!`);
                    refetch();
                })
                .catch((error) => {
                    toast.error(error.response?.data?.message || error.response?.data?.payload?.message || "Greška!");
                });
        },
        {}
    );

    const { data: calcInfo, refetch } = useQuery(
        [pid],
        async () => {
            return await api.get(`admin/campaigns/promo-codes/calculations/${pid}`).then((res) => {
                setData(res?.payload);
            });
        },
        { refetchOnWindowFocus: false }
    );

    console.log("data", data);

    return (
        <Form
            formFields={fields}
            initialData={data}
            onSubmit={(data) => onSubmit(data)}
            isLoading={isLoading}
            queryString={data?.discount_type ? `discount_type=${data?.discount_type}` : null}
            onChange={(ret) => {
                setData({
                    ...data,
                    ...ret,
                });
            }}
        />
    );
};

export default Calculation;
