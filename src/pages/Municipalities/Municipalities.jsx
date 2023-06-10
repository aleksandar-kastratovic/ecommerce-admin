import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Municipalities = () => {
  return (
    <ListPage apiUrl="admin/municipalities" title="Opštine" columnFields={tblFields} actionNewButton="modal" />
  );
};

export default Municipalities;
