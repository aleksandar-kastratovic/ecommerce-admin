import { useLocation, useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import columnFields from "./tblFields.json";

const ProductSpecsGroups = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const customActions = {
    type1: {
      handler: (rowData) => {
        navigate(`${pathname}/${rowData.id}`)
      },
      icon: "queue_play_next",
      title: "Atributi i njene vrednosti"
    }
  };

  const renderDeleteModalContent = (rowData) => {

    console.log('row_data', rowData)

    return (
      <>
        {/* <p>sda</p> */}
        fd
      </>
    );
  };

  return (
    <ListPage
      apiUrl="admin/product-item-specifications/group"
      title="Specifikacije"
      columnFields={columnFields}
      showNewButton={true}
      actionNewButton="modal"
      customActions={customActions}
      deleteModalChildren={renderDeleteModalContent}
    />
  );
};

export default ProductSpecsGroups;
