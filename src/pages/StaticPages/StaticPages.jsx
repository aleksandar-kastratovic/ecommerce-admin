import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";


const StaticPages = () => {

  return (
    <ListPage listPageId="StaticPages" apiUrl="admin/static-pages-b2c/page" title="Statičke strane" columnFields={tblFields} />
  )
};

export default StaticPages;
