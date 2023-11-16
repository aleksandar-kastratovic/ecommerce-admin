import React, { useEffect, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";
import Typography from "@mui/material/Typography";
import images from "../../../assets/images/download.png"

const Slider = ({
  name = "",
  label = "",
  required = false,
  description = "",
  value = "",
  error = "",
  emptyMessage = "Trenutno nema slike/videa za prikaz.",
  dataFromServer = [],
  sliderOptions = {
    lazyLoad: true,
    showThumbnails: true,
    showFullscreenButton: true,
    showPlayButton: true,
  },
  imageConfig = {
    className: "sliderImage"
  },
  sliderConfig = {
    className: "sliderVideo"
  }
}) => {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setItems(dataFromServer);
  // }, [dataFromServer]);
  useEffect(() => {
    if (JSON.stringify(dataFromServer) !== JSON.stringify(items)) {
      setItems(dataFromServer);
    }
  }, [dataFromServer, items]);

  const renderItem = (item) => {
    if (item.type === "video") {
      return (
        <video src={item.url} autoPlay controls style={{ width: "100%" }} {...sliderConfig} />
      );
    } else if (item.type === "image") {
      return <img src={item.url} alt={item.alt} style={{ width: "100%" }} {...imageConfig} />;
    }

    return null;
  };

  return (
    <>
      <FormControl>
        <FormLabel required={required}>{label}</FormLabel>
        {items.length > 0 ? (
          <ReactImageGallery

            items={items.map((item) => ({
              original: item.url,
              thumbnail: item.thumbnail === "default-missing-image" ? images : item.thumbnail,
              renderItem: () => renderItem(item),
              ...imageConfig,
              ...sliderConfig
            }))}
            {...sliderOptions}
          />
        ) : (
          <Typography variant="subtitle1">
            {emptyMessage}
          </Typography>
        )}
      </FormControl>
    </>
  );
};

export default Slider;