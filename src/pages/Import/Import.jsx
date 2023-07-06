import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Import = () => {

  return (
    <ListPage listPageId="Import" apiUrl="admin/static-pages-b2c/list" title="Uvoz podataka iz fajla" columnFields={tblFields} />
  )
};

export default Import;
