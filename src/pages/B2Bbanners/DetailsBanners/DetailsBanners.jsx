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
import { getDetailsB2Bbanners } from "../services";

const DetailsBanners = ({}) => {
  const { B2BId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    isSuccess,
    data: response,
    isLoading,
    isError,
  } = useQuery(["B2BId", B2BId], () =>
    getDetailsB2Bbanners(user.access_token, B2BId)
  );

  const [newItem, setNewItem] = useState({});
  const [inputsError, setInputsError] = useState({});

  useEffect(() => {
    if (response) {
      setNewItem(response?.data?.payload);
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

  const formItemChangeHandler = ({ target }) => {
    setNewItem({ ...newItem, [target.name]: target.value });
  };

  const onSubmit = () => {
    const errors = {};
    Object.keys(newItem).forEach((prop_name) => {
      if (isEmpty(newItem[prop_name])) {
        if (prop_name === "name" || prop_name === "priority") {
          errors[prop_name] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
        }
      }
    });
    console.log(inputsError);
    isEmpty(errors) ? saveData() : setInputsError(errors);
  };

  const saveData = () => {
    console.log(newItem);
  };

  return (
    <>
      <DetailsBasic
        handleBackToList={handleBackToList}
        list={<div />}
        main={
          <TwoColumnDetails
            middle={
              <>
                {!false ? (
                  <Box component="form" autoComplete="off">
                    {fields &&
                      fields
                        .filter(({ in_details }) => in_details)
                        .map((item, index) => (
                          <CreateForm
                            data-test-id="B2B-banners-form"
                            onChangeHandler={formItemChangeHandler}
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
            right={<div />}
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
