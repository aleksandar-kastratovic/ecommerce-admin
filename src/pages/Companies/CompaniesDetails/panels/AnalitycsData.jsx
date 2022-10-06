import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";
import formFields from "../forms/analitics.json";

const AnalitycsData = ({ companyId }) => {
    const init = {
        id_company: companyId,
        saldo: null,
        debt_in_currency: null,
        debt_out_currency: null,
        credit_limit: null,
        debt_days: null,
    };
    const [data, setData] = useState(init);
    const api = useAPI();

    const apiPath = "admin/customers-b2b/analytics-data";

    const handleData = () => {
        api.get(`${apiPath}/${companyId}`)
            .then((response) => setData(response?.payload))
            .catch((error) => console.warn(error));
    };

    const saveData = (data) => {
        api.post(`${apiPath}`, { ...data, id_company: companyId })
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");
            })
            .catch((error) => {
                console.warn(error);
                toast.warn("Greška");
            });
    };

    useEffect(() => {
        handleData();
    }, []);
    return <Form formFields={formFields} initialData={data} onSubmit={saveData} />;
};

export default AnalitycsData;
