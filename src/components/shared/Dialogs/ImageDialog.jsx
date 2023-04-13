import React, { useState } from "react";

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

const ImageDialog = ({
  openImageDialog,
  title = "",
  onImageUpload = () => { },
  handleCloseImageDialog = () => { },
  handleSaveEditImage = () => { },
  handleDeleteImage = () => { },
}) => {
  const [editMode, setEditMode] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleCloseEditMode = () => {
    setEditMode(false);
  };

  const handleOpenEditMode = () => {
    setEditMode(true);
  };

  const onDeleteImageClick = () => {
    handleDeleteImage(openImageDialog.name);
    handleCloseImageDialog();
  };

  const handleImageUpload = (e) => {
    setLoadingImage(true);
    onImageUpload(e);
    const timeOutId = setTimeout(() => {
      setLoadingImage(false);
      handleCloseImageDialog();
    }, 1000);
    return () => clearTimeout(timeOutId);
  };

  return (
    <Dialog
      open={openImageDialog.show}
      fullScreen
      maxWidth={"xl"}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {editMode ? (
          <Box
            sx={{
              width: 900,
              height: 600,
            }}
          >
            <ImageEditorComponent
              handleCloseEditMode={handleCloseEditMode}
              handleCloseImageDialog={handleCloseImageDialog}
              imageURL={openImageDialog.image}
              imageName={openImageDialog.name}
              imageWidth={openImageDialog.width}
              imageHeight={openImageDialog.height}
              handleSaveEditImage={handleSaveEditImage}
              showDimensions={openImageDialog.showDimensions}
            />
          </Box>
        ) : (
          <Box>
            {loadingImage ? (
              <div>
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
                  {openImageDialog.image && (
                    <img
                      style={{
                        maxWidth: "100%",
                        maxHeight: "calc(100vh - 64px)",
                      }}
                      src={openImageDialog?.image}
                      alt={openImageDialog?.label}
                    />
                  )}
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
              onClick={onDeleteImageClick}
              startIcon={<DeleteOutlineOutlinedIcon />}
            >
              Obrisi
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseImageDialog}
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
