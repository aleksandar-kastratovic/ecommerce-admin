import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import { toast } from "react-toastify";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import Form from "../../../components/shared/Form/Form";
import useAPI from "../../../api/api";

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
    api
      .post("admin/brands/", data)
      .then((response) => {
        toast.success("Uspešno");
        console.log(response?.payload);
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
    <PageWrapper
      title={bid == "new" ? "Detalji brenda" : data?.name}
      back={() => {
        navigate(-1);
      }}
    >
      {!isLoading ? (
        <Form
          formFields={formFields}
          initialData={data}
          onSubmit={submitHandler}
        />
      ) : (
        <LoadingForm fields={formFields.length} />
      )}
    </PageWrapper>
  );
};

export default BrandsDetails;
