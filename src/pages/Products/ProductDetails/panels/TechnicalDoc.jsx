import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";
import InputMultipleFiles from "../../../../components/shared/InputMultipleFiles/InputMultipleFiles";
import formFields from "../forms/technical_doc.json";

const TechnicalDoc = ({ productId }) => {
    const init = {
        id: null,
        id_product: productId,
        id_product_variant: null,
        technical_doc: null,
    };
    const [data, setData] = useState([]);
    const api = useAPI();
    const apiPath = "admin/product-items/technical-doc";

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
                console.log(response);
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

    return (
        <InputMultipleFiles
            list={list}
            name="technical_doc"
            onChangeHandler={() => {}}
            uploadHandler={handleSubmit}
            deleteHandler={handleDelete}
            accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />
    );
};

export default TechnicalDoc;
