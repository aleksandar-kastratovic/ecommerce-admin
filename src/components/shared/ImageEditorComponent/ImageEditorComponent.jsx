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
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
import Slider from "@mui/material/Slider";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import Skeleton from "@mui/material/Skeleton";

import styles from "./ImageEditorComponent.module.scss";
import { Input } from "@mui/material";

// https://www.npmjs.com/package/react-avatar-editor

const ImageEditorComponent = ({
  handleCloseEditMode,
  handleCancel,
  imageURL,
  base64,
  width,
  height,
  handleSaveEditImage,
  imageName,
}) => {
  const editor = useRef(null);
  const [imgState, setImgState] = useState({
    url: imageURL,
    rotate: 0,
    scale: 0,
    borderRadius: 0,
    width: 600,
    height: 300,
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

  const handleSave = () => {
    if (editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editor.current.getImage();
      const base64Image = canvas.toDataURL("image/jpeg");
      console.log(base64Image);
      handleSaveEditImage(imageName, base64Image);
      handleCloseEditMode();
      handleCancel();

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = editor.current.getImageScaledToCanvas();
    }
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

  const handleBorderRadius = (event, newValue) => {
    // const scale = parseFloat(e.target.value);
    setImgState({
      ...imgState,
      borderRadius: newValue,
    });
  };

  const handleImageWidthHeight = (event) => {
    setImgState({
      ...imgState,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  return (
    <>
      {loadingImage ? (
        <>
          <AvatarEditor
            ref={editor}
            image={`data:image/jpg;base64,${base64}`}
            width={imgState.width}
            height={imgState.height}
            border={100}
            backgroundColor="#ecf0fa"
            borderRadius={imgState.borderRadius}
            rotate={imgState.rotate}
            scale={imgState.scale}
            disableHiDPIScaling
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            className={styles.btnGroup}
          >
            <TextField
              id="width"
              name="width"
              type="number"
              label="width"
              variant="standard"
              value={imgState.width}
              onChange={handleImageWidthHeight}
            />
            <TextField
              id="height"
              name="height"
              type="number"
              label="height"
              variant="standard"
              value={imgState.height}
              onChange={handleImageWidthHeight}
            />
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
              max={3}
              step={1}
              marks
            />
            <Slider
              aria-label="borderRadius"
              value={
                typeof imgState.borderRadius === "number"
                  ? imgState.borderRadius
                  : 0
              }
              onChange={handleBorderRadius}
              size="small"
              min={1}
              max={200}
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
              onClick={handleSave}
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
