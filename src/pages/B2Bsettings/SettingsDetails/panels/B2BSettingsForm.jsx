import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";
import Loading from "../../../../components/shared/Loading/Loading";

const B2CSettingsForm = ({ form_slug, module, submodule }) => {
  const api = useAPI();

  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState([]);

  const dataHandler = () => {
    setIsLoading(true);
    api.get(`admin/form/data/${form_slug}`)
      .then((response) => {
        setFormFields(response?.payload);
        setIsLoading(false);
      })
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
    api.post(`admin/configuration-b2b/main/${module}/${submodule}`, data)
      .then((response) => {
        setFormData(response?.payload)
        toast.success("Uspešno");
      })
      .catch((error) => console.warn(error));
  };
  return !isLoading ? <Form formFields={formFields} onSubmit={submitHandler} initialData={initialData} /> : <Loading />;
};

export default B2CSettingsForm;
