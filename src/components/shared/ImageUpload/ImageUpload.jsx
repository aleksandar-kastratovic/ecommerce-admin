import React from "react";

// mui imports
import Typography from "@mui/material/Typography";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

// other imports
import styles from "./ImageUpload.module.scss";

const ImageUpload = ({
  name = "",
  label = "",
  required = false,
  description = "",
  value = "",
  error = "",
  onChangeHandler = () => {},
}) => {
  // just a component that will behave through properties
  return (
    <>
      <FormControl
        sx={{
          margin: "0.5rem",
        }}
      >
        <FormLabel required={required}>{label}</FormLabel>
        <Typography variant="caption" display="block" gutterBottom>
          <br />
          {description}
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
                width: 100,
                height: 100,
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ fontSize: "8px" }}
              />
              <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "6rem" }} />
            </Box>
            {/* <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "green",
                marginLeft: "2rem",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              TODO Jos jedan box za spiner dok se upload slika sa porukom succes
            </Box> */}
          </Button>
        </label>
        <FormHelperText>
          Maximum file size: 2MB, Allowed types: JBG, GIF, PNG, ICO, APNG, Not
          all browsers support these formats
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default ImageUpload;
