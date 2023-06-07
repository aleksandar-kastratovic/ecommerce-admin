import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Countries = () => {
  return (
    <ListPage apiUrl="admin/countries" title="Države" columnFields={tblFields} actionNewButton="modal" />
  );
};

export default Countries;
