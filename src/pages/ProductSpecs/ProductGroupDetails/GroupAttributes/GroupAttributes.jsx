import formFields from "./formFields.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const GroupAttributes = ({ groupId }) => {

  return (
    <>
      <ListPage
        key="group-attribute"
        apiUrl={`admin/product-item-specifications/group-attribute/${groupId}`}
        editUrl={`admin/product-item-specifications/group-attribute`}
        deleteUrl={`admin/product-item-specifications/group-attribute`}
        title=""
        columnFields={formFields}
        actionNewButton="modal"
        addFieldLabel="Dodajte novi atribut"
        showAddButton={true}
      />
    </>
  );
};

export default GroupAttributes;
