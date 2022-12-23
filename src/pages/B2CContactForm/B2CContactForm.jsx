import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2CContactForm = () => {
    return <ListPage apiUrl="admin/contact-form-b2c" title="Kontakt forma" columnFields={tblFields} showNewButton={false} />;
};

export default B2CContactForm;
