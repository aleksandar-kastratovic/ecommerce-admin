import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Streets = () => {
  return (
    <ListPage apiUrl="admin/streets" title="Ulice" columnFields={tblFields} />
  );
};

export default Streets;
