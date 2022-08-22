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
import ImageDialogFullPage from "../../components/shared/Dialogs/ImageDialogFullPage";

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
  // TODO DEMO handle drag state
  const [dragActive, setDragActive] = useState(false);
  // handle open full page modal
  const init = {
    show: false,
    image: "",
    alt: "",
    name: "",
    size: "",
    type: "",
  };
  const [openFullPageialog, setOpenFullPageialog] = useState(init);

  const handleMultipleImageUpload = useCallback(
    (event) => {
      event.preventDefault();
      const newImagesArray = [];

      if (event.target.files && event.target.files[0]) {
        const selectedFiles = event.target.files;

        // TODO redundant move to helper
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

  // TODO DEMO handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // TODO DEMO triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFiles = e.dataTransfer.files;

      const newImagesArray = [];
      // TODO redundant move to helper
      for (let i = 0; i < selectedFiles.length; i++) {
        var file = selectedFiles[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          newImagesArray.push({
            id: i + 1,
            name: selectedFiles[i].name,
            position: i,
            alt: selectedFiles[i].name,
            size: selectedFiles[i].size,
            type: selectedFiles[i].type,
            src: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }

      setImageList(newImagesArray);
    }
  };

  const handleModalOpen = (e, src, alt, name, size, type, id) => {
    setOpenFullPageialog({
      show: true,
      id: id,
      image: src,
      alt: alt,
      name: name,
      size: size,
      type: type,
    });
  };

  const handleCloseImageDialog = () => {
    setOpenFullPageialog(init);
  };

  const formImageUpload = useCallback(
    (event) => {
      event.preventDefault();
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const timeOutId = setTimeout(() => {
          imageSetter(event, reader.result, selectedFile);
        }, 800);
        return () => clearTimeout(timeOutId);
      };
      reader.readAsDataURL(selectedFile);
    },
    [openFullPageialog]
  );

  const imageSetter = (event, result, selectedFile) => {
    setOpenFullPageialog({
      ...openFullPageialog,
      show: true,
      image: result,
      name: selectedFile.name,
      alt: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
    });
  };

  const handleDeleteImage = (e, deleteImgId) => {
    console.log(
      "Prikazi modal da li je siguran da zeli da obrise ili ne i ovo neka bude callback."
    );
    setOpenFullPageialog({
      ...openFullPageialog,
      image: "DELETE",
    });

    let imageItem = {
      id: null,
      position: null,
      alt: null,
      size: null,
      type: null,
      name: null,
      src: "DELETE",
    };

    const newState = imageList.map((img) => {
      if (img.id === deleteImgId) {
        return { ...imageItem };
      }
      return img;
    });
    setImageList(newState);
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
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            dragActive={dragActive}
          />

          <ImageListRow
            setImageList={setImageList}
            imageList={imageList}
            handleModalOpen={handleModalOpen}
            handleDeleteImage={handleDeleteImage}
          />
          <ImageDialogFullPage
            openFullPageialog={openFullPageialog}
            setOpenFullPageialog={setOpenFullPageialog}
            setImageList={setImageList}
            imageList={imageList}
            handleCloseImageDialog={handleCloseImageDialog}
            onImageUpload={formImageUpload}
            handleDeleteImage={handleDeleteImage}
          />
        </Grid>
      </Paper>
    </>
  );
};

export default B2Bsettings;
