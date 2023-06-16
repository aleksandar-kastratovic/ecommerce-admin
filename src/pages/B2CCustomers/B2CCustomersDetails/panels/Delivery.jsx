import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";

import formFields from "../forms/delivery.json";

const Delivery = ({ customerId }) => {
  const init = {
    id_company: customerId,
    saldo: null,
    debt_in_currency: null,
    debt_out_currency: null,
    credit_limit: null,
    debt_days: null,
  };
  const [data, setData] = useState(init);
  const api = useAPI();

  const apiPath = "admin/customers-b2b/analytics-data";
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

  const handleData = () => {
    api.get(`${apiPath}/${customerId}`)
      .then((response) => setData(response?.payload))
      .catch((error) => console.warn(error));
  };

  const saveData = (data) => {
    setIsLoadingOnSubmit(true);
    api.post(`${apiPath}`, { ...data, id_company: customerId })
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
};

export default Delivery;
