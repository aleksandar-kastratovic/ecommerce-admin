import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";
import formFields from "../forms/head_office_address.json";

const HeadOffice = ({ companyId }) => {
    const init = {};
    const [data, setData] = useState(init);
    const api = useAPI();

    const apiPath = "admin/customers-b2b/head-office-address";

    const handleData = () => {
        api.get(`${apiPath}/${companyId}`)
            .then((response) => setData(response?.payload))
            .catch((error) => console.warn(error));
    };

    const saveData = (data) => {
        api.post(`${apiPath}`, data)
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

export default HeadOffice;
