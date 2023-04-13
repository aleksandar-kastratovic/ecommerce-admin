import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./tblFields.json";

const Brands = () => {
  return (
    <ListPage
      apiUrl="admin/brands"
      title="Brendovi"
      columnFields={tblFields}
    />
  );
};

export default Brands;
