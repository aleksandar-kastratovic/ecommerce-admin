import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const News = () => {
    const navigate = useNavigate();
    const categoryPage = () => {
        navigate("/news/category");
    };

    const categoryButtons = [{ id: 1, label: "Kategorije", action: categoryPage }];

    return <ListPage apiUrl="admin/news-b2c/news/basic-data" title="Lista vesti" columnFields={tblFields} additionalButtons={categoryButtons} />;
};

export default News;
