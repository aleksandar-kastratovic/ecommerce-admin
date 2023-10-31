import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import IconList from "../../../helpers/icons";

import formFields from "./formFields.json";
import Seo from "./panels/Seo";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../helpers/functions";
import AuthContext from "../../../store/auth-contex";

const B2CNewsCategoryListDetails = () => {
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const { cid } = useParams();
  const apiPath = "admin/news-b2c/category/basic-data";
  const navigate = useNavigate();
  const activeTab = getUrlQueryStringParam("tab") ?? 'basic';

  const init = {
    id: null,
    slug: null,
    name: null,
    image: null,
    short_description: null,
    description: null,
    parent_id: null,
    category_path: null,
  };

  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async () => {
    setIsLoading(true);
    api.get(`${apiPath}/${cid}`)
      .then((response) => {
        setData(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const saveData = async (data) => {
    api.post(apiPath, { ...data, image: data.image })
      .then((response) => {
        setData(response?.payload);
        toast.success("Uspešno");
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
      });
  };

  useEffect(() => {
    handleData();
  }, []);
  const fields = [
    {
      id: "basic",
      name: "Osnovno",
      icon: IconList.category,
      enabled: true,
      component: <Form formFields={formFields} initialData={data} onSubmit={saveData} />,
    },
    {
      id: "seo",
      name: "Seo",
      icon: IconList.search,
      enabled: data?.id,
      component: <Seo categoryId={data?.id} />,
    },
  ];

  // Handle after click on tab panel
  const panelHandleSelect = (field) => {
    let queryString = setUrlQueryStringParam("tab", field.id);
    const id = data.id == null ? "new" : data.id;
    navigate(`/b2c-news/category/${id}?${queryString}`, { replace: true });
  }


  return <DetailsPage title={data?.id == null ? "Unos nove kategorije" : data?.name} fields={fields} ready={!isLoading} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />;
};

export default B2CNewsCategoryListDetails;
