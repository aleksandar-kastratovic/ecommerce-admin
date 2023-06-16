import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2CStaticPages = () => {

  return (
    <ListPage listPageId="B2CStaticPages" apiUrl="admin/static-pages-b2c/list" title="Statičke stranice" columnFields={tblFields} />
  )
};

export default B2CStaticPages;
