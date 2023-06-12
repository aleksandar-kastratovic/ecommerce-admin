import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./tblFields.json";

const Brands = () => {
  return (
    <ListPage
      listPageId="Brands"
      apiUrl="admin/brands"
      actionNewButton="modal"
      title="Brendovi"
      columnFields={tblFields}
    />
  );
};

export default Brands;
