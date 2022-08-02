import React, { useState, useEffect, useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ImageEditorComponent from "../ImageEditorComponent/ImageEditorComponent";
import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./ImageDialog.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ImageDialog = ({
  openImageDialog,
  title = "",
  description = "",
  confirmIcon = "delete",
  cancelIcon = "cancel",
  onImageUpload = () => {},
  handleCancel = () => {},
}) => {
  const [editMode, setEditMode] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const wrapperRefPopup = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (wrapperRefPopup.current) {
      setWidth(wrapperRefPopup.current.clientWidth);
      setHeight(wrapperRefPopup.current.clientHeight);
    }
  }, [editMode]);

  const handleCloseEditMode = () => {
    setEditMode(false);
  };

  const handleOpenEditMode = () => {
    setEditMode(true);
  };

  const handleImageUpload = (e) => {
    setLoadingImage(true);
    onImageUpload(e);
    const timeOutId = setTimeout(() => {
      setLoadingImage(false);
      handleCancel();
    }, 1000);
    return () => clearTimeout(timeOutId);
  };

  // const stylesClasses = {
  //   dialogPaper: {
  //     minHeight: "80vh",
  //     maxHeight: "80vh",
  //     height: "90vh",
  //   },
  // };

  return (
    <Dialog
      // classes={{ paper: stylesClasses.dialogPaper }}
      open={openImageDialog.show}
      maxWidth={"xl"}
      fullWidth
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent ref={wrapperRefPopup}>
        {editMode ? (
          <Box>
            <ImageEditorComponent
              handleCloseEditMode={handleCloseEditMode}
              imageURL={openImageDialog?.image}
              width={width}
              height={height}
            />
          </Box>
        ) : (
          <Box>
            {loadingImage ? (
              <div
              // style={{
              //   maxWidth: "100%",
              //   maxHeight: "calc(100vh - 64px)",
              //   height: "calc(30vh - 64px)",
              // }}
              >
                <CircularProgress
                  size="4rem"
                  sx={{ ml: "45%" }}
                  disableShrink
                />
              </div>
            ) : (
              <div>
                Naziv slike:{" "}
                <span className={styles.labelStyle}>
                  {openImageDialog?.label}
                </span>
                <div className={styles.imageStyle}>
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "calc(100vh - 64px)",
                    }}
                    src={openImageDialog?.image}
                    alt={openImageDialog?.label}
                  />
                </div>
              </div>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {editMode ? (
          <div />
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            className={styles.btnGroup}
          >
            {/* <input hidden accept="image/*" type="file" onImageUpload /> */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Nova slika
              <Input
                multiple
                name={openImageDialog.name}
                accept="image/*"
                id={openImageDialog.label}
                onChange={(e) => handleImageUpload(e)}
                type="file"
                sx={{ display: "none" }}
              />
            </Button>
            <Button
              variant="outlined"
              onClick={handleOpenEditMode}
              color="success"
              startIcon={<EditOutlinedIcon />}
            >
              Obradi sliku
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              startIcon={<DeleteOutlineOutlinedIcon />}
            >
              Obrisi
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              startIcon={<CancelOutlinedIcon />}
            >
              Otkaži
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ImageDialog;
