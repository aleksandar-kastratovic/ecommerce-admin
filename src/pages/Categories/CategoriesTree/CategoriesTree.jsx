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

    return <TreeView apiUrl={`admin/category_product/categories`} title="Kategorije" columnFields={tblFields} additionalButtons={buttons} filters={{ id_category_product_group: gid }} />;
};

export default CategoriesTree;
