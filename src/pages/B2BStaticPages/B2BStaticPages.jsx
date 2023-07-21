import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2BStaticPages = () => {

  return (
    <ListPage listPageId="B2BStaticPages" apiUrl="admin/static-pages-b2c/list" title="Statičke stranice" columnFields={tblFields} />
  )
};

export default B2BStaticPages;
