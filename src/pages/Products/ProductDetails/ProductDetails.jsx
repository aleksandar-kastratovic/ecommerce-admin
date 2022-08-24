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

import basic_data from "./forms/basic_data.json";
import CreateForm from "../../../components/shared/Form/CreateForm";

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
  const [main, setMain] = useState();

  const handleBackToList = () => {
    navigate(`/products`);
  };

  const handleSelectInDetails = (module, slug) => {
    if (prodId !== "new") {
      setSelected(slug);
    }
  };

  const handleFormData = async () => {};

  const handleFormFields = async () => {};

  const formItemChangeHandler = ({ target }, type) => {
    if (type) {
      setData({ ...data, [target.name]: target.checked });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };

  const saveData = async () => {
    console.log("test");
  };

  const onSubmit = () => {
    const errors = {};
    Object.keys(data).forEach((prop_name) => {
      if (isEmpty(data[prop_name])) {
        if (
          prop_name === "slug" ||
          prop_name === "module" ||
          prop_name === "method" ||
          prop_name === "action_url"
        )
          errors[prop_name] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
      }
    });
    isEmpty(errors) ? saveData() : setInputsError(errors);
  };

  useEffect(() => {
    if (prodId !== "new") {
      handleFormData();
    }
  }, []);

  useEffect(() => {
    if (selected === "fields" && prodId !== "new") {
      handleFormFields();
    }
  }, [selected]);

  const getDisplayed = () => {
    return (
      <Box component="form" autoComplete="off">
        {basic_data &&
          basic_data
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
