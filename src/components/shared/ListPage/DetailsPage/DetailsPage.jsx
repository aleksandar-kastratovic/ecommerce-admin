import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../Layout/PageWrapper/PageWrapper";
import DetailsList from "./DetailsList";

import styles from "./DetailsPage.module.scss";

const DetailsPage = ({ title = "", fields = [], additionalButtons = [] }) => {
  const [selected, setSelected] = useState(fields[0].id ?? null);

  const navigate = useNavigate();

  const handleChange = (value) => {
    setSelected(value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getFieldComponent = () => {
    for (const item of fields) {
      if (item.id === selected) {
        return item.component;
      }
    }
    return null;
  };

  return (
    <PageWrapper title={title} back={handleBack} actions={additionalButtons}>
      <Box className={styles.details}>
        <Box className={styles.list}>
          <DetailsList
            fields={fields}
            handleSelect={handleChange}
            selected={selected}
          />
        </Box>
        {fields.map((field) => {
          if (field.id === selected) {
            return (
              <Box className={styles.main} key={field.id}>
                {field.component}
              </Box>
            );
          }
          return null;
        })}
      </Box>
    </PageWrapper>
  );
};

export default DetailsPage;
