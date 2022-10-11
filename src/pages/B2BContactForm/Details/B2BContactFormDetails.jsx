import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../../api/api";
import Form from "../../../components/shared/Form/Form";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";
import formFields from "./formFields.json";

const B2BContactFormDetails = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const api = useAPI();
    const apiPath = "admin/contact-form-b2b";

    const { data, isLoading } = useQuery(["ContactForm.details"], () => api.get(`${apiPath}/${id}`).then((response) => response?.payload));

    return (
        <FormWrapper title={data?.first_name != null ? `Poruka od:${data?.first_name} ${data?.last_name}` : " "} back={() => navigate(-1)} ready={!isLoading}>
            <Form formFields={formFields} initialData={data} submitButton={false} />
        </FormWrapper>
    );
};

export default B2BContactFormDetails;
