import { ArrowBack } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import scss from "./PageTitle.module.scss";

const PageTitle = ({ title, back, actions = [] }) => {
  const navigate = useNavigate();

  // If `back` is set to true, go back in history
  if (back === true) {
    back = () => navigate(-1);
  }

  return (
    <Box className={scss.wrapper}>
      {/* Options */}
      <Box className={scss.buttons}>
        {/* Optional additional buttons */}
        {actions.map((button, index) => {
          return (
            <Button
              key={index}
              icon={button.icon}
              label={button.label}
              onClick={button.action}
              variant={button.variant}
            />
          );
        })}
        {/* Optional back button */}
        {back && <Button icon={"arrow_back"} label="Nazad" onClick={back} />}
      </Box>

      {/* The title */}
      <Typography variant="h5" component="div" scss={scss.title}>
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
