import React, { useCallback, useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/cropImage";

const ImageCrop = ({ openModal, handleClose, imageCroped, imgForCrooping }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    useEffect(() => {
        setCroppedImage(imgForCrooping?.img);
    }, [imgForCrooping]);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

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
        handleClose();
    }, [croppedAreaPixels]);

    return (
        <Modal show={openModal} onHide={handleClose} backdrop="static" keyboard={false} centered size="xl" scrollable={true} className="add-role-modal crop-modal">
            <Modal.Header closeButton>
                <Modal.Title>Izrezivanje slike</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="crop-container">
                    <Cropper
                        image={croppedImage}
                        crop={crop}
                        zoom={zoom}
                        minZoom={0.1}
                        maxZoom={3}
                        zoomSpeed={0.1}
                        cropSize={{ width: imgForCrooping?.cropWidth ?? null, height: imgForCrooping?.cropHeight ?? null }}
                        restrictPosition={false}
                        objectFit="contain"
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className="controls">
                    <input
                        type="range"
                        value={zoom}
                        min={0.1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => {
                            setZoom(e.target.value);
                        }}
                        className="zoom-range"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn-control cancel-btn" onClick={handleClose}>
                    Odustanite
                </button>
                <button type="button" className="btn-control save-btn" onClick={showCroppedImage}>
                    Sačuvajte
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImageCrop;
