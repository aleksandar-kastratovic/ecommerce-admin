import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import IconList from "../../../helpers/icons";
import Form from "../../../components/shared/Form/Form";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../helpers/functions";

import Gallery from "./panels/Gallery";
import Seo from "./panels/Seo";

import basic_data from "./forms/basic_data.json";
import Articles from "./panels/Articles/Articles";
import Thumbs from "./panels/Thumbs";

const B2BLandingPagesDetails = () => {
  const { lid } = useParams();
  const api = useAPI();
  const apiPath = "admin/landing-pages-b2c/basic-data";
  const navigate = useNavigate();
  const activeTab = getUrlQueryStringParam("tab") ?? 'basic';

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

  const handleData = async () => {
    setIsLoading(true);
    api.get(`${apiPath}/${lid}`)
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
    setIsLoadingOnSubmit(true);
    let oldId = data.id;
    api.post(apiPath, { ...data })
      .then((response) => {
        setData(response?.payload);
        toast.success("Uspešno");

        if (oldId === null) {
          let tId = response?.payload?.id;

          navigate(`/b2b-landingpages/${tId}`, { replace: true });
        }
        setIsLoadingOnSubmit(false);
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
        setIsLoadingOnSubmit(false);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  const fields = [
    {
      id: "basic",
      name: "Osnovno",
      icon: IconList.inventory,
      enabled: true,
      component: <Form formFields={basic_data} initialData={data} onSubmit={saveData} isLoading={isLoadingOnSubmit} />,
    },
    {
      id: "gallery",
      name: "Galerija",
      icon: IconList.browseGallery,
      enabled: data?.id,
      component: <Gallery pageId={data?.id} />,
    },
    {
      id: "articles",
      name: "Artikli",
      icon: IconList.article,
      enabled: data?.id,
      component: <Articles pageId={data?.id} />,
    },
    {
      id: "thumbs",
      name: "Thumbs",
      icon: IconList.image,
      enabled: data?.id,
      component: <Thumbs pageId={data?.id} />,
    },
    {
      id: "seo",
      name: "SEO",
      icon: IconList.search,
      enabled: data?.id,
      component: <Seo pageId={data?.id} />,
    },
  ];

  // Handle after click on tab panel
  const panelHandleSelect = (field) => {
    let queryString = setUrlQueryStringParam("tab", field.id);
    const id = data.id == null ? "new" : data.id;
    navigate(`/b2b-landingpages/${id}?${queryString}`, { replace: true });
  }

  return <DetailsPage title={data?.id == null ? "Unos nove promo stranice" : data?.name} fields={fields} ready={[lid === "new" || data?.id]} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />;
};

export default B2BLandingPagesDetails;
