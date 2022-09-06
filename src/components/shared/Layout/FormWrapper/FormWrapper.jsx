import { Box } from "@mui/material";
import PageWrapper from "../PageWrapper/PageWrapper";
import styles from "./FormWrapper.module.scss";

const FormWrapper = ({ title, back, children, actions }) => {
  return (
    <PageWrapper title={title} back={back} actions={actions}>
      <Box className={styles.formWrapper}>
        <Box className={styles.formContainer}>{children}</Box>
      </Box>
    </PageWrapper>
  );
};

export default FormWrapper;
