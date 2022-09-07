import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

import fields from "./formFields.json";

const GroupDetails = () => {
  const { gid } = useParams();
  const api = useAPI();
  const init = {
    id: null,
    slug: null,
    name: null,
    display_name: null,
    zip_code: null,
    id_municipality: null,
    id_country: null,
    delivery_center: null,
    delivery_days: null,
    source: null,
    id_source: null,
    status: null,
  };
  const navigate = useNavigate();
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async () => {
    setIsLoading(true);
    await api
      .get(`admin/category_product/groups/${gid}`)
      .then((response) => {
        setData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });
    setIsLoading(false);
  };

  const saveData = async (data) => {
    api
      .post(`admin/category_product/groups/`, data)
      .then((response) => {
        setData(response?.payload);
        toast.success(`Uspešno`);
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <FormWrapper title={gid === "new" ? "Unos nove grupe" : data ? data.name : ""} back={() => navigate(-1)}>
      {!isLoading ? <Form formFields={fields} initialData={data} onSubmit={saveData} /> : <LoadingForm fields={fields.length} />}
    </FormWrapper>
  );
};

export default GroupDetails;
