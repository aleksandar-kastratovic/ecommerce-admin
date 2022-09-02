// material-ui components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Icon from "@mui/material/Icon";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";

import styles from "./DetailsList.module.scss";

const DetailsList = ({
  handleSelect = () => {},
  fields = [],
  selected = 0,
  isLoadingList = false,
  isErrorList = false,
}) => {
  const handleSelectItem = (value) => {
    handleSelect(value);
  };

  return (
    <>
      <Box className={styles.list}>
        <List>
          {!isLoadingList ? (
            <>
              {fields.map((field) => (
                <ListItem
                  key={field.id}
                  disablePadding
                  selected={selected === field.id ? true : false}
                  onClick={() => handleSelectItem(field.id)}
                  disabled={field.disabled}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon>{field.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={field.name} />
                    <ChevronRightIcon />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          ) : (
            <Stack spacing={1}>
              <Skeleton variant="text" height={50} />
              <Skeleton variant="text" height={50} />
              <Skeleton variant="text" height={50} />
              <Skeleton variant="text" height={50} />
            </Stack>
          )}
        </List>
      </Box>
      {isErrorList && (
        <Stack sx={{ width: "100%" }}>
          <Alert severity="error">
            Doslo je do greske. Molim Vas pokusajte kasnije.
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default DetailsList;
