import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2CCustomers = () => {

  return <ListPage listPageId="B2CCustomers" apiUrl="admin/customers-b2c/profile" title="Kupci" columnFields={tblFields} />;
};

export default B2CCustomers;
