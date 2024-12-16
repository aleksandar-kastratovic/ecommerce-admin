import React, { useState, useEffect, useCallback, useContext } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import styles from "./ImageEditorComponent.module.scss";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./util";
import { InputNumber } from "../Form/FormInputs/FormInputs";
import AuthContext from "../../../store/auth-contex";
import { triggerComponentRerender } from "../../../store/reloads/reloadsReducer";
import { useDispatch } from "react-redux";

const ImageEditorComponent = ({
    handleCloseEditMode = () => {},
    handleCloseImageDialog = () => {},
    imageURL,
    imageWidth = 800,
    imageHeight = 600,
    handleSaveEditImage,
    imageName,
    showDimensions = true,
    apiPath = `admin/product-items/gallery/options/crop`,
}) => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const dispatch = useDispatch();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [cropSize, setCropSize] = useState({
        width: typeof imageWidth !== "number" ? (imageWidth = 800) : imageWidth,
        height: typeof imageHeight !== "number" ? (imageHeight = 600) : imageHeight,
    });

    const [infoCrop, setInfoCrop] = useState([]);

    const handleDataDimension = () => {
        api.get(apiPath)
            .then((response) => {
                const dimensionsFromApi = response?.payload;
                setInfoCrop(dimensionsFromApi);
                if (Object.keys(dimensionsFromApi).length > 0 && dimensionsFromApi.width > 0 && dimensionsFromApi.height > 0) {
                    setCropSize(dimensionsFromApi);
                }
            })
            .catch((error) => console.warn(error));
    };

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
        setTimeout(() => {
            dispatch(triggerComponentRerender("ListVariantsModalId"));
        }, 3000);
    };

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImg = await getCroppedImg(croppedImage, croppedAreaPixels, rotation, { width: cropSize.width, height: cropSize.height });

            handleSave(croppedImg);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels]);

    useEffect(() => {
        handleDataDimension();
    }, []);

    return (
        <>
            <div className={styles.cropContainer}>
                <Cropper
                    image={croppedImage}
                    crop={crop}
                    restrictPosition={false}
                    cropShape={"rect"}
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
                <Grid item xs={12} sx={{ display: "flex" }}>
                    <Box width={200} sx={{ marginRight: "2rem" }}>
                        <Typography id="zoom-slider" sx={{ lineHeight: "normal" }}>
                            Uvećaj
                        </Typography>
                        <Slider aria-labelledby="zoom-slider" value={typeof rotation === "number" ? zoom : 0} onChange={(e, zoom) => setZoom(zoom)} min={0.5} max={5} step={0.1} marks />
                    </Box>

                    <Box width={200}>
                        <Typography id="rotation-slider" sx={{ lineHeight: "normal" }}>
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
                                <InputNumber
                                    label="Širina oblasti"
                                    value={cropSize.width}
                                    onChange={(e) => {
                                        const value = e.target.value.trim();

                                        setCropSize({
                                            ...cropSize,
                                            width: value === "" ? 50 : parseInt(value) || 0,
                                        });
                                    }}
                                    disabled={infoCrop.allow_change_options ? false : true}
                                />
                            </Box>
                            <Box width={150}>
                                <InputNumber
                                    label="Visina oblasti"
                                    value={cropSize.height}
                                    onChange={(e) => {
                                        const value = e.target.value.trim();
                                        setCropSize({
                                            ...cropSize,
                                            height: value === "" ? 50 : parseInt(value) || 0,
                                        });
                                    }}
                                    disabled={infoCrop.allow_change_options ? false : true}
                                />
                            </Box>
                        </Stack>
                    </Grid>
                )}
                <Grid item xs={4}>
                    <Stack direction="row" alignItems="right" spacing={2}>
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
