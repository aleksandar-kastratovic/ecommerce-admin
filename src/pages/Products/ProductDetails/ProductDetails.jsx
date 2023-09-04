import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Specification from "./ProductDetailsSpecification/Specification";
import ProductDetailsVariation from "./ProductDetailsVariation/ProductDetailsVariation";
import useAPI from "../../../api/api";
import IconList from "../../../helpers/icons";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Form from "../../../components/shared/Form/Form";
import Declaration from "./panels/Declaration";
import Seo from "./panels/Seo";
import Description from "./panels/Description";
import Prices from "./panels/Prices";

import basic_data from "./forms/basic_data.json";
import Inventories from "./panels/Inventories";
import Categories from "./panels/Categories";
import Gallery from "./panels/Gallery";
import Document from "./panels/Document";
import DisplayIn from "./panels/DisplayIn";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../helpers/functions";

const ProductDetails = () => {
  const { prodId } = useParams();
  const navigate = useNavigate();
  const activeTab = getUrlQueryStringParam("tab") ?? 'basic';
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

  const init = {
    id: null,
    b2b_active: false,
    b2c_active: false,
    name: null,
    sku: null,
    barcode: null,
    new: false,
    new_from: null,
    new_to: null,
    status: "on",
  };

  const [data, setData] = useState(init);
  const [basicDataTemp, setBasicDataTemp] = useState(basic_data);
  const api = useAPI();

  const updateNewFieldsInDetails = (data, isNew) => {

    data.map((item, i) => {
      if (isNew) {
        if (item.prop_name === 'new_from' || item.prop_name === 'new_to') {
          item.in_details = true;
        }
      } else {
        if (item.prop_name === 'new_from' || item.prop_name === 'new_to') {
          item.in_details = false;
        }
      }
    })
    setBasicDataTemp([...data]);
  };

  const handleSubmit = (data) => {
    setIsLoadingOnSubmit(true);
    let oldId = data.id;
    api.post(`admin/product-items/basic-data/`, data)
      .then((response) => {
        toast.success("Uspešno");
        setData(response?.payload);
        if (oldId === null) {
          let tId = response?.payload?.id;
          navigate(`/products/${tId}`, { replace: true });
        }
        setIsLoadingOnSubmit(false);
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
        setIsLoadingOnSubmit(false);
      });
  };

  const handleData = () => {
    api.get(`admin/product-items/basic-data/${prodId}`)
      .then((response) => {
        setData(response?.payload)
        updateNewFieldsInDetails(basic_data, response?.payload?.new);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    handleData();
  }, []);

  const validateData = (data, field) => {
    let ret = data;
    switch (field) {
      case "new":
        updateNewFieldsInDetails(basic_data, ret.new);
        return ret;
      default:
        return ret;
    }
  };

  const fields = [
    {
      id: "basic",
      name: "Osnovno",
      icon: IconList.inventory,
      enabled: true,
      component: <Form formFields={basicDataTemp} initialData={data} onSubmit={handleSubmit} validateData={validateData} isLoading={isLoadingOnSubmit} />,
    },
    {
      id: "description",
      name: "Opis",
      icon: IconList.description,
      enabled: data?.id,
      component: <Description productId={data?.id} />,
    },
    {
      id: "prices",
      name: "Cene",
      icon: IconList.money,
      enabled: data?.id,
      component: <Prices productId={data?.id} />,
    },
    {
      id: "lager",
      name: "Lager",
      icon: IconList.inventory2,
      enabled: data?.id,
      component: <Inventories productId={data?.id} />,
    },
    {
      id: "category",
      name: "Kategorije",
      icon: IconList.category,
      enabled: data?.id,
      component: <Categories productId={data?.id} />,
    },
    {
      id: "gallery",
      name: "Galerija",
      icon: IconList.browseGallery,
      enabled: data?.id,
      component: <Gallery productId={data?.id} />,
    },
    {
      id: "declaration",
      name: "Deklaracija",
      icon: IconList.editDocument,
      enabled: data?.id,
      component: <Declaration productId={data?.id} />,
    },
    {
      id: "seo",
      name: "SEO",
      icon: IconList.search,
      enabled: data?.id,
      component: <Seo productId={data?.id} />,
    },
    {
      id: "display",
      name: "Prikaz",
      icon: IconList.displaySettings,
      enabled: data?.id,
      component: <DisplayIn productId={data?.id} />,
    },
    {
      id: "document",
      name: "Dokumenta",
      icon: IconList.documentScanner,
      enabled: data?.id,
      component: <Document productId={data?.id} />,
    },
    {
      id: "specifications",
      name: "Specifikacije",
      icon: IconList.checklist,
      enabled: data?.id,
      component: <Specification productId={data?.id} data={data} />,
    },
    {
      id: "variation",
      name: "Varijacije",
      icon: IconList.difference,
      enabled: data?.id,
      component: <ProductDetailsVariation parentId={data?.id} />,
    },
  ];

  // Handle after click on tab panel
  const panelHandleSelect = (field) => {
    let queryString = setUrlQueryStringParam("tab", field.id);
    const id = data.id == null ? "new" : data.id;
    navigate(`/products/${id}?${queryString}`, { replace: true });
  }

  return <DetailsPage title={data?.id == null ? "Unos novog proizvoda" : data?.name} fields={fields} ready={[prodId === "new" || data?.id]} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />;
};

export default ProductDetails;
