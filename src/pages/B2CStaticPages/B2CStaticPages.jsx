import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";


const B2CStaticPages = () => {

  return (
    <ListPage listPageId="B2CStaticPages" apiUrl="admin/news-b2c/news/list" title="Statičke stranice" columnFields={tblFields} />
  )
};

export default B2CStaticPages;
