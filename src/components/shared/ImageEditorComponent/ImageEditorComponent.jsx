import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

import styles from "./ImageEditorComponent.module.scss";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./util";

const ImageEditorComponent = ({
    handleCloseEditMode = () => {},
    handleCloseImageDialog = () => {},
    imageURL,
    imageWidth = 800,
    imageHeight = 600,
    handleSaveEditImage,
    imageName,
    showDimensions = true,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [cropSize, setCropSize] = useState({
        width: imageWidth,
        height: imageHeight,
    });
    const [roundCrop, setRoundCrop] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    useEffect(() => {
        if (imageURL) {
            setCroppedImage(imageURL);
        }
    }, [imageURL]);

    const handleSave = (base64Image) => {
        handleSaveEditImage(imageName, base64Image);
        handleCloseEditMode();
        handleCloseImageDialog();
    };

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImg = await getCroppedImg(croppedImage, croppedAreaPixels, rotation, { width: cropSize.width, height: cropSize.height });
            handleSave(croppedImg);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels]);

    return (
        <>
            <div className={styles.cropContainer}>
                <Cropper
                    image={croppedImage}
                    crop={crop}
                    restrictPosition={false}
                    cropShape={roundCrop ? "round" : "rect"}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    zoom={zoom}
                    zoomSpeed={0.1}
                    minZoom={0.5}
                    maxZoom={5}
                    rotation={rotation}
                    onRotationChange={setRotation}
                    aspect={cropSize.width / cropSize.height}
                    zoomWithScroll
                />
            </div>

            <Grid container spacing={1} className={styles.btnGroup}>
                <Grid item xs={4}>
                    <Box width={200}>
                        <Typography id="zoom-slider" gutterBottom>
                            Uvećaj
                        </Typography>
                        <Slider aria-labelledby="zoom-slider" value={typeof rotation === "number" ? zoom : 0} onChange={(e, zoom) => setZoom(zoom)} min={0.5} max={5} step={0.1} marks />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box width={200}>
                        <Typography id="rotation-slider" gutterBottom>
                            Rotiraj
                        </Typography>
                        <Slider
                            aria-labelledby="rotation-slider"
                            min={-180}
                            max={180}
                            step={10}
                            value={typeof rotation === "number" ? rotation : 0}
                            onChange={(e, rotation) => setRotation(rotation)}
                        />
                    </Box>
                </Grid>

                {showDimensions && (
                    <Grid item xs={8}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box width={150}>
                                <Typography id="width-slider" gutterBottom>
                                    Širina oblasti
                                </Typography>
                                <Slider
                                    aria-labelledby="width-slider"
                                    min={50}
                                    max={900}
                                    step={10}
                                    value={typeof cropSize.width === "number" ? cropSize.width : 0}
                                    onChange={(e, width) =>
                                        setCropSize({
                                            ...cropSize,
                                            width: width,
                                        })
                                    }
                                />
                            </Box>
                            <Box width={150}>
                                <Typography id="height-slider" gutterBottom>
                                    Visina oblasti
                                </Typography>
                                <Slider
                                    aria-labelledby="height-slider"
                                    min={50}
                                    max={400}
                                    step={10}
                                    value={typeof cropSize.height === "number" ? cropSize.height : 0}
                                    onChange={(e, height) =>
                                        setCropSize({
                                            ...cropSize,
                                            height: height,
                                        })
                                    }
                                />
                            </Box>
                            <FormControlLabel
                                control={<Switch checked={roundCrop} onChange={(event) => setRoundCrop(event.target.checked)} inputProps={{ "aria-label": "controlled" }} />}
                                label="Okrugla oblast"
                            />
                        </Stack>
                    </Grid>
                )}
                <Grid item xs={4}>
                    <Stack
                        direction="row"
                        alignItems="right"
                        spacing={2}
                        // className={styles.btnGroup}
                    >
                        <Button variant="outlined" color="primary" onClick={showCroppedImage} startIcon={<CheckIcon />}>
                            Sačuvaj
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCloseEditMode} startIcon={<CancelOutlinedIcon />}>
                            Otkaži
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default ImageEditorComponent;
