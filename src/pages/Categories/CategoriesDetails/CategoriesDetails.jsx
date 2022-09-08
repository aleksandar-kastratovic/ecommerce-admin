import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Form from "../../../components/shared/Form/Form";
import IconList from "../../../helpers/icons";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import DetailsSeo from "./DetailsSeo/DetailsSeo";
import DetailsSpecification from "./DetailsSpecification/DetailsSpecification";

import formFields from "./formFields.json";

const CategoriesDetails = () => {
  const { gid, cid } = useParams();
  const init = {
    id: null,
    field_type: null,
    field_is_multiple: false,
    field_description: null,
    slug: null,
    name: null,
    int_value: null,
    text_value: null,
    datetime_value: null,
    title: null,
    subtitle: null,
    description: null,
    image: null,
    button: null,
    target: null,
    url: null,
    active_from: null,
    active_to: null,
    status: "on",
  };
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const api = useAPI();

  const handleSubmit = (data) => {
    api
      .post("admin/category_product/categories/", { ...data, id_category_product_groups: gid })
      .then((response) => {
        setData(response?.payload);
        toast.success("Uspešno");
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
      });
  };

  const handleData = async () => {
    setIsLoading(true);
    await api
      .get(`admin/category_product/categories/${cid}`)
      .then((response) => {
        setData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    handleData();
  }, []);

  const fields = [
    {
      name: "Osnovno",
      icon: IconList.category,
      disabled: false,
      component: (
        <div>
          {!isLoading ? (
            <Form
              formFields={formFields}
              initialData={data}
              onSubmit={handleSubmit}
              queryString={`id_category_product_groups=${gid}&id_category_product=${cid}`}
            />
          ) : (
            <LoadingForm fields={formFields.length} />
          )}
        </div>
      ),
    },
    {
      name: "Seo",
      icon: IconList.search,
      disabled: cid === "new",
      component: <DetailsSeo cid={cid} gid={gid} />,
    },
    {
      name: "Specifikacija",
      icon: "settings",
      disabled: cid === "new",
      component: <DetailsSpecification cid={cid} gid={gid} />,
    },
  ];

  return <DetailsPage title={cid === "new" ? "Unos nove kategorije" : data?.name} fields={fields} />;
};

export default CategoriesDetails;
