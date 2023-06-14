import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const NewsCategorylist = () => {
  const navigate = useNavigate();
  const newsPage = () => {
    navigate("/b2c-news");
  };

  const newsButtons = [{ id: 1, label: "Vesti", action: newsPage }];

  return <ListPage listPageId="NewsCategorylist" apiUrl="admin/news-b2c/category/list" title="Vesti kategorije" columnFields={tblFields} additionalButtons={newsButtons} />;
};

export default NewsCategorylist;
