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
import ImageEditorComponent from "../../ImageEditorComponent/ImageEditorComponent";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from "./ImageDialogFullPage.module.scss";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ImageDialogFullPage = ({
  openFullPageDialog,
  setOpenFullPageDialog,
  title = "",
  setImageList,
  imageList = [],
  onImageUpload = () => { },
  handleCloseImageDialog = () => { },
  handleDeleteImage = () => { },
  uploadHandler = () => { },apiPathCrop
}) => {
  const [editMode, setEditMode] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [bttnText, setBttnText] = useState("Kopirajte link");

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
    // TODO DEMO
    // set Image to parent component for example B2Bsetings in state
    // just like for single image
    // with all the data that you need to save image
    // please keep in mind that this is an array of images

    let base64 = base64Image;
    const typeBase64 = base64.split(";")[0].split(":")[1];
    let y = base64[base64.length - 2] === "=" ? 2 : 1;
    const sizeBase64 = base64.length * (3 / 4) - y;
    let imageItem = {
      id: openFullPageDialog.id,
      position: openFullPageDialog.position,
      alt: openFullPageDialog.alt,
      size: sizeBase64,
      type: openFullPageDialog.type,
      path: openFullPageDialog.path,
      name: imageName,
      src: base64Image,
    };

    uploadHandler(imageItem, { crop: true });

    setOpenFullPageDialog({
      ...openFullPageDialog,
      image: base64Image,
    });

    const newState = imageList.map((img) => {
      if (img.id === imageItem.id) {
        return { ...imageItem };
      }
      return img;
    });
    handleCloseEditMode();
    // in this state is everything you need for POST API
    // but please keep in mind to use state from parent component
    setImageList(newState);
  };

  // const copyCode = () => {
  //   navigator.clipboard
  //     .writeText(openFullPageDialog?.path)
  //     .then(() => {
  //       setBttnText("Link je kopiran");
  //       setTimeout(() => {
  //         setBttnText("Kopirajte link");
  //       }, 3000);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  return (
    <Dialog open={openFullPageDialog.show} fullScreen aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {openFullPageDialog.name}
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
              imageURL={openFullPageDialog.image}
              imageName={openFullPageDialog.name}
              handleSaveEditImage={handleSaveEdited}
              apiPath={apiPathCrop}
            />
          </Box>
        ) : (
          <Box>
            {loadingImage ? (
              <div>
                <CircularProgress size={50} sx={{ ml: "45%", mt: "15%" }} disableShrink />
              </div>
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <div className={styles.imageStyle}>
                      {openFullPageDialog.image && (
                        <img
                          style={{
                            maxWidth: "90%",
                            maxHeight: "calc(90vh - 64px)",
                          }}
                          src={openFullPageDialog?.image}
                          alt={openFullPageDialog?.name}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <form className={styles.formFieldsStyle}>
                      <TextField fullWidth type="text" disabled label="Naziv slike" value={openFullPageDialog?.name} variant="outlined" />
                      <TextField fullWidth type="text" disabled label="Alt slike" value={openFullPageDialog?.alt} variant="outlined" />
                      <TextField fullWidth type="text" disabled label="Velicina slike" value={openFullPageDialog?.size} variant="outlined" />
                      <TextField fullWidth type="text" disabled label="Tip slike" value={openFullPageDialog?.type} variant="outlined" />
                      <TextField fullWidth type="text" disabled label="Link slike" value={openFullPageDialog?.path} variant="outlined" InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <CopyToClipboard
                                text={openFullPageDialog?.path}
                                onCopy={() => {
                                  setBttnText("Link je kopiran");
                                  setTimeout(() => {
                                    setBttnText("Kopirajte link");
                                  }, 3000);
                                }}
                              >
                                <Tooltip title={bttnText} placement="top" arrow>
                                  <ContentCopyIcon sx={{ color: "rgba(0, 0, 0, 0.38)" }} />
                                </Tooltip>
                              </CopyToClipboard>
                            </IconButton>
                          </InputAdornment>
                        )
                      }} />
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
          <Stack direction="row" alignItems="center" spacing={2} className={styles.btnGroup}>
            <Button variant="outlined" onClick={handleCloseImageDialog} color="success" startIcon={<CheckIcon />}>
              Sačuvaj
            </Button>
            {/* <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
              Nova slika
              <InputInput name="image" inputProps={{ accept: "image/*" }} id={openFullPageDialog.name} onChange={(e) => handleImageUpload(e)} type="file" sx={{ display: "none" }} />
            </Button> */}
            <Button variant="outlined" onClick={handleOpenEditMode} color="info" startIcon={<EditOutlinedIcon />}>
              Obradi sliku
            </Button>
            <Button variant="outlined" color="error" onClick={(e) => handleDeleteImage(e, openFullPageDialog.id)} startIcon={<DeleteOutlineOutlinedIcon />}>
              Obriši
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseImageDialog} startIcon={<CancelOutlinedIcon />}>
              Otkaži
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog >
  );
};

export default ImageDialogFullPage;
