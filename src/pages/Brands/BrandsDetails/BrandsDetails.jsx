import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import Form from "../../../components/shared/Form/Form";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

import formFields from "./formField.json";

const BrandsDetails = () => {
  const init = {
    id: null,
    name: null,
    slug: null,
    group: null,
    title: null,
    subtitle: null,
    short_description: null,
    description: null,
    id_manufacturer: null,
    logo: null,
    status: "on",
  };
  const { bid } = useParams();
  const navigate = useNavigate();
  const api = useAPI();
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (data) => {
    let oldId = data.id;
    api
      .post("admin/brands/", data)
      .then((response) => {
        toast.success("Uspešno");
        setData(response?.payload);

        if (oldId === null) {
          let tId = response?.payload?.id;
          navigate(`/brands/${tId}`, { replace: true });
        }
      })
      .catch((error) => {
        toast.warning("Greška");
        console.warn(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    api
      .get(`admin/brands/${bid}`)
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
      title={bid == "new" ? "Detalji brenda" : data?.name}
      back={() => {
        navigate(-1);
      }}
    >
      {!isLoading ? <Form formFields={formFields} initialData={data} onSubmit={submitHandler} /> : <LoadingForm fields={formFields.length} />}
    </FormWrapper>
  );
};

export default BrandsDetails;
