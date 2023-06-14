import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const News = () => {
  const navigate = useNavigate();
  const categoryPage = () => {
    navigate("/b2c-news/category");
  };

  const categoryButtons = [{ id: 1, label: "Kategorije", action: categoryPage }];

  return <ListPage listPageId="News" apiUrl="admin/news-b2c/news/list" title="Lista vesti" columnFields={tblFields} additionalButtons={categoryButtons} />;
};

export default News;
