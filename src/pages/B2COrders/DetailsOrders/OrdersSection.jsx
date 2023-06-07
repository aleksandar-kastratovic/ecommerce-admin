import Box from "@mui/material/Box";

import styles from "./B2COrdersDetails.module.scss";

const OrderSection = ({ title, children, className }) => {
  return (
    <Box className={`${className} ${styles.orderSection}`}>
      <Box className={styles.orderSectionTitle}>{title}</Box>
      <Box className={styles.orderSectionBody}>{children}</Box>
    </Box>
  );
};

export default OrderSection;
