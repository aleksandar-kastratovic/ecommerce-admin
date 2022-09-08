import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";

import formFields from "../forms/gallery.json";

const Gallery = ({ productId }) => {
    const init = {
        id: null,
        id_product: productId,
        id_product_variant: null,
        gallery: null,
    };
    const [data, setData] = useState(init);
    const api = useAPI();
    const apiPath = "admin/product-items/gallery";

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

export default Gallery;
