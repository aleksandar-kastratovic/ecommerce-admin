import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./ParamsListFields.json";

const Params = () => {
  return (
    <ListPage
      apiUrl="admin/params/main"
      title="Parametri"
      columnFields={tblFields}
    />
  );
};

export default Params;
