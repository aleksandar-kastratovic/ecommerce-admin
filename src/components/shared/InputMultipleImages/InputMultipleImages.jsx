import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ImageDialogFullPage from "../MultipleImages/ImageDialogFullPage/ImageDialogFullPage";
import ImageListRow from "../MultipleImages/ImageListRow/ImageListRow";
import MultipleImages from "../MultipleImages/MultipleImages";

const getLoadedFile = (file, i, len) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            let ret = {
                id: i + 1 + len,
                name: file.name,
                position: i + 1 + len,
                alt: file.name,
                size: file.size,
                type: file.type,
                src: reader.result,
                new: true,
            };
            resolve(ret);
        };

        reader.readAsDataURL(file);
    });
};

export const InputMultipleImages = ({ list = [], onChangeHandler = () => {}, accept = "image/*", name = "", uploadHandler = () => {}, deleteHandler = () => {} }) => {
    const [imageList, setImageList] = useState(list);
    const [dragActive, setDragActive] = useState(false);

    const init = {
        show: false,
        image: "",
        alt: "",
        name: "",
        size: "",
        type: "",
    };

    const [openFullPageDialog, setOpenFullPageDialog] = useState(init);

    //DRAG EVENT HANDLER
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    //FILES UPLOAD HANDLER
    const handleUpload = async function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        let selectedFiles = [];
        if (e?.dataTransfer?.files && e.dataTransfer.files[0]) {
            selectedFiles = e.dataTransfer.files;
        } else if (e?.target?.files && e.target.files[0]) {
            selectedFiles = e.target.files;
        }

        if (selectedFiles.length > 0) {
            let newImagesArray = [];

            let len = imageList === undefined ? 0 : imageList.length;

            for (let i = 0; i < selectedFiles.length; i++) {
                var file = selectedFiles[i];
                const obj = await getLoadedFile(file, i, len);
                await uploadHandler(obj);
                newImagesArray.push(obj);
            }
            if (Array.isArray(imageList)) {
                newImagesArray = [...imageList, ...newImagesArray];
            }

            setImageList(newImagesArray);
        }
    };

    //MODAL OPEN HANDLER
    const handleModalOpen = (e, src, alt, name, size, type, id) => {
        setOpenFullPageDialog({
            show: true,
            id: id,
            image: src,
            alt: alt,
            name: name,
            size: size,
            type: type,
        });
    };

    //CLOSE MODAL
    const handleCloseImageDialog = () => {
        setOpenFullPageDialog(init);
    };

    //IMAGE UPLOAD FROM MODAL
    const formImageUpload = useCallback(
        (event) => {
            event.preventDefault();
            const selectedFile = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const timeOutId = setTimeout(() => {
                    imageSetter(event, reader.result, selectedFile);
                }, 800);
                return () => clearTimeout(timeOutId);
            };
            reader.readAsDataURL(selectedFile);
        },
        [openFullPageDialog]
    );

    const imageSetter = (event, result, selectedFile) => {
        // TODO redundant move to helper and one state
        const find = imageList.filter((item) => {
            return item.name === event.target.id;
        });
        const found = find[0];

        let imageItem = {
            id: found.id,
            position: found.position,
            alt: selectedFile.name,
            size: selectedFile.size,
            type: selectedFile.type,
            name: selectedFile.name,
            src: result,
        };

        const newState = imageList.map((img) => {
            if (img.id === found.id) {
                return { ...imageItem };
            }
            return img;
        });
        setImageList(newState);

        setOpenFullPageDialog({
            ...openFullPageDialog,
            show: true,
            image: result,
            name: selectedFile.name,
            alt: selectedFile.name,
            size: selectedFile.size,
            type: selectedFile.type,
        });
    };

    //TODO DELETE DIALOG
    const handleDeleteImage = (e, deleteImgId, isNew) => {
        alert("Prikazi modal da li je siguran da zeli da obrise ili ne");
        setOpenFullPageDialog({
            ...openFullPageDialog,
            image: "DELETE",
        });

        // If it is an edit mode it value of property src/image should be string "DELETE"
        // but if it is a first upload it should be removed from images array
        if (!isNew) {
            deleteHandler(deleteImgId);
        }

        const newState = [];
        for (const img of imageList) {
            if (img.id !== deleteImgId) {
                newState.push(img);
            }
        }
        console.log(newState);
        setImageList(newState);
    };

    useEffect(() => {
        setImageList(list);
    }, [list]);

    useEffect(() => {
        onChangeHandler({ target: { value: imageList, name: name } });
    }, [imageList]);

    return (
        <Grid container spacing={1} direction="row" sx={{ mt: "2rem", ml: "1rem" }}>
            <MultipleImages handleMultipleImageUpload={handleUpload} handleDrag={handleDrag} handleDrop={handleUpload} dragActive={dragActive} accept={accept} />

            <ImageListRow setImageList={setImageList} imageList={imageList} handleModalOpen={handleModalOpen} handleDeleteImage={handleDeleteImage} />
            <ImageDialogFullPage
                openFullPageDialog={openFullPageDialog}
                setOpenFullPageDialog={setOpenFullPageDialog}
                setImageList={setImageList}
                imageList={imageList}
                handleCloseImageDialog={handleCloseImageDialog}
                onImageUpload={formImageUpload}
                handleDeleteImage={handleDeleteImage}
            />
        </Grid>
    );
};

export default InputMultipleImages;
