import List from "./ListAdder/List";

const Specification = ({ productId }) => {
    const apiPath = "admin/product-items/specifications";
    return <List productId={productId} apiPath={apiPath} />;
};

export default Specification;
