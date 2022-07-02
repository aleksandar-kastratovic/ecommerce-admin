import React from "react";

// material-ui components
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import styles from "./DetailsBasic.module.scss";

const DetailsBasic = ({
  list = {},
  main = {},
  handleBackToList = () => {},
}) => {
  return (
    <Paper elevation={0} className={styles.paperStyle}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 3">{list}</Box>
        <Box gridColumn="span 9">
          <Button onClick={handleBackToList} className={styles.buttonBack}>
            Nazad
            <KeyboardReturnIcon />
          </Button>
          <Box className={styles.main}>{main}</Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default DetailsBasic;
