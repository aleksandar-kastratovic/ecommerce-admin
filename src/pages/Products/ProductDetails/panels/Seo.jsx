import ListPage from "../../../../components/shared/ListPage/ListPage";

import formFields from "../forms/seo.json";

const Seo = ({ productId }) => {

  return (
    <>
      <ListPage
        listPageId="ProductSeo"
        apiUrl={`admin/product-items/seo/${productId}`}
        editUrl={`admin/product-items/seo`}
        deleteUrl={`admin/product-items/seo`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        initialData={{ id_product: productId }}
        addFieldLabel="Dodajte novu vrednost"
        showAddButton={true}
      />
    </>
  );
};

export default Seo;
