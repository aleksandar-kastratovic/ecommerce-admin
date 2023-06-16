import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";

import IconList from "../../../helpers/icons";

import styles from "./MultipleImages.module.scss";
import { Divider } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const MultipleImages = ({ handleMultipleImageUpload = () => { }, handleDrag = () => { }, handleDrop = () => { }, accept = "image/*", dragActive = false, icon = IconList.addAPhoto }) => {
  return (
    <>
      <Box className={styles.formUpload} onDragEnter={handleDrag}>
        <input type="file" className={styles.inputUpload} multiple={true} />
        <label className={!dragActive ? styles.labelUpload : styles.labelUploadActive} htmlFor="input-file-upload">
          <Box sx={{ width: "80%", padding: "1.5rem 0" }}>
            <CloudUploadIcon sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "1.8rem" }} />
            <Typography variant="subtitle1" sx={{ fontSize: "0.875rem" }}>
              Prevuci dokument
            </Typography>
            <Divider className={styles.divider}>ili</Divider>
            <Button variant="outlined" component="label" className={styles.buttonStyle}>
              <input hidden accept={accept} multiple type="file" onChange={(e) => handleMultipleImageUpload(e)} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Icon className={styles.addAPhotoIcon}>{icon}</Icon>
                <Typography variant="subtitle1" className={styles.label}>
                  <span style={{ textTransform: "capitalize" }}>O</span>daberi dokument
                </Typography>
              </Box>
            </Button>
          </Box>
        </label>
        {dragActive && <div className={styles.dragPseudoElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} />}
      </Box>
    </>
  );
};

export default MultipleImages;
