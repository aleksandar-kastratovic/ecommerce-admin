import ListPage from "../../../../components/shared/ListPage/ListPage";
import formFields from "./formFields.json";


const DetailsSeo = ({ cid }) => {

  return (
    <>
      <ListPage
        listPageId="CategoriesSeo"
        apiUrl={`admin/category-product/seo/${cid}`}
        editUrl={`admin/category-product/seo`}
        deleteUrl={`admin/category-product/seo`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        initialData={{ id_category_product: cid }}
        addFieldLabel="Dodajte novu vrednost"
        showAddButton={true}
      />
    </>
  );
};

export default DetailsSeo;
