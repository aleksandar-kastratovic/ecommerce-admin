import React from "react";

// material-ui components
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// other imports
import styles from "./ListTableTitle.module.scss";

const ListTableTitle = ({
  title = "",
  showButton = false,
  handleCreateNew = () => {},
}) => {
  return (
    <Box>
      <Typography variant="h5" component="div" className={styles.titleStyle}>
        {title}
      </Typography>
      {showButton && (
        <Button onClick={handleCreateNew} className={styles.buttonCreate}>
          Kreiraj novi
          <AddIcon />
        </Button>
      )}
    </Box>
  );
};

export default ListTableTitle;
