import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputMultipleFiles from "../../../../components/shared/InputMultipleFiles/InputMultipleFiles";
import formFields from "../forms/technical_doc.json";
import AuthContext from "../../../../store/auth-contex";

const TechnicalDoc = ({ newsId, apiPathCrop }) => {
    const init = {
        id: null,
        id_news: newsId,
        id_news_variant: null,
        technical_doc: null,
    };
    const [data, setData] = useState([]);
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const apiPath = "admin/news-b2c/news/technical-doc";
    const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);
    const handleData = () => {
        api.list(`${apiPath}/${newsId}`)
            .then((response) => setData(response?.payload?.items))
            .catch((error) => console.warn(error));
    };

    const handleSubmit = (data) => {
        let req = {
            id: data.new ? null : data.id,
            id_news: newsId,
            file_base64: data.src,
            order: data.position,
            title: data.title ?? null,
            subtitle: data.subtitle ?? null,
            short_description: data.short_description ?? null,
            description: data.description ?? null,
            thumb_image: data.thumb_image ?? null,
            thumb_image_base64: data.thumb_image_base64 ?? null,
            thumb_filename: data.thumb_filename ?? null,
        };
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

    const handleSaveForm = (data) => {
        api.post(`${apiPath}`, data)
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
        let base64 = item.file_base64 ? item.file_base64 : "";
        const type = base64.split(";")[0].split(":")[1];
        let y = base64[base64.length - 2] === "=" ? 2 : 1;
        const size = base64.length * (3 / 4) - y;
        return { ...item, id: item.id, name: item.file_filename, position: item.order, alt: item.filename, size: size, type: type, src: base64 };
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
            handleReorder={handleReorder}
            changeFileData={() => {}}
            accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            dialogFormFields={formFieldsTemp}
            dialogGetPath={apiPath}
            saveDataHandler={handleSaveForm}
        />
    );
};

export default TechnicalDoc;
