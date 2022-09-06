import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";

import formFields from "./formField.json";

const CountriesDetails = () => {
  const { cid } = useParams();
  const navigate = useNavigate();
  const api = useAPI();

  const init = {
    id: null,
    slug: null,
    name: null,
    id_country: null,
    phone_code: null,
    source: null,
    id_source: null,
    status: null,
  };

  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (data) => {
    api
      .post("admin/countries", data)
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
      .get(`admin/countries/${cid}`)
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
      title={cid === "new" ? "Unos nove države" : data?.name}
      back={() => {
        navigate(-1);
      }}
    >
      {!isLoading ? <Form formFields={formFields} initialData={data} onSubmit={submitHandler} /> : <LoadingForm fields={formFields.length} />}
    </FormWrapper>
  );
};

export default CountriesDetails;
