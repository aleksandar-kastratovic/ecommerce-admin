import { Box, Button } from "@mui/material";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";

import { useNavigate } from "react-router-dom";
import DetailsList from "./DetailsList";
import { useState } from "react";
import { useEffect } from "react";

import styles from "./DetailsPage.module.scss";
const DetailsPage = ({
  title = "",
  backButton = false,
  backPath = "",
  hasList = false,
  isLoadingList = false,
  isErrorList = false,
  detailsList = {},
  defaultSelected = "",
  fields = [],
  onChangeSelected = () => {},
  main,
}) => {
  const [selected, setSelected] = useState(defaultSelected);
  const navigate = useNavigate();
  const handleBackToList = () => {
    navigate(backPath);
  };

  const handleSelectInDetails = (module, slug) => {
    setSelected(slug);
  };

  useEffect(() => {
    onChangeSelected(selected);
  }, [selected]);
  return (
    <Box className={styles.details}>
      <Box className={styles.header}>
        <h2>{title}</h2>
        {backButton && (
          <Button onClick={handleBackToList} className={styles.buttonBack}>
            <i>
              <UTurnLeftIcon />
            </i>
            Nazad
          </Button>
        )}
      </Box>
      <Box className={styles.content}>
        {hasList && (
          <Box className={styles.detailsList}>
            <DetailsList
              selected={selected}
              detailsList={detailsList}
              handleSelectInDetails={handleSelectInDetails}
              isLoadingList={isLoadingList}
              isErrorList={isErrorList}
              fields={fields}
            />
          </Box>
        )}
        <Box className={styles.main}>{main !== undefined && main}</Box>
      </Box>
    </Box>
  );
};

export default DetailsPage;
