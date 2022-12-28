import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";

import formFields from "./formFields.json";

const DetailsDisplayIn = ({ cid }) => {
    const init = {
        display_in_section_recommendation: null,
    };
    const [data, setData] = useState(init);
    const api = useAPI();
    const apiPath = "admin/category-product/display-in-section";

    const handleData = () => {
        api.get(`${apiPath}/${cid}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => console.warn(error));
    };

    const handleSubmit = (data) => {
        api.post(`${apiPath}`, { ...data, id: cid })
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");
            })
            .catch((error) => {
                toast.warn("Greška");
                console.warn(error);
            });
    };

    useEffect(() => {
        handleData();
    }, []);

    return <Form formFields={formFields} initialData={data} onSubmit={handleSubmit} />;
};

export default DetailsDisplayIn;
