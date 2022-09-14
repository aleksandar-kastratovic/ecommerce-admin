import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";

import formFields from "../forms/description.json";

const Description = ({ productId }) => {
    const init = {
        id: productId,
        short_description: null,
        description: null,
    };
    const [data, setData] = useState(init);
    const api = useAPI();
    const apiPath = "admin/product-items/description";

    const handleData = () => {
        api.get(`${apiPath}/${productId}`)
            .then((response) => setData(response?.payload))
            .catch((error) => console.warn(error));
    };

    const handleSubmit = (data) => {
        api.post(`${apiPath}`, data)
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

export default Description;
