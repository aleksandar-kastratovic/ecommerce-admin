import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import styles from "./ImageMultipleDnD.module.scss";

const ImageMultipleDnD = ({ handleMultipleImageUpload = () => {} }) => {
  return (
    <Button variant="outlined" component="label" className={styles.buttonStyle}>
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
    </Button>
  );
};

export default ImageMultipleDnD;
