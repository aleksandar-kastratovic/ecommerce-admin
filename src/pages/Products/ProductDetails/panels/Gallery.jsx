import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";
import InputMultipleImages from "../../../../components/shared/InputMultipleImages/InputMultipleImages";

import formFields from "../forms/gallery.json";

const Gallery = ({ productId }) => {
    const [data, setData] = useState([]);
    const api = useAPI();
    const apiPath = "admin/product-items/gallery";

    const handleData = () => {
        api.list(`${apiPath}/${productId}`)
            .then((response) => setData(response?.payload?.items))
            .catch((error) => console.warn(error));
    };

    const handleSubmit = (data) => {
        let req = { id: data.new ? null : data.id, id_product: productId, file: data.src, order: data.position };
        api.post(`${apiPath}`, req)
            .then((response) => {
                toast.success("Uspešno");
                handleData();
            })
            .catch((error) => {
                toast.warn("Greška");
                console.warn(error);
            });
    };

    const handleDelete = (id) => {
        api.delete(`${apiPath}/${id}`)
            .then((response) => {
                toast.success("Uspešno");
                handleData();
            })
            .catch((error) => {
                toast.warn("Greška");
                console.warn(error);
            });
    };

    let list = data.map((item) => {
        const type = item.gallery_base64.split(";")[0].split(":")[1];
        const size = item.gallery_base64.length;
        return { id: item.id, name: item.filename, position: item.order, alt: item.filename, size: size, type: type, src: item.gallery_base64 };
    });

    useEffect(() => {
        handleData();
    }, []);
    return <InputMultipleImages list={list} name="Galerija" onChangeHandler={() => {}} uploadHandler={handleSubmit} deleteHandler={handleDelete} />;
};

export default Gallery;
