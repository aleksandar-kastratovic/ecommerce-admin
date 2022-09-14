import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
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
        let req = { id: data.new ? null : data.id, id_product: productId, file: data.src, order: data.position ?? 0 };
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

    const handleReorder = (id, destination) => {
        api.put(`${apiPath}/order`, { id: id, order: destination })
            .then((response) => {
                toast.success("Uspešno");
            })
            .catch((error) => {
                toast.warn("Greška");
                console.warn(error);
            });
    };

    let list = data.map((item) => {
        let base64 = item.gallery_base64;
        const type = base64.split(";")[0].split(":")[1];
        let y = base64[base64.length - 2] === "=" ? 2 : 1;
        const size = base64.length * (3 / 4) - y;
        return { id: item.id, name: item.filename, position: item.order, alt: item.filename, size: size, type: type, src: base64 };
    });

    useEffect(() => {
        handleData();
    }, []);
    return <InputMultipleImages list={list} name="Galerija" onChangeHandler={() => {}} uploadHandler={handleSubmit} deleteHandler={handleDelete} handleReorder={handleReorder} />;
};

export default Gallery;
