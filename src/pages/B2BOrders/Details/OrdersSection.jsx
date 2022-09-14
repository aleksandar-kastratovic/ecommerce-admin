import { Box } from "@mui/material";
import styles from "./B2BOrdersDetails.module.scss";

const OrderSection = ({ title, children }) => {
    return (
        <Box>
            <Box>{title}</Box>
            <Box>{children}</Box>
        </Box>
    );
};

export default OrderSection;
