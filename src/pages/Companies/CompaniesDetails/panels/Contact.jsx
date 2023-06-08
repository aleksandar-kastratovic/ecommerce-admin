import ListPage from "../../../../components/shared/ListPage/ListPage";
import formFields from "../forms/contact.json"

const ListPanel = ({ companyId }) => {

  return <ListPage apiUrl={`admin/customers-b2b/contact/${companyId}`} columnFields={formFields} actionNewButton="modal" addFieldLabel="Dodajte kontakt" showAddButton={true} title=" " />;
};

export default ListPanel;
