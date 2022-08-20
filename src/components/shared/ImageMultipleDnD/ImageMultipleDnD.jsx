import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import styles from "./ImageMultipleDnD.module.scss";

const ImageMultipleDnD = ({
  handleMultipleImageUpload = () => {},
  handleDrag,
  handleDrop,
  dragActive,
}) => {
  return (
    <>
      <form
        className={styles.formUpload}
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="file" className={styles.inputUpload} multiple={true} />
        <label
          className={
            !dragActive ? styles.labelUpload : styles.labelUploadActive
          }
          htmlFor="input-file-upload"
        >
          <div>
            <p>Prevuci ili</p>
            <Button
              variant="outlined"
              component="label"
              className={styles.buttonStyle}
            >
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => handleMultipleImageUpload(e)}
              />
              <Box>
                <Box>
                  <Typography variant="caption" display="block" gutterBottom />
                  <AddAPhotoIcon className={styles.addAPhotoIcon} />
                </Box>
                <Typography variant="caption" display="block" gutterBottom>
                  klikni
                </Typography>
              </Box>
            </Button>
          </div>
        </label>
        {dragActive && (
          <div
            className={styles.dragPseudoElement}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
      </form>
      {/* <Button
        variant="outlined"
        component="label"
        className={styles.buttonStyle}
      >
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={(e) => handleMultipleImageUpload(e)}
        />
        <Box>
          <Box>
            <Typography variant="caption" display="block" gutterBottom />
            <AddAPhotoIcon className={styles.addAPhotoIcon} />
          </Box>
          <Typography variant="caption" display="block" gutterBottom>
            Prevuci ili klikni
          </Typography>
        </Box>
      </Button> */}
    </>
  );
};

export default ImageMultipleDnD;
