import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
// import List from "../../../../components/shared/ListAdder/List";
import ListPage from "../../../../components/shared/ListPage/ListPage";

import formFields from "../forms/seo.json";

const Seo = ({ productId }) => {
  const init = {
    id: null,
    id_product: productId,
    id_country: null,
    id_lang: null,
    slug: null,
    meta_title: null,
    meta_keywords: null,
    meta_description: null,
    meta_url: null,
  };

  // const [listData, setListData] = useState([]);
  // const api = useAPI();
  // const apiPath = "admin/product-items/seo";

  // const handleList = () => {
  //   api.list(`${apiPath}/${productId}`)
  //     .then((response) => setListData(response?.payload?.items))
  //     .catch((error) => console.warn(error));
  // };

  // const handleSubmit = (data) => {
  //   api.post(apiPath, data)
  //     .then((response) => {
  //       toast.success("Uspešno");
  //       handleList();
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //       toast.warn(error);
  //     });
  // };

  // const handleDelete = (token, id) => {
  //   api.delete(`${apiPath}/${id}`)
  //     .then((response) => {
  //       toast.success("Uspešno");
  //       handleList();
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //       toast.warn(error);
  //     });
  // };

  // useEffect(() => {
  //   handleList();
  // }, []);

  return (
    <>
      <ListPage
        listPageId="ProductSeo"
        apiUrl={`admin/product-items/seo/${productId}`}
        editUrl={`admin/product-items/seo`}
        deleteUrl={`admin/product-items/seo`}
        delete
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
