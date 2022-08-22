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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";

import styles from "./ImageDialogFullPage.module.scss";

const ImageDialogFullPage = ({
  openFullPageialog,
  setOpenFullPageialog,
  title = "",
  setImageList,
  imageList = [],
  onImageUpload = () => {},
  handleCloseImageDialog = () => {},
  handleDeleteImage = () => {},
}) => {
  const [editMode, setEditMode] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

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
    }, 1000);
    return () => clearTimeout(timeOutId);
  };

  const handleSaveEdited = (imageName, base64Image) => {
    // set Image to parent component for example B2Bsetings in state
    // just like for single image
    // with all the data that you need to save image
    // please keep in mind that this is an array of images

    let imageItem = {
      id: openFullPageialog.id,
      position: openFullPageialog.position,
      alt: openFullPageialog.alt,
      size: openFullPageialog.size,
      type: openFullPageialog.type,
      name: imageName,
      src: base64Image,
    };

    setOpenFullPageialog({
      ...openFullPageialog,
      image: base64Image,
    });

    const newState = imageList.map((img) => {
      if (img.id === imageItem.id) {
        return { ...imageItem };
      }
      return img;
    });

    // in this state is everything you need for POST API
    // but please keep in mind to use state from parent component
    setImageList(newState);
  };

  return (
    <Dialog
      open={openFullPageialog.show}
      fullScreen
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {openFullPageialog.name}
          </Typography>
        </Toolbar>
      </AppBar>
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
              imageURL={openFullPageialog.image}
              imageName={openFullPageialog.name}
              handleSaveEditImage={handleSaveEdited}
            />
          </Box>
        ) : (
          <Box>
            {loadingImage ? (
              <div>
                <CircularProgress
                  size="6rem"
                  sx={{ ml: "45%", mt: "15%" }}
                  disableShrink
                />
              </div>
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <div className={styles.imageStyle}>
                      {openFullPageialog.image && (
                        <img
                          style={{
                            maxWidth: "90%",
                            maxHeight: "calc(90vh - 64px)",
                          }}
                          src={openFullPageialog?.image}
                          alt={openFullPageialog?.name}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <form className={styles.formFieldsStyle}>
                      <TextField
                        fullWidth
                        type="text"
                        disabled
                        label="Naziv slike"
                        value={openFullPageialog?.name}
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        type="text"
                        disabled
                        label="Alt slike"
                        value={openFullPageialog?.alt}
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        type="text"
                        disabled
                        label="Velicina slike"
                        value={openFullPageialog?.size}
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        type="text"
                        disabled
                        label="Tip slike"
                        value={openFullPageialog?.type}
                        variant="outlined"
                      />
                    </form>
                  </Grid>
                </Grid>
              </Box>
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
            <Button
              variant="outlined"
              onClick={handleCloseImageDialog}
              color="success"
              startIcon={<CheckIcon />}
            >
              Sačuvaj
            </Button>
            {/* <input hidden accept="image/*" type="file" onImageUpload /> */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Nova slika
              <Input
                name="image"
                accept="image/*"
                id={openFullPageialog.name}
                onChange={(e) => handleImageUpload(e)}
                type="file"
                sx={{ display: "none" }}
              />
            </Button>
            <Button
              variant="outlined"
              onClick={handleOpenEditMode}
              color="info"
              startIcon={<EditOutlinedIcon />}
            >
              Obradi sliku
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => handleDeleteImage(e, openFullPageialog.id)}
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

export default ImageDialogFullPage;
