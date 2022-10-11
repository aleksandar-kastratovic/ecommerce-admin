import { useNavigate, useParams } from "react-router-dom";
import TreeView from "../../../components/shared/TreeView/TreeView";
import tblFields from "./tblFields.json";
// TODO remove after implementing real API
import mockData from "./mockData.json";

const CategoriesTree = () => {
    const { gid } = useParams();
    const navigate = useNavigate();

    let buttons = [
        {
            id: 1,
            label: "Grupe",
            action: () => {
                navigate("/categories");
            },
        },
    ];

    const api = "https://api.staging.croonus.com/api/v1/admin/category-product/tree?group=2";

    return (
        <TreeView
            mockData={mockData}
            // apiUrl={`admin/category_product/categories`}
            apiUrl={`admin/category-product/tree`}
            title="Kategorije"
            columnFields={tblFields}
            additionalButtons={buttons}
            filters={{ id_category_product_group: gid }}
        />
    );
};

export default CategoriesTree;
