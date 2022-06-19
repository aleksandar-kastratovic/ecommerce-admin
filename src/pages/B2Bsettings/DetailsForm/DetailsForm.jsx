import React, { useState } from "react";

// material-ui components
import Box from "@mui/material/Box";
import CreateForm from "../../../components/shared/Form/CreateForm";
import LeftColum from "./LeftColum";
import TwoColumn from "../../../components/shared/Layout/TwoColumn/TwoColumn";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

import UploadForm from "./UploadForm";
import styles from "./DetailsForm.module.scss";
import fieldsFormOne from "../fieldsFormOne.json";
import fieldsFormTwo from "../fieldsFormTwo.json";

const DetailsForm = ({ formItemChangeHandler = () => {}, b2bconfig = {} }) => {
  // TODO should be fully configurable through API whole page not only details just a showcase
  // showColumn will be removed
  // through config you will get an layout and component will behave like you want - see for example CreateForm
  const [fields, setFields] = useState(fieldsFormOne);
  const [showColumn, setShowColumn] = useState(false);

  const handleSelectInDetails = (id) => {
    // TODO API call for config
    id === 0 ? setFields(fieldsFormOne) : setFields(fieldsFormTwo);
    setShowColumn(!showColumn);
  };

  return (
    <TwoColumn
      left={<LeftColum handleSelectInDetails={handleSelectInDetails} />}
      right={
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <UploadForm title={showColumn ? "Logo Slika" : "Tab ikonica"} />
            </Grid>
            <Grid item xs={6}>
              {fields.map((item, index) => (
                <CreateForm
                  data-test-id="B2B-settings-form"
                  onChangeHandler={formItemChangeHandler}
                  item={item}
                  key={index}
                  // prepared for validations
                  // error={
                  //   Array.isArray(item)
                  //     ? item.map(({ propName }) => inputsError[propName])
                  //     : inputsError[item.propName]
                  // }
                  value={
                    Array.isArray(item) && b2bconfig
                      ? b2bconfig[item.propName]
                      : b2bconfig[item.propName]
                  }
                />
              ))}
            </Grid>
            {showColumn && (
              <Grid item xs={3}>
                <UploadForm title="Pozadinska slika" />
              </Grid>
            )}
          </Grid>
          <Button
            className={styles.saveButton}
            variant="contained"
            endIcon={<CheckIcon />}
          >
            Sacuvaj
          </Button>
        </Box>
      }
    />
  );
};

export default DetailsForm;
