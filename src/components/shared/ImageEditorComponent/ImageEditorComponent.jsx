import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./ImageEditorComponent.module.scss";

import Cropper from "react-easy-crop";
import getCroppedImg from "../../../helpers/cropImage";
import { createImage } from "../../../helpers/cropImage";

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
  // Apsoultno isti kod kao u vec postojecem crop editoru na products details ili category details
  // jedina razlika je sto tamo stize base64 odnosno radi se upload slike a ovde stize URL
  // svaki pokusaj pretvaranja tog url u base64 ili bilo kakvu manipulaciju puca i ne radi
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    if (imageURL) {
      // postoji vec funkcija za pretvaranje url slike u sliku sa cors flagom
      // slicne funkcije sam pravio ali poenta je ista
      // const createImageFromUrl = async () => {
      //   await createImage(imageURL);
      // };
      // console.log(createImageFromUrl());

      // isto ne radi
      // setCroppedImage(`${imageURL}?time=20220807125138-123546a`);
      setCroppedImage(imageURL);
    }
  }, [imageURL]);

  const imageCroped = (img, imgFile, flag) => {
    console.log(img, imgFile, flag);

    // Pretvaranje slike u kanvas pa u base64 i cuvanje editovane slike
    // const canvas = editor.current.getImage();
    // const base64Image = canvas.toDataURL("image/jpeg");
    // console.log(base64Image);
    // handleSaveEditImage(imageName, base64Image);
    // handleCloseEditMode();
    // handleCancel();
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(croppedImage, croppedAreaPixels);
      imageCroped({
        img: URL.createObjectURL(croppedImg),
        imgFile: croppedImg,
        flag: imgForCrooping.flag,
      });
    } catch (e) {
      console.error(e);
    }

    setCroppedImage(null);
    setCroppedAreaPixels(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    // handleClose();
  }, [croppedAreaPixels]);

  // const handleSave = () => {
  //   if (editor) {
  //     // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
  //     // drawn on another canvas, or added to the DOM.
  //     const canvas = editor.current.getImage();
  //     const base64Image = canvas.toDataURL("image/jpeg");
  //     console.log(base64Image);
  //     handleSaveEditImage(imageName, base64Image);
  //     handleCloseEditMode();
  //     handleCancel();

  //     // If you want the image resized to the canvas size (also a HTMLCanvasElement)
  //     const canvasScaled = editor.current.getImageScaledToCanvas();
  //   }
  // };

  return (
    <>
      <div className={styles.cropContainer}>
        <Cropper
          image={croppedImage}
          crop={crop}
          minZoom={0.1}
          maxZoom={3}
          zoomSpeed={0.1}
          restrictPosition={false}
          objectFit="contain"
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <Stack
        direction="row"
        alignItems="right"
        spacing={2}
        className={styles.btnGroup}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={showCroppedImage}
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
  );
};

export default ImageEditorComponent;
