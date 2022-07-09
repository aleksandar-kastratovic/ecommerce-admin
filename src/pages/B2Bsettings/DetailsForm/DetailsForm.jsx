import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

// material-ui components
import Box from "@mui/material/Box";
import CreateForm from "../../../components/shared/Form/CreateForm";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

// components
import DetailsList from "./DetailsList";
import DetailsBasic from "../../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";

// config
import TwoColumnDetails from "../../../components/shared/Layout/Details/TwoColumnDetails/TwoColumnDetails";
import fieldsSlugsBasic from "../fieldsSlugsBasic.json";
import fieldsSlugsLogin from "../fieldsSlugsLogin.json";
import fieldsSlugsShare from "../fieldsSlugsShare.json";
import fieldsSlugsCss from "../fieldsSlugsCss.json";

// other
import { isEmpty } from "lodash";
import AuthContext from "../../../store/auth-contex";
import { useQuery } from "react-query";
import { getSubmodulesList, getSlug, createSlug } from "../services";

import ImagePreview from "../../../components/shared/ImagePreview/ImagePreview";
import { repackToSend } from "./util";

const DetailsForm = ({}) => {
  const { B2BId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    isSuccessList,
    data: response,
    isLoadingList,
    isErrorList,
  } = useQuery(["getSubmodulesList"], () =>
    getSubmodulesList(user.access_token, B2BId)
  );

  const [moduleId, setModuleId] = useState({
    module: "presentation",
    slug: "basic",
  });

  const {
    isSuccessSlugs,
    data: responseSlugs,
    isLoadingSlugs,
    isErrorSlugs,
  } = useQuery(["moduleId", moduleId], () =>
    getSlug(user.access_token, moduleId.module, moduleId.slug)
  );

  const [fields, setFields] = useState(fieldsSlugsBasic);
  // new item
  const [newItem, setNewItem] = useState({});
  const [imagePreviewList, setImagePreviewList] = useState([]);
  const [detailsList, setDetailsList] = useState([]);
  const [loadingForm, setLoadingForm] = useState(false);
  // when you receive a backend validation it should be implemented through the same error object
  // and a context validator avalible on whole app.
  // const [inputsError, setInputsError] = useValidator(context ? context : {});
  // In this example is backend validation presented on one field and it can be also presented via toast or popup etc.
  // useValidator is not a custom hook it is a context that wraps app like auth context now.
  // Ofc they can be merged, but for sake of simplicity they should stay divided.
  const [inputsError, setInputsError] = useState({});
  const [selected, setSelected] = useState("basic");

  useEffect(() => {
    setFields(fieldsSlugsBasic);
  }, []);

  useEffect(() => {
    if (responseSlugs) {
      const repack = responseSlugs?.data?.payload?.items.reduce(
        (acc, cur) => ({ ...acc, [cur.slug]: cur.value }),
        {}
      );
      setNewItem(repack);
    }
  }, [responseSlugs]);

  useEffect(() => {
    if (response) {
      setDetailsList(response?.data?.payload);
    }
  }, [response]);

  useEffect(() => {
    const errors = { ...inputsError };
    Object.keys(errors).forEach((propName) => {
      if (!isEmpty(newItem[propName])) {
        delete errors[propName];
      }
    });
    setInputsError(errors);
  }, [newItem]);

  const onSubmit = () => {
    const errors = {};
    Object.keys(newItem).forEach((propName) => {
      if (isEmpty(newItem[propName])) {
        if (propName === "portal_name") {
          errors[propName] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
        }
      }
    });
    isEmpty(errors) ? saveData() : setInputsError(errors);
  };

  const saveData = () => {
    const repacked = repackToSend(newItem, fields);
    console.log(repacked);
    createSlug(user.access_token, moduleId.module, moduleId.slug, repacked);
    handleBackToList();
  };

  // TODO imitating the async API call it will be removed after configuration fields are retrieved from backend side
  const changeFields = (slug) => {
    const timeoutId = setTimeout(() => {
      setLoadingForm(false);
      switch (slug) {
        case "basic":
          setFields(fieldsSlugsBasic);
          break;
        case "login":
          setFields(fieldsSlugsLogin);
          break;
        case "share":
          setFields(fieldsSlugsShare);
          break;
        case "css":
          setFields(fieldsSlugsCss);
          break;

        default:
          break;
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  };

  const handleSelectInDetails = useCallback(async (module, slug) => {
    setLoadingForm(true);
    setImagePreviewList([]);
    changeFields(slug);
    setModuleId({ ...moduleId, slug: slug });
    setSelected(slug);
  }, []);

  const formItemChangeHandler = ({ target }) => {
    setNewItem({ ...newItem, [target.name]: target.value });
  };

  const formImageUpload = useCallback(
    (event) => {
      event.preventDefault();
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        // setNewItem({ ...newItem, [event.target.name]: reader.result });
        const timeOutId = setTimeout(() => {
          setter(event, reader.result);
        }, 500);
        return () => clearTimeout(timeOutId);
      };
      reader.readAsDataURL(selectedFile);
    },
    [newItem]
  );

  const setter = (event, result) => {
    setNewItem({ ...newItem, [event.target.name]: result });
  };

  const formImagePreview = useCallback(
    (img, label) => {
      const found = imagePreviewList.some((el) => el.image === img);
      if (!found) {
        setImagePreviewList([
          ...imagePreviewList,
          { image: img, label: label },
        ]);
      }
    },
    [imagePreviewList]
  );

  const handleBackToList = () => {
    navigate(`/B2B-settings`);
  };

  return (
    <>
      <DetailsBasic
        handleBackToList={handleBackToList}
        list={
          <DetailsList
            selected={selected}
            detailsList={detailsList}
            handleSelectInDetails={handleSelectInDetails}
            isLoadingList={isLoadingList}
            isErrorList={isErrorList}
          />
        }
        main={
          <TwoColumnDetails
            middle={
              <>
                {!loadingForm || isLoadingSlugs ? (
                  <Box component="form" autoComplete="off">
                    {fields &&
                      fields.map((item, index) => (
                        <CreateForm
                          data-test-id="B2B-settings-form"
                          onChangeHandler={formItemChangeHandler}
                          onImageUpload={formImageUpload}
                          onImagePreview={formImagePreview}
                          item={item}
                          key={index}
                          error={
                            Array.isArray(item)
                              ? item.map(
                                  ({ prop_name }) => inputsError[prop_name]
                                )
                              : inputsError[item.prop_name]
                          }
                          value={
                            Array.isArray(item) && newItem
                              ? newItem[item.prop_name]
                              : newItem[item.prop_name]
                          }
                        />
                      ))}
                  </Box>
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
            right={<ImagePreview imagePreviewList={imagePreviewList} />}
            onSubmit={onSubmit}
            buttonText="Sacuvaj"
          />
        }
      />
      {isErrorSlugs && (
        <Stack sx={{ width: "100%" }}>
          <Alert severity="error">
            Doslo je do greske. Molim Vas pokusajte kasnije.
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default DetailsForm;
