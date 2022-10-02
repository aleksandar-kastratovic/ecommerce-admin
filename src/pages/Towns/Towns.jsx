import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Towns = () => {
  return (
    <ListPage apiUrl="admin/towns" title="Mesta" columnFields={tblFields} />
  );
};

export default Towns;
