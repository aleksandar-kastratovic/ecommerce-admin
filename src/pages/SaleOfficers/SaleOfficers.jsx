import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const SaleOfficers = () => {
  return (
    <ListPage
      apiUrl="admin/referents-b2b"
      title="Komercijalisti"
      columnFields={tblFields}
    />
  );
};

export default SaleOfficers;
