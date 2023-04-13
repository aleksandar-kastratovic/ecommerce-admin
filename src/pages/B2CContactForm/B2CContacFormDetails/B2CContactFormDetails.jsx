import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import useAPI from "../../../api/api";
import Form from "../../../components/shared/Form/Form";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

import formFields from "../tblFields.json";

const B2CContactFormDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const api = useAPI();
  const apiPath = "admin/contact-form-b2c";

  const { data, isLoading } = useQuery(["ContactForm.details"], () => api.get(`${apiPath}/${id}`).then((response) => response?.payload));

  if (data) {
    formFields = formFields.filter((item) => data[item.prop_name] != null);
  }
  return (
    <FormWrapper title={data?.customer_name != null ? `Poruka od: ${data?.customer_name}` : " "} back={() => navigate(-1)} ready={!isLoading}>
      <Form formFields={formFields} initialData={data} submitButton={false} />
    </FormWrapper>
  );
};

export default B2CContactFormDetails;
