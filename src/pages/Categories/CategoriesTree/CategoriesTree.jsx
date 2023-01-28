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
                navigate("/product-categories");
            },
        },
    ];

    return <TreeView apiUrl={`admin/category-product/tree/`} title="Kategorije" columnFields={tblFields}  filters={{ id_category_product_group: gid }} />;
    // additionalButtons={buttons}
};

export default CategoriesTree;
