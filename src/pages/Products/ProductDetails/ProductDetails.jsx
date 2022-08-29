import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import { useNavigate, useParams } from "react-router-dom";

import detailsListProducts from "./DetailsListData.json";
import fields from "./DetailsListFields.json";
import { Box, Skeleton, Stack } from "@mui/material";
import DetailsBasic from "../../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";
import DetailsList from "./DetailsList";
import TwoColumnDetails from "../../../components/shared/Layout/Details/TwoColumnDetails/TwoColumnDetails";

import styles from "./ProductDetails.module.scss";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-contex";
import { isEmpty } from "lodash";
import CreateForm from "../../../components/shared/Form/CreateForm";

import basic_data from "./forms/basic_data.json";
import categories from "./forms/categories.json";
import certificate_doc from "./forms/certificate_doc.json";
import declaration from "./forms/declaration.json";
import description from "./forms/description.json";
import gallery from "./forms/gallery.json";
import instruction_doc from "./forms/instruction_doc.json";
import inventories from "./forms/inventories.json";
import prices from "./forms/prices.json";
import seo from "./forms/seo.json";
import technical_doc from "./forms/tehnical_doc.json";
import requiredFields from "./forms/requiredFields.json";

import {
  getListProductSection,
  getProductSlugData,
  postProductSlugData,
} from "../services";
import List from "../../../components/shared/ListAdder/List";
import { toast } from "react-toastify";
import { formatDate } from "../../../helpers/dateFormat";
import Specification from "./ProductDetailsSpecification/Specification";

const adderFields = ["prices", "inventories", "categories", "seo"];
const multipleImages = [
  "gallery",
  "technical_doc",
  "certificate_doc",
  "instruction_doc",
];

let inits = {
  basic_data: {
    id: null,
    b2b_active: 0,
    b2c_active: 0,
    name: "",
    sku: "",
    barcode: "",
    new: 1,
    new_from: "",
    new_to: "",
    order: 0,
  },
  certificate_doc: {
    id: null,
    id_product: 0,
    id_product_variant: 0,
    id_category: 0,
    certificate_doc: "",
  },
  technical_doc: {
    id: null,
    id_product: 0,
    id_product_variant: 0,
    id_category: 0,
  },
  categories: {
    id: null,
    id_product: 0,
    id_product_variant: 0,
    id_category: 0,
    category_path: "",
  },
  inventories: {
    id: null,
    id_product: 0,
    id_product_variant: 0,
    id_location: 0,
    quantity: 0,
    unit: "",
  },
  prices: {
    id: 0,
    id_product: 0,
    system: "",
    country: 0,
    currency: "",
    type: "",
    group: "",
    id_product_variant: 0,
    price_single_with_out_vat: 0,
    price_single_with_vat: 0,
    price_vat_procent: 0,
    price_quantity: null,
    price_unit: "",
    active_to: "",
    price_with_out_vat: 0,
    price_with_vat: 0,
  },
  gallery: {
    id: null,
    id_product: 0,
    id_product_variant: null,
    gallery: "",
  },
  instruction_doc: {
    id: null,
    id_product: 0,
    id_product_variant: null,
    instruction_doc: "",
  },
  description: {
    id: 0,
    short_description: "",
    description: "",
  },
  declaration: {
    id: 0,
    declaration_id_manufacture: 0,
    declaration_manufacture_name: "",
    declaration_id_country: 0,
    declaration_country_name: "",
    declaration_name: "",
    declaration_note: "",
    declaration_year: "",
  },
  seo: {
    id: null,
    id_product: 0,
    id_product_variant: 0,
    id_country: 0,
    lang: "",
    slug: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    meta_url: "",
    active: 0,
    order: 0,
  },
};

const ProductDetails = () => {
  const { prodId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("basic_data");
  const [detailsList, setDetailsList] = useState(detailsListProducts);

  const init = {
    id: null,
    b2b_active: 0,
    b2c_active: 0,
    name: "",
    sku: "",
    barcode: "",
    new: 0,
    new_from: "",
    new_to: "",
    order: 0,
  };

  const [data, setData] = useState(inits[selected]);
  const [formFields, setFormFields] = useState([]);
  const [inputsError, setInputsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [listFields, setListFields] = useState();

  const handleBackToList = () => {
    navigate(`/products`);
  };

  const handleSelectInDetails = (module, slug) => {
    if (prodId !== "new") {
      setSelected(slug);
    }
  };

  const handleData = async () => {
    try {
      let response = await getProductSlugData(
        user.access_token,
        prodId,
        selected
      );
      let { payload } = response.data;
      setData(payload);
      setIsLoading(true);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formItemChangeHandler = ({ target }, type) => {
    if (type === "date") {
      setData({ ...data, [target.name]: formatDate(target.value) });
    } else if (type) {
      setData({ ...data, [target.name]: target.checked });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };

  const handleListFields = async () => {
    try {
      let response = await getListProductSection(
        user.access_token,
        {
          filter: prodId,
        },
        selected
      );
      setListFields(response?.data?.payload?.items);
      setIsLoading(true);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    try {
      let repack = { ...inits[selected], ...data };

      if (prodId !== "new") {
        repack.id = prodId;
      }
      let response = await postProductSlugData(
        user.access_token,
        repack,
        selected
      );
      if (prodId === "new") handleBackToList();
      toast.success("Uspešno dodati podaci!");
    } catch (error) {
      console.warn(error);
    }
  };

  const saveListData = async (listData) => {
    try {
      console.log(listData);
      let repack = { ...listData, id_product: prodId, id_product_variant: 0 };

      let response = await postProductSlugData(
        user.access_token,
        repack,
        selected
      );
      console.log(response);
      if (prodId === "new") handleBackToList();
      toast.success("Uspešno dodati podaci!");
    } catch (error) {
      console.warn(error);
    }
  };

  const onSubmit = () => {
    const errors = {};
    Object.keys(data).forEach((prop_name) => {
      if (isEmpty(data[prop_name])) {
        if (requiredFields.includes(prop_name))
          errors[prop_name] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
      }
    });
    isEmpty(errors) ? saveData() : setInputsError(errors);
  };

  const onListSubmit = (listData) => {
    console.log("here");
    saveListData(listData);
  };

  useEffect(() => {
    switch (selected) {
      case "basic_data":
        setFormFields(basic_data);
        break;
      case "categories":
        setFormFields(categories);
        break;
      case "certificate_doc":
        setFormFields(certificate_doc);
        break;
      case "declaration":
        setFormFields(declaration);
        break;
      case "description":
        setFormFields(description);
        break;
      case "gallery":
        setFormFields(gallery);
        break;
      case "instruction_doc":
        setFormFields(instruction_doc);
        break;
      case "inventories":
        setFormFields(inventories);
        break;
      case "prices":
        setFormFields(prices);
        break;
      case "seo":
        setFormFields(seo);
        break;
      case "technical_doc":
        setFormFields(technical_doc);
        break;
      default:
        setFormFields(basic_data);
        break;
    }

    if (prodId !== "new") {
      if (adderFields.includes(selected) || multipleImages.includes(selected)) {
        handleListFields();
      } else if (selected === "specification") {
      } else {
        handleData();
      }
    }
  }, [selected]);

  const getDisplayed = () => {
    if (adderFields.includes(selected)) {
      return (
        <List
          key={selected}
          listFields={listFields}
          formFields={formFields}
          init={inits[selected]}
          onDelete={() => {}}
          required={requiredFields}
          onSave={onListSubmit}
        />
      );
    }
    if (selected === "specification") {
      return <Specification productId={prodId} />;
    } else if (selected === "variation") {
    }
    return (
      <Box component="form" autoComplete="off">
        {formFields &&
          formFields
            .filter(({ in_details }) => in_details)
            .map((item, index) => {
              return (
                <CreateForm
                  data-test-id="admin-form"
                  onChangeHandler={formItemChangeHandler}
                  item={item}
                  key={index}
                  error={inputsError[item.prop_name]}
                  value={
                    Array.isArray(item) && data
                      ? data[item.prop_name]
                      : data[item.prop_name]
                  }
                />
              );
            })}
      </Box>
    );
  };
  return (
    <>
      <Box className={styles.details}>
        <DetailsBasic
          handleBackToList={handleBackToList}
          list={
            <DetailsList
              selected={selected}
              detailsList={detailsList}
              handleSelectInDetails={handleSelectInDetails}
              isLoadingList={false}
              isErrorList={false}
            />
          }
          main={
            <TwoColumnDetails
              middle={
                <>
                  {!isLoading ? (
                    getDisplayed()
                  ) : (
                    <Stack spacing={1}>
                      <Skeleton variant="text" height={60} />
                      <Skeleton variant="text" height={60} />
                      <Stack spacing={1}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={118}
                        />
                      </Stack>
                      <Skeleton variant="text" height={60} />
                    </Stack>
                  )}
                </>
              }
              hasButton={
                !(
                  adderFields.includes(selected) || selected === "specification"
                )
              }
              onSubmit={onSubmit}
              buttonText="Sacuvaj"
            />
          }
        />
      </Box>
    </>
  );
};

export default ProductDetails;
