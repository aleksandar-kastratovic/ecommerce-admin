import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";

import formFields from "../forms/declaration.json";

const Declaration = ({ productId }) => {
    const init = {
        id_product: productId,
        declaration_id_manufacture: null,
        declaration_id_country: null,
        declaration_name: null,
        declaration_note: null,
        declaration_year: null,
        declaration_importer_name: null,
        declaration_importer_id: null,
    };
    const [data, setData] = useState(init);
    const api = useAPI();
    const apiPath = "admin/product-items/declaration";

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

export default Declaration;
