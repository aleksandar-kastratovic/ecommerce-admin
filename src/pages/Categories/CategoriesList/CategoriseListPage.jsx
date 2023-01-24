import { useNavigate, useParams } from "react-router-dom";
import ListPage from "../../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const CategoriesListPage = () => {
    const { gid } = useParams();
    const navigate = useNavigate();

    let buttons = [
        {
            id: 1,
            label: "Grupe",
            action: () => {
                navigate("/product-categories");
            },
        },
    ];

    return <ListPage apiUrl={`admin/category-product/categories`} title="Kategorije" columnFields={tblFields} additionalButtons={buttons} filters={{ id_category_product_group: gid }} />;
};

export default CategoriesListPage;
