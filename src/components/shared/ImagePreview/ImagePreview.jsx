import React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const ImagePreview = ({ imagePreviewList = [] }) => {
  return (
    <Box sx={{ width: 500, height: 450 }}>
      <ImageList variant="masonry" cols={3} gap={8} rowHeight="auto">
        {imagePreviewList.map((item) => (
          <ImageListItem key={item.image}>
            {item.image === "DELETE" ? (
              <Alert severity="error">
                {item?.label} je obrisan, ako ste se predomislili kliknite na
                dugme "nazad".
              </Alert>
            ) : (
              <img
                src={item?.image}
                srcSet={item?.image}
                alt={item?.label}
                loading="lazy"
              />
            )}
            <ImageListItemBar position="below" title={item.label} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ImagePreview;
