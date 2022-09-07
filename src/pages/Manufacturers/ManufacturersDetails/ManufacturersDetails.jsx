import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import Form from "../../../components/shared/Form/Form";

import formFields from "./formField.json";
import useAPI from "../../../api/api";
import { toast } from "react-toastify";

const ManufacturersDetails = () => {
  const { mmid } = useParams();
  const navigate = useNavigate();
  const api = useAPI();

  const init = {
    id: null,
    slug: null,
    title: null,
    id_country: null,
    country_name: null,
    short_description: null,
    description: null,
    logo: null,
    status: null,
  };

  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (data) => {
    api
      .post("admin/manufacturers", data)
      .then((response) => {
        toast.success("Uspešno");
        setData(response?.payload);
      })
      .catch((error) => {
        toast.warning("Greška");
        console.warn(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    api
      .get(`admin/manufacturers/${mmid}`)
      .then((response) => {
        setData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });

    setIsLoading(false);
  }, []);

  return (
    <FormWrapper
      title={mmid === "new" ? "Detalji proizvođača" : data.title}
      back={() => {
        navigate(-1);
      }}
    >
      {!isLoading ? <Form formFields={formFields} initialData={data} onSubmit={submitHandler} /> : <LoadingForm fields={formFields.length} />}
    </FormWrapper>
  );
};

export default ManufacturersDetails;
