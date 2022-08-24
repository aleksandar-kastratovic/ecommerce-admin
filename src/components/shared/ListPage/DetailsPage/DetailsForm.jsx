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

const DetailsForm = ({
  backPath = "",
  detailsList = "",
  handleSelectInDetails = () => {},
  isLoadingList = false,
  isErrorList = false,
  loadingForm = false,
  changeFields = () => {},
  saveData = () => {},
  requiredFields = [],
  defaultSelected = "",
  isError = false,
  onOpenImageDialog = () => {},
  dataTestId = "",
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [moduleId, setModuleId] = useState();
  const [openImageDialog, setOpenImageDialog] = useState({
    show: false,
    image: null,
    label: "",
    name: "",
  });

  const [newItem, setNewItem] = useState({});

  const [inputsError, setInputsError] = useState({});
  const [selected, setSelected] = useState(defaultSelected);

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
        if (requiredFields.includes(propName)) {
          errors[propName] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
        }
      }
    });
    isEmpty(errors) ? saveData() : setInputsError(errors);
  };

  useEffect(() => {
    changeFields(selected);
  }, [selected]);

  const formItemChangeHandler = ({ target }) => {
    setNewItem({ ...newItem, [target.name]: target.value });
  };

  const handleSelectInDetails = (module, slug) => {
    setSelected(slug);
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

  const handleCloseImageDialog = () => {
    setOpenImageDialog({ show: false, image: null, label: "", name: "" });
  };

  const handleBackToList = () => {
    navigate({ backPath });
  };

  const handleSaveEditImage = (imageName, image) => {
    setNewItem({ ...newItem, [imageName]: image });
  };

  const handleDeleteImage = (imageName) => {
    setNewItem({ ...newItem, [imageName]: "DELETE" });
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
              isLoadingList={isLoadingList}
              isErrorList={isErrorList}
            />
          }
          main={
            <TwoColumnDetails
              className={styles.boxStyle}
              middle={
                <>
                  {!loadingForm ? (
                    <Box component="form" autoComplete="off">
                      {fields &&
                        fields.map((item, index) => (
                          <CreateForm
                            data-test-id={dataTestId}
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
        {isError && (
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
