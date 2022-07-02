import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

// material-ui components
import Box from "@mui/material/Box";
import CreateForm from "../../../components/shared/Form/CreateForm";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import DetailsList from "./DetailsList";
import TwoColumnDetails from "../../../components/shared/Layout/Details/TwoColumnDetails/TwoColumnDetails";
import fieldsSlugsBasic from "../fieldsSlugsBasic.json";
import fieldsSlugsLogin from "../fieldsSlugsLogin.json";
import fieldsSlugsShare from "../fieldsSlugsShare.json";
import fieldsSlugsCss from "../fieldsSlugsCss.json";
import { isEmpty } from "lodash";
import DetailsBasic from "../../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";

import AuthContext from "../../../store/auth-contex";
import { useQuery } from "react-query";
import { getSubmodulesList, getSlug } from "../services";

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
  const [newItem, setNewItem] = useState({ name: "", b2b: "", key_word: "" });
  const [slugs, setSlugs] = useState([]);
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
      setSlugs(responseSlugs?.data?.payload?.items);
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
        if (propName !== "subname") {
          errors[propName] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
        }
      }
    });
    isEmpty(errors) ? console.log(newItem) : setInputsError(errors);
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
    changeFields(slug);
    setFields(fieldsSlugsBasic);
    setModuleId({ ...moduleId, slug: slug });
    setSelected(slug);
  }, []);

  const formItemChangeHandler = ({ target }) => {
    setNewItem({ ...newItem, [target.name]: target.value });
  };

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
                          item={item}
                          key={index}
                          error={
                            Array.isArray(item)
                              ? item.map(({ slug }) => inputsError[slug])
                              : inputsError[item.slug]
                          }
                          value={
                            !isLoadingSlugs ? slugs[index]?.value : "neko ime"
                          }
                        />
                      ))}
                  </Box>
                ) : (
                  <Stack spacing={1}>
                    <Skeleton variant="text" height={80} />
                    <Skeleton variant="text" height={80} />
                    <Skeleton variant="text" height={80} />
                  </Stack>
                )}
              </>
            }
            right={<div />}
            onSubmit={onSubmit}
            buttonText="Sacuvaj"
          />
        }
      />
    </>
  );
};

export default DetailsForm;
