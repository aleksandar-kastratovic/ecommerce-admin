import React, { useEffect, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import ListTable from "../../components/shared/ListTable/ListTable";

import styles from "./B2Bsettings.module.scss";
import { flatten } from "lodash";
import fields from "./mainListFields.json";

import mockData from "./mockData.json";
import ListTableTitle from "../../components/shared/ListTable/ListTableTitle";
import ListTableToolbar from "../../components/shared/ListTable/ListTableToolbar";

import { getListB2Bconfig } from "./services";

import { useQuery } from "react-query";

import AuthContext from "../../store/auth-contex";

const B2Bsettings = ({}) => {
  const { user } = useContext(AuthContext);

  // const { isLoading, isError, data, error } = useQuery(
  //   getListB2Bconfig(user.access_token)
  // );

  const [listData, setListData] = useState();

  const {
    isSuccess,
    data: response,
    isLoading,
    isError,
  } = useQuery(["getListB2Bconfig"], () => getListB2Bconfig(user.access_token));

  const navigate = useNavigate();
  // Main component with all frontend logic
  // Please use destructuring
  // Since on a project is not used strong type(for example typescript or even proptypes - deprecated)
  // it is recommended for all properties to give an initial value
  // In that way if you don't receive value app will not break and all developers will know what type to expect number, string or object, arr etc.

  console.log("isSuccess, isLoading, isError", isSuccess, isLoading, isError);

  useEffect(() => {
    if (response) {
      setListData(response?.data?.payload);
    }
  }, [response]);

  const handleCreateNew = (e) => {
    // TODO handle create new
    console.log(e);
  };

  const handleEditClick = (module) => () => {
    navigate(`/B2B-settings/${module}`);
  };

  return (
    <>
      <Paper elevation={0} className={styles.paperStyle}>
        <ListTableTitle
          title="B2B eCommerce podesavanje modula"
          showButton={false}
          handleCreateNew={handleCreateNew}
        />

        <ListTableToolbar showToolbar={false} />

        <ListTable
          fields={flatten(fields).filter(({ in_main_table }) => in_main_table)}
          listData={listData}
          handleEditClick={handleEditClick}
        />
      </Paper>
    </>
  );
};

export default B2Bsettings;
