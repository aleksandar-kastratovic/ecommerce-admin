import React from "react";

import Typography from "@mui/material/Typography";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import styles from "./UploadForm.module.scss";

const UploadForm = ({ title = "" }) => {
  // just a component that will behave through properties
  return (
    <>
      <Typography variant="caption" display="block" gutterBottom>
        <span className={styles.titleStyle}>{title}</span>
        <br />
        Maximum file size: 2MB, Allowed types: JBG, GIF, PNG, ICO, APNG, Not all
        browsers support these formats
      </Typography>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          sx={{ display: "none" }}
        />
        <Button variant="contained" component="span">
          <Box
            sx={{
              width: 150,
              height: 150,
              // backgroundColor: "green",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Typography variant="caption" display="block" gutterBottom>
              Click here to add main image
            </Typography>
            <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "80px" }} />
          </Box>
        </Button>
      </label>
    </>
  );
};

export default UploadForm;
