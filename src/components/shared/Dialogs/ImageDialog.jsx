import React, { useState, useEffect, useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ImageEditorComponent from "../ImageEditorComponent/ImageEditorComponent";

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
  handleConfirm = () => {},
  handleCancel = () => {},
}) => {
  const [editMode, setEditMode] = useState(false);

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

  return (
    <Dialog
      open={openImageDialog.show}
      maxWidth={"xl"}
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
            Naziv slike:{" "}
            <span className={styles.labelStyle}>{openImageDialog?.label}</span>
            <div className={styles.imageStyle}>
              <img src={openImageDialog?.image} alt={openImageDialog?.label} />
            </div>
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
              component="label"
              startIcon={<PhotoCamera />}
            >
              Nova slika
              <input hidden accept="image/*" type="file" />
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
