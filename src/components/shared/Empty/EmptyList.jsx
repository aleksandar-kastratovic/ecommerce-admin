import { TableCell, TableRow } from "@mui/material";
import styles from "./EmptyList.module.scss";

const EmptyList = ({ span = 1 }) => {
  return (
    <TableRow>
      <TableCell colSpan={span} className={styles.empty}>
        Nema podataka za prikaz!
      </TableCell>
    </TableRow>
  );
};

export default EmptyList;
