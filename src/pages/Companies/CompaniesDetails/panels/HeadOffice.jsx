import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";
import formFields from "../forms/head_office_address.json";

const HeadOffice = ({ companyId }) => {

  const init = {
    id: null,
    id_company: companyId,
    address: null,
    object_number: null,
    floor: null,
    apartment_number: null,
    id_town: null,
    town_name: null,
    zip_code: null,
    municipality_name: null,
    id_country: null,
    country_name: null,
    note: null,
  };

  const [data, setData] = useState(init);
  const api = useAPI();
  const apiPath = "admin/customers-b2b/head-office-address";
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

  const handleData = () => {
    api.get(`${apiPath}/${companyId}`)
      .then((response) => setData(response?.payload))
      .catch((error) => console.warn(error));
  };

  const saveData = (data) => {
    setIsLoadingOnSubmit(true);
    api.post(`${apiPath}`, { ...data, id_company: companyId })
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

export default HeadOffice;
