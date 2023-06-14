
import { useEffect, useState } from "react";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";
import formFields from "../forms/rebate.json"
import { toast } from "react-toastify";

const Rebate = ({ companyId }) => {
  const api = useAPI();
  const [data, setData] = useState({ rebate_tier_id: null });
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

  const handleData = () => {
    api.get(`admin/customers-b2b/rebate/${companyId}`)
      .then((response) => setData(response?.payload))
      .catch((error) => console.warn(error));
  };

  const saveData = (data) => {
    setIsLoadingOnSubmit(true);
    api.post(`admin/customers-b2b/rebate/${companyId}`, data)
      .then((response) => {
        setData(response?.payload);
        toast.success("Uspešno");
        setIsLoadingOnSubmit(false);
      })
      .catch((error) => {
        console.warn(error);
        toast.warn("Greška");
        setIsLoadingOnSubmit(false);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  return <Form formFields={formFields} initialData={data} onSubmit={saveData} isLoading={isLoadingOnSubmit} />;
}

export default Rebate;