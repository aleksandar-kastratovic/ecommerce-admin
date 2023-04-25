import formFields from "./formFields.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const GroupValues = ({ groupId }) => {

  return (
    <>
      <ListPage
        key="group-attribute-values"
        apiUrl={`admin/product-item-specifications/group-attribute-values/${groupId}`}
        editUrl={`admin/product-item-specifications/group-attribute-values`}
        deleteUrl={`admin/product-item-specifications/group-attribute-values`}
        title=""
        columnFields={formFields}
        actionNewButton="modal"
        addFieldLabel="Dodajte novu vrednost"
        showAddButton={true}
        initialData={{ id_group: groupId }}
      />
    </>
  );
};

export default GroupValues;
