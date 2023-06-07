import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2BContactForm = () => {
  return <ListPage apiUrl="admin/contact-form-b2b" title="Kontakt forma" columnFields={tblFields} showNewButton={false} />;
};

export default B2BContactForm;
