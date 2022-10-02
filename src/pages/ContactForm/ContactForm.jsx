import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const ContactForm = () => {
  
  return (
    <ListPage apiUrl="admin/contact-form-b2c" title="Kontakt forma" columnFields={tblFields} showNewButton={false}/>
  );
};

export default ContactForm;
