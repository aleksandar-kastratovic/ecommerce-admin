import { useLocation, useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import columnFields from "./tblFields.json";

const ProductVariantsAttributes = () => {

  const { pathname } = useLocation();

  const customActions = {
    attribution: {
      type: "custom",
      display: true,
      position: 2,
      clickHandler: {
        type: 'navigate',
        fnc: (rowData) => {
          return `${pathname}/${rowData.id}`;
        },
      },
      icon: "attribution",
      title: "Dupliraj"
    }
  };

  return (
    <ListPage
      apiUrl="admin/product-item-specifications/group"
      title="Specifikacije"
      columnFields={columnFields}
      showNewButton={true}
      actionNewButton="modal"
      customActions={customActions}
    />
  );
};

export default ProductVariantsAttributes;
