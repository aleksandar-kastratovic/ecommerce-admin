import { useNavigate, useParams } from "react-router-dom";
import TreeView from "../../../components/shared/TreeView/TreeView";
import tblFields from "./tblFields.json";

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

    // TODO remove const
    const api = "https://api.staging.croonus.com/api/v1/admin/category-product/tree?group=2";

    return <TreeView apiUrl={`admin/category-product/tree/${gid}`} title="Kategorije" columnFields={tblFields} additionalButtons={buttons} filters={{ id_category_product_group: gid }} />;
};

export default CategoriesTree;
