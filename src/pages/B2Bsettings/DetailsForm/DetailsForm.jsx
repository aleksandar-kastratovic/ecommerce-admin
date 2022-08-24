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
import ImagePreview from "../../../components/shared/ImagePreview/ImagePreview";
import ImageDialog from "../../../components/shared/Dialogs/ImageDialog";

// config
import TwoColumnDetails from "../../../components/shared/Layout/Details/TwoColumnDetails/TwoColumnDetails";

// other
import { isEmpty } from "lodash";
import AuthContext from "../../../store/auth-contex";
import { useQuery } from "react-query";
import {
  getSubmodulesList,
  getSlug,
  createSlug,
  getFormBySlug,
} from "../services";

import { repackToSend, isUrlValid } from "./util";

import styles from "./DetailsForm.module.scss";

const DetailsForm = ({}) => {
  const { B2BId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [moduleId, setModuleId] = useState({
    module: "presentation",
    slug: "basic",
  });
  const [openImageDialog, setOpenImageDialog] = useState({
    show: false,
    image: null,
    label: "",
    name: "",
  });
  const [fields, setFields] = useState([]);
  // new item
  const [newItem, setNewItem] = useState({});
  // const [imagePreviewList, setImagePreviewList] = useState([]);
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

  const {
    isSuccessList,
    data: response,
    isLoadingList,
    isErrorList,
  } = useQuery(["moduleId", moduleId.module], () =>
    getSubmodulesList(user.access_token, B2BId)
  );

  const {
    isSuccessSlugs,
    data: responseSlugs,
    isLoadingSlugs,
    isErrorSlugs,
  } = useQuery(["moduleId", moduleId], () =>
    getSlug(user.access_token, moduleId.module, moduleId.slug)
  );

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
    createSlug(user.access_token, moduleId.module, moduleId.slug, repacked);
    handleBackToList();
  };

  const changeFields = async (slug) => {
    try {
      let response = await getFormBySlug(user.access_token, slug);
      setFields(response?.data?.payload);
      setLoadingForm(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSelectInDetails = useCallback(async (module, slug) => {
    setLoadingForm(true);
    // setImagePreviewList([]);
    setModuleId({ ...moduleId, slug: slug });
    setSelected(slug);
  }, []);

  useEffect(() => {
    changeFields(selected);
  }, [selected]);

  const formItemChangeHandler = ({ target }) => {
    setNewItem({ ...newItem, [target.name]: target.value });
  };

  const formImageUpload = useCallback(
    (event) => {
      event.preventDefault();
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const timeOutId = setTimeout(() => {
          imageSetter(event, reader.result);
        }, 800);
        return () => clearTimeout(timeOutId);
      };
      reader.readAsDataURL(selectedFile);
    },
    [newItem]
  );

  const imageSetter = (event, result) => {
    setNewItem({ ...newItem, [event.target.name]: result });
  };

  const onOpenImageDialog = (img, label, imageName) => {
    const findBase64 = responseSlugs.data.payload.items.filter((item) => {
      return item.slug === imageName;
    });
    const found = findBase64[0].base64;

    // If the image is a type of URL it means that user still did not upload new image,
    // but if it is not type of URL it means that user uploaded new image
    // Additionally, if this solution is not reliable, new flag state can be introduced for example
    // type boolean
    // const [newImageUploaded, setNewImageUploaded] = useState(false)
    // when user uploads a new image it can be set to true
    const checkImage = isUrlValid(img);

    if (checkImage) {
      setOpenImageDialog({
        show: true,
        image: found,
        label: label,
        name: imageName,
      });
    } else {
      setOpenImageDialog({
        show: true,
        image: img,
        label: label,
        name: imageName,
      });
    }
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog({ show: false, image: null, label: "", name: "" });
  };

  const handleBackToList = () => {
    navigate(`/B2B-settings`);
  };

  const handleSaveEditImage = (imageName, image) => {
    setNewItem({ ...newItem, [imageName]: image });
  };

  const handleDeleteImage = (imageName) => {
    setNewItem({ ...newItem, [imageName]: "DELETE" });
  };
  console.log(detailsList);
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
              isLoadingList={isLoadingList}
              isErrorList={isErrorList}
            />
          }
          main={
            <TwoColumnDetails
              className={styles.boxStyle}
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
                            // onImagePreview={formImagePreview}
                            onOpenImageDialog={onOpenImageDialog}
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
              // old form preview
              // right={<ImagePreview imagePreviewList={imagePreviewList} />}
              right={<div />}
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
      </Box>
      <ImageDialog
        title="Obrada slike"
        openImageDialog={openImageDialog}
        handleCloseImageDialog={handleCloseImageDialog}
        onImageUpload={formImageUpload}
        handleSaveEditImage={handleSaveEditImage}
        handleDeleteImage={handleDeleteImage}
      />
    </>
  );
};

export default DetailsForm;
