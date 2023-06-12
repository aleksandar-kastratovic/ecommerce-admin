import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Stores = () => {
  return <ListPage listPageId="Stores" apiUrl="admin/stores" title="Skladišta" columnFields={tblFields} actionNewButton="modal" />;
};

export default Stores;
