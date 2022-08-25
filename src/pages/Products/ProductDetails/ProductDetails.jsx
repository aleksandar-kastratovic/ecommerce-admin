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

const adderFields = ["prices", "inventories", "categories", "seo"];
const multipleImages = [
  "gallery",
  "technical_doc",
  "certificate_doc",
  "instruction_doc",
];
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

  const [data, setData] = useState(init);
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

  const handleFormFields = async () => {};

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
      let repack = { ...data };
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
          init={{}}
          onDelete={() => {}}
          required={requiredFields}
          onSave={onSubmit}
        />
      );
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
              hasButton={true}
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
