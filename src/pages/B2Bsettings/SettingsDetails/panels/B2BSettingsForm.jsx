import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";

const B2BSettingsForm = ({ form_slug, config_module_id, module, submodule }) => {
    const api = useAPI();

    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState([]);

    const dataHandler = () => {
        api.get(`admin/form/data/${form_slug}`)
            .then((response) => setFormFields(response?.payload))
            .catch((error) => console.warn(error));
        api.get(`admin/configuration-b2b/main/${module}/${submodule}`)
            .then((response) => setFormData(response?.payload))
            .catch((error) => console.warn(error));
    };

    useEffect(() => {
        dataHandler();
    }, []);

    const initialData = {};
    for (const item of formData?.items ?? []) {
        initialData[item.slug] = item.type === "image" ? item?.base64 : item?.value;
    }

    const submitHandler = (data) => {
        console.log(data);
        api.post(`admin/configuration-b2b/main/${module}/${submodule}`, data)
            .then((response) => console.log(response))
            .catch((error) => console.warn(error));
    };
    return <Form formFields={formFields} onSubmit={submitHandler} initialData={initialData} />;
};

export default B2BSettingsForm;
