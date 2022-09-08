import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import fields from "./formField.json";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

const NotificationsDetails = () => {
  const { notifid } = useParams();
  const api = useAPI();
  const init = {
    selected_page : null,
    total_pages : null,
    total_items : null,
    items_per_page : null
  };
  const navigate = useNavigate();
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async () => {
    setIsLoading(true);
    await api
      .get(`admin/notifications/${notifid}`)
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
      .post(`admin/notifications`, data)
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
    <FormWrapper title={notifid === "new" ? "Unos nove notifikacije" : data.name} back={() => navigate(-1)}>
      {!isLoading ? <Form formFields={fields} initialData={data} onSubmit={saveData} /> : <LoadingForm fields={fields.length} />}
    </FormWrapper>
  );
};

export default NotificationsDetails;
