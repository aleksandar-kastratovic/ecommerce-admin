import React, { useEffect, useContext, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import styles from "./B2Bsettings.module.scss";
import { flatten } from "lodash";
import fields from "./mainListFields.json";

import ListTable from "../../components/shared/ListTable/ListTable";
import ListTableTitle from "../../components/shared/ListTable/ListTableTitle";
import ListTableToolbar from "../../components/shared/ListTable/ListTableToolbar";

import { useQuery } from "react-query";
import AuthContext from "../../store/auth-contex";
import { getListB2Bconfig } from "./services";
import ImageMultipleDnD from "../../components/shared/ImageMultipleDnD/ImageMultipleDnD";
import ImageListRow from "../../components/shared/ImageListRow/ImageListRow";

const B2Bsettings = ({}) => {
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    if (response) {
      setListData(response?.data?.payload);
    }
  }, [response]);

  const handleCreateNew = (e) => {
    // TODO handle create new
    console.log(e);
  };

  const handleActions = (module) => () => {
    navigate(`/B2B-settings/${module}`);
  };

  // TODO DEMO Start Multiple images drag and drop

  const [imageList, setImageList] = useState();

  const handleMultipleImageUpload = useCallback(
    (event) => {
      event.preventDefault();
      const selectedFiles = event.target.files;

      const newImagesArray = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        var file = selectedFiles[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          newImagesArray.push({
            id: i + 1,
            name: selectedFiles[i].name,
            position: i + 1,
            alt: selectedFiles[i].name,
            size: selectedFiles[i].size,
            type: selectedFiles[i].type,
            src: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }

      setImageList(newImagesArray);
    },
    [imageList]
  );

  useEffect(() => {
    let storedImages = JSON.parse(sessionStorage.getItem("storageImages"));
    if (storedImages) {
      setImageList(storedImages);
    }
  }, []);

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
          handleActions={handleActions}
        />

        <Grid
          container
          spacing={1}
          direction="row"
          sx={{ mt: "2rem", ml: "1rem" }}
        >
          <ImageMultipleDnD
            handleMultipleImageUpload={handleMultipleImageUpload}
          />
          <ImageListRow setImageList={setImageList} imageList={imageList} />
        </Grid>
      </Paper>
    </>
  );
};

export default B2Bsettings;
