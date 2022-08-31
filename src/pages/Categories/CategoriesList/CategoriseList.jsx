import { useParams } from "react-router-dom";
import ListPage from "../../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const CategoriesList = () => {
  const { gid } = useParams();

  return (
    <ListPage
      apiUrl={`admin/category_product/categories/${gid}`}
      title="Kategorije"
      columnFields={tblFields}
    />
  );
};

export default CategoriesList;
