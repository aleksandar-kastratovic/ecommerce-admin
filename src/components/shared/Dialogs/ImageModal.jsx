import React, { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import styles from "./ImageModal.module.scss";

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

function ChildModal({ handleCancel }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Otkaži</Button>
          <Button onClick={handleClose}>Sačuvaj</Button>
        </Box>
      </Modal>
    </>
  );
}

export default function ImageModal({
  openImageModal,
  title = "",
  handleCancel = () => {},
}) {
  const [open, setOpen] = useState(false);
  const [editMode, seteditMode] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleEditMode = () => {
    seteditMode(true);
  };

  return (
    <>
      <Modal
        data-test-id="main-image-dialog"
        open={openImageModal.show}
        onClose={handleCancel}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={styles.modalStyle}>
          <h2 id="parent-modal-title">{title}</h2>
          <p id="parent-modal-description">
            Naziv slike:{" "}
            <span className={styles.labelStyle}>{openImageModal?.label}</span>
          </p>
          <div className={styles.imageStyle}>
            <img src={openImageModal?.image} alt={openImageModal?.label} />
          </div>
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
              onClick={handleOpen}
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
          <ChildModal handleCancel={handleCancel} />
        </Box>
      </Modal>
    </>
  );
}
