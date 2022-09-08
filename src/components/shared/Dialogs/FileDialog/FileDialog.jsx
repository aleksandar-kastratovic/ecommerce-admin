import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";

import styles from "./FileDialog.module.scss";

const FileDialog = ({
    openFullPageDialog,
    setOpenFullPageDialog,
    title = "",
    setImageList,
    imageList = [],
    onImageUpload = () => {},
    handleCloseImageDialog = () => {},
    handleDeleteImage = () => {},
}) => {
    const [loadingImage, setLoadingImage] = useState(false);

    const handleImageUpload = (e) => {
        setLoadingImage(true);
        onImageUpload(e);
        const timeOutId = setTimeout(() => {
            setLoadingImage(false);
        }, 1000);
        return () => clearTimeout(timeOutId);
    };
    return (
        <Dialog open={openFullPageDialog.show} fullScreen aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
            <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {openFullPageDialog.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box>
                    {loadingImage ? (
                        <div>
                            <CircularProgress size="6rem" sx={{ ml: "45%", mt: "15%" }} disableShrink />
                        </div>
                    ) : (
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <div className={styles.imageStyle}>
                                        {openFullPageDialog.image && (
                                            <img
                                                style={{
                                                    maxWidth: "90%",
                                                    maxHeight: "calc(90vh - 64px)",
                                                }}
                                                src={openFullPageDialog?.image}
                                                alt={openFullPageDialog?.name}
                                            />
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <form className={styles.formFieldsStyle}>
                                        <TextField fullWidth type="text" disabled label="Naziv slike" value={openFullPageDialog?.name} variant="outlined" />
                                        <TextField fullWidth type="text" disabled label="Alt slike" value={openFullPageDialog?.alt} variant="outlined" />
                                        <TextField fullWidth type="text" disabled label="Velicina slike" value={openFullPageDialog?.size} variant="outlined" />
                                        <TextField fullWidth type="text" disabled label="Tip slike" value={openFullPageDialog?.type} variant="outlined" />
                                    </form>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                (
                <Stack direction="row" alignItems="center" spacing={2} className={styles.btnGroup}>
                    <Button variant="outlined" onClick={handleCloseImageDialog} color="success" startIcon={<CheckIcon />}>
                        Sačuvaj
                    </Button>
                    <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
                        Nova slika
                        <Input
                            name="image"
                            inputProps={{ accept: ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf" }}
                            id={openFullPageDialog.name}
                            onChange={(e) => handleImageUpload(e)}
                            type="file"
                            sx={{ display: "none" }}
                        />
                    </Button>
                    <Button variant="outlined" color="error" onClick={(e) => handleDeleteImage(e, openFullPageDialog.id)} startIcon={<DeleteOutlineOutlinedIcon />}>
                        Obrisi
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCloseImageDialog} startIcon={<CancelOutlinedIcon />}>
                        Otkaži
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default FileDialog;
