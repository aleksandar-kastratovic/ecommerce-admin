import React, { useEffect, useContext, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import styles from "./B2Bsettings.module.scss";
import { flatten } from "lodash";
import fields from "./mainListFields.json";

import ListTable from "../../components/shared/ListTable/ListTable";
import ListTableTitle from "../../components/shared/ListTable/ListTableTitle";
import ListTableToolbar from "../../components/shared/ListTable/ListTableToolbar";

import { useQuery } from "react-query";
import AuthContext from "../../store/auth-contex";
import { getListB2Bconfig } from "./services";
import MultipleImages from "../../components/shared/MultipleImages/MultipleImages";
import ImageListRow from "../../components/shared/MultipleImages/ImageListRow/ImageListRow";
import ImageDialogFullPage from "../../components/shared/MultipleImages/ImageDialogFullPage/ImageDialogFullPage";
import InputMultipleImages from "../../components/shared/InputMultipleImages/InputMultipleImages";

const B2Bsettings = ({}) => {
    const { user } = useContext(AuthContext);

    const [listData, setListData] = useState();

    const { isSuccess, data: response, isLoading, isError } = useQuery(["getListB2Bconfig"], () => getListB2Bconfig(user.access_token));

    const navigate = useNavigate();
    // Main component with all frontend logic
    // Please use destructuring
    // Since on a project is not used strong type(for example typescript or even proptypes - deprecated)
    // it is recommended for all properties to give an initial value
    // In that way if you don't receive value app will not break and all developers will know what type to expect number, string or object, arr etc.

    useEffect(() => {
        if (response) {
            setListData(response?.data?.payload);
        }
    }, [response]);

    const handleCreateNew = (e) => {
        // TODO handle create new
    };

    const handleActions = (module) => () => {
        navigate(`/B2B-settings/${module}`);
    };

    // TODO DEMO Start Multiple images drag and drop

    // state for openFullPageDialog and imageList single image is very similar it should be one state.
    // Here for demo purposes it is divided to two different states
    // Also setting that different states is redundant it should be one state and setter redundant part should be moved to util/helper file
    const [imageList, setImageList] = useState();
    // TODO DEMO handle drag state
    const [dragActive, setDragActive] = useState(false);
    // initial state of image dialog and image data
    const init = {
        show: false,
        image: "",
        alt: "",
        name: "",
        size: "",
        type: "",
    };
    // handle open full page modal with image data
    const [openFullPageDialog, setOpenFullPageDialog] = useState(init);

    // handler for uploading images, maping to array with image data for components
    const handleMultipleImageUpload = useCallback(
        (event) => {
            event.preventDefault();
            let newImagesArray = [];

            if (event.target.files && event.target.files[0]) {
                const selectedFiles = event.target.files;
                let len = imageList === undefined ? 0 : imageList.length;
                // TODO redundant move to helper and one state
                for (let i = 0; i < selectedFiles.length; i++) {
                    var file = selectedFiles[i];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        newImagesArray.push({
                            id: i + 1 + len,
                            name: selectedFiles[i].name,
                            position: i + 1,
                            alt: selectedFiles[i].name,
                            size: selectedFiles[i].size,
                            type: selectedFiles[i].type,
                            src: reader.result,
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }

            if (Array.isArray(imageList)) {
                newImagesArray = [...imageList, ...newImagesArray];
            }
            setImageList(newImagesArray);
        },
        [imageList]
    );

    // TODO DEMO handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // TODO DEMO triggers when file is dropped same as upload
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFiles = e.dataTransfer.files;

            const newImagesArray = [];

            // TODO redundant move to helper and one state
            for (let i = 0; i < selectedFiles.length; i++) {
                var file = selectedFiles[i];
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImagesArray.push({
                        id: i + 1,
                        name: selectedFiles[i].name,
                        position: i,
                        alt: selectedFiles[i].name,
                        size: selectedFiles[i].size,
                        type: selectedFiles[i].type,
                        src: reader.result,
                    });
                };
                reader.readAsDataURL(file);
            }

            setImageList(newImagesArray);
        }
    };

    // modal open handler
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

    // close modal back to initial state
    const handleCloseImageDialog = () => {
        setOpenFullPageDialog(init);
    };

    // single image upload in opend modal
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

    const handleDeleteImage = (e, deleteImgId) => {
        alert("Prikazi modal da li je siguran da zeli da obrise ili ne");
        setOpenFullPageDialog({
            ...openFullPageDialog,
            image: "DELETE",
        });

        // If it is an edit mode it value of property src/image should be string "DELETE"
        // but if it is a first upload it should be removed from images array
        let imageItem = {
            id: null,
            position: null,
            alt: null,
            size: null,
            type: null,
            name: null,
            src: "DELETE",
        };

        const newState = imageList.map((img) => {
            if (img.id === deleteImgId) {
                return { ...imageItem };
            }
            return img;
        });
        setImageList(newState);
    };

    return (
        <>
            <Paper elevation={0} className={styles.paperStyle}>
                <ListTableTitle title="B2B eCommerce podesavanje modula" showButton={true} handleCreateNew={handleCreateNew} />

                <ListTableToolbar showToolbar={false} />

                <ListTable tableFields={flatten(fields).filter(({ in_main_table }) => in_main_table)} listData={listData} handleActions={handleActions} />

                {/* TODO DEMO Start */}
                {/* put into grid just as an example */}
                <Grid container spacing={1} direction="row" sx={{ mt: "2rem", ml: "1rem" }}>
                    <MultipleImages handleMultipleImageUpload={handleMultipleImageUpload} handleDrag={handleDrag} handleDrop={handleDrop} dragActive={dragActive} />

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
                {/* TODO DEMO End */}
            </Paper>
        </>
    );
};

export default B2Bsettings;
