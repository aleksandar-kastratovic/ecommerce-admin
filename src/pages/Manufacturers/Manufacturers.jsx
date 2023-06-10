import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./tblFields.json";

const Manufacturers = () => {
  return (
    <ListPage apiUrl="admin/manufacturers" title="Proizvođači" columnFields={tblFields} actionNewButton="modal" />
  )
};

export default Manufacturers;