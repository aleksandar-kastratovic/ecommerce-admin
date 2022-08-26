import { Box, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailsBasic from "../../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";
import AuthContext from "../../../store/auth-contex";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import CreateForm from "../../../components/shared/Form/CreateForm";
import TwoColumnDetails from "../../../components/shared/Layout/Details/TwoColumnDetails/TwoColumnDetails";
import List from "../../../components/shared/ListAdder/List";

import styles from "./DetailsAdminForm.module.scss";
import DetailsList from "./DetailsList";

import listData from "./DetailsListData.json";
import fields from "./DetailsFields.json";
import listFormFileds from "./ListFormFields.json";

import { getProductSpecsSet, postProductSpecsSet } from "../services";

const ProductSpecsDetails = () => {
  const { specId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("info");
  const [detailsList, setDetailsList] = useState(listData);

  const init = {
    id: null,
    slug: "",
    name: "",
    description: "",
    order: 0,
    status: "on",
  };

  const [data, setData] = useState(init);
  const [formFields, setFormFields] = useState(listFormFileds);
  const [inputsError, setInputsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [main, setMain] = useState();

  const handleBackToList = () => {
    navigate(`/product-specs`);
  };

  const handleNewGroup = () => {
    navigate(`/product-specs/groups/new`);
  };

  const listButtons = [
    { id: 1, text: "Kreiraj grupu", action: handleNewGroup },
  ];

  const handleSelectInDetails = (module, slug) => {
    if (specId !== "new") {
      setSelected(slug);
    }
  };

  const handleFormData = async () => {
    try {
      let response = await getProductSpecsSet(user.access_token, specId);
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
    if (type) {
      setData({ ...data, [target.name]: target.checked });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };

  const saveData = async () => {
    try {
      let response = await postProductSpecsSet(user.access_token, data);
      handleBackToList();
      toast.success("Uspešno uneta forma!");
    } catch (error) {
      console.warn(error.response);
      toast.warning("Greška ");
    }
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
    if (specId !== "new") {
      handleFormData();
    }
  }, []);

  const getDisplayed = () => {
    switch (selected) {
      case "info":
        return (
          <Box component="form" autoComplete="off">
            {fields &&
              fields
                .filter(({ in_details }) => in_details)
                .map((item, index) => {
                  return (
                    <CreateForm
                      data-test-id="details-form"
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

      case "fields":
        return (
          <List
            listFields={[]}
            formFields={formFields}
            init={{}}
            onDelete={() => {}}
            required={[]}
            onSave={() => {}}
            additionalButtons={listButtons}
          />
        );

      default:
        return <p>Došlo je do greške! Molimo pokušajte kasnije.</p>;
    }
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
              hasButton={selected === "info"}
              onSubmit={onSubmit}
              buttonText="Sacuvaj"
            />
          }
        />
      </Box>
    </>
  );
};

export default ProductSpecsDetails;
