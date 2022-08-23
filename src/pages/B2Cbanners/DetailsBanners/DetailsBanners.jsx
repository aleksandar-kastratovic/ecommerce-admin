import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

// material-ui components
import Box from "@mui/material/Box";
import CreateForm from "../../../components/shared/Form/CreateForm";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

// components
import DetailsBasic from "../../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";

// config
import TwoColumnDetails from "../../../components/shared/Layout/Details/TwoColumnDetails/TwoColumnDetails";
import fields from "./fieldsDetails.json";

// other
import { isEmpty } from "lodash";
import AuthContext from "../../../store/auth-contex";
import { useQuery } from "react-query";
import { getDetailsB2Bbanners, createBanner } from "../services";
import ImagePreview from "../../../components/shared/ImagePreview/ImagePreview";

const DetailsBanners = ({}) => {
  const { B2BId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [imagePreviewList, setImagePreviewList] = useState([]);

  const init = {
    active_from: null,
    active_to: null,
    button: "",
    download: null,
    duration: 0,
    image: null,
    is_active: true,
    name: "",
    position: "primary",
    priority: 76,
    subtitle: "",
    target: "blank",
    text: "",
    title: "AI",
    url: null,
    video: null,
  };

  const {
    isSuccess,
    data: response,
    isLoading,
    isError,
  } = useQuery(["B2BId", B2BId], () =>
    getDetailsB2Bbanners(user.access_token, B2BId)
  );

  const [newItem, setNewItem] = useState(B2BId === "new" ? init : {});
  const [inputsError, setInputsError] = useState({});

  useEffect(() => {
    if (response) {
      const resp = response?.data?.payload;
      const repack = {
        ...resp,
        is_active: resp.is_active === 1 ? true : false,
      };
      setNewItem(repack);
    }
  }, [response]);

  useEffect(() => {
    const errors = { ...inputsError };
    Object.keys(errors).forEach((prop_name) => {
      if (!isEmpty(newItem[prop_name])) {
        delete errors[prop_name];
      }
    });
    setInputsError(errors);
  }, [newItem]);

  useEffect(() => {
    const errors = { ...inputsError };
    Object.keys(errors).forEach((prop_name) => {
      if (!isEmpty(newItem[prop_name])) {
        delete errors[prop_name];
      }
    });
    setInputsError(errors);
  }, [newItem]);

  const handleBackToList = () => {
    navigate(`/B2B-banners`);
  };

  const formItemChangeHandler = ({ target }, type) => {
    if (type) {
      setNewItem({ ...newItem, [target.name]: target.checked });
    } else {
      setNewItem({ ...newItem, [target.name]: target.value });
    }
  };

  const onSubmit = () => {
    const errors = {};
    Object.keys(newItem).forEach((prop_name) => {
      if (isEmpty(newItem[prop_name])) {
        if (prop_name === "name") {
          errors[prop_name] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
        }
      }
    });
    isEmpty(errors) ? saveData() : setInputsError(errors);
  };

  const saveData = () => {
    // TODO image and rest of base 64 repack if it is not a type URL
    const repackToSend = {
      ...newItem,
      priority: parseInt(newItem.priority),
    };
    try {
      createBanner(user.access_token, repackToSend);
      handleBackToList();
    } catch (error) {
      console.warn(error);
    }
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

  return (
    <>
      <DetailsBasic
        handleBackToList={handleBackToList}
        list={<div />}
        main={
          <TwoColumnDetails
            middle={
              <>
                {!isLoading ? (
                  <Box component="form" autoComplete="off">
                    {fields &&
                      fields
                        .filter(({ in_details }) => in_details)
                        .map((item, index) => (
                          <CreateForm
                            data-test-id="B2B-banners-form"
                            onChangeHandler={formItemChangeHandler}
                            onImageUpload={formImageUpload}
                            onImagePreview={formImagePreview}
                            item={item}
                            key={index}
                            error={inputsError[item.prop_name]}
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
      {false && (
        <Stack sx={{ width: "100%" }}>
          <Alert severity="error">
            Doslo je do greske. Molim Vas pokusajte kasnije.
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default DetailsBanners;
