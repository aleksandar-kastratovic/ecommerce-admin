import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Stores = () => {
  return (
    <ListPage apiUrl="admin/stores" title="Skladišta" columnFields={tblFields} />
  );
};

export default Stores;
