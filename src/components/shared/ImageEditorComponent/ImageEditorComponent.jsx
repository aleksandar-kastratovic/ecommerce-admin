import React, { useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
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
import Slider from "@mui/material/Slider";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import Skeleton from "@mui/material/Skeleton";

import styles from "./ImageEditorComponent.module.scss";

// https://www.npmjs.com/package/react-avatar-editor

const ImageEditorComponent = ({
  handleCloseEditMode,
  imageURL,
  width,
  height,
}) => {
  const editor = useRef(null);
  const [imgState, setImgState] = useState({
    url: imageURL,
    rotate: 0,
    scale: 0,
  });
  const [loadingImage, setLoadingImage] = useState(false);

  const handleImageUpload = (e) => {
    setImgState({
      url: imageURL,
      rotate: parseFloat(0),
      scale: parseFloat(0),
    });
    const timeOutId = setTimeout(() => {
      setLoadingImage(true);
      setImgState({
        ...imgState,
        scale: imgState.scale + parseFloat(1),
      });
    }, 1000);
    return () => clearTimeout(timeOutId);
  };

  useEffect(() => {
    handleImageUpload();
  }, []);

  const handleChange = () => {
    if (editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editor.current.getImage();
      console.log(canvas);

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = editor.current.getImageScaledToCanvas();
    }
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setImgState({
      ...imgState,
      scale: scale,
    });
  };

  const rotateLeft = (e) => {
    e.preventDefault();
    setImgState({
      ...imgState,
      rotate: imgState.rotate - 90,
    });
  };

  const rotateRight = (e) => {
    e.preventDefault();
    setImgState({
      rotate: imgState.rotate + 90,
    });
  };

  const handleChangeZoom = (event, newValue) => {
    // const scale = parseFloat(e.target.value);
    setImgState({
      ...imgState,
      scale: newValue,
    });
  };

  return (
    <>
      {loadingImage ? (
        <>
          <AvatarEditor
            ref={editor}
            image={imageURL}
            width={250}
            height={250}
            border={50}
            rotate={imgState.rotate}
            scale={imgState.scale}
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            className={styles.btnGroup}
          >
            <IconButton
              color="primary"
              aria-label="rotete left"
              onClick={rotateLeft}
            >
              <RotateLeftIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="rotete right"
              onClick={rotateRight}
            >
              <RotateRightIcon />
            </IconButton>
            <Slider
              aria-label="Zoom"
              value={typeof imgState.scale === "number" ? imgState.scale : 0}
              onChange={handleChangeZoom}
              size="small"
              min={1}
              max={5}
              step={1}
              marks
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            className={styles.btnGroup}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleChange}
              startIcon={<CheckIcon />}
            >
              Sačuvaj
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseEditMode}
              startIcon={<CancelOutlinedIcon />}
            >
              Otkaži
            </Button>
          </Stack>
        </>
      ) : (
        <Stack spacing={1}>
          Slika se priprema...
          <Skeleton
            variant="rectangular"
            height={height}
            width={width}
            animation="wave"
          />
        </Stack>
      )}
    </>
  );
};

export default ImageEditorComponent;
