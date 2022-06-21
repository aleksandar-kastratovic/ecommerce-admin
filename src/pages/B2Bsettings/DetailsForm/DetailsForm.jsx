import React, { useState, useEffect } from "react";

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
import { isEmpty } from "lodash";

const DetailsForm = ({}) => {
  // TODO should be fully configurable through API whole page not only details just a showcase
  // showColumn will be removed
  // through config you will get an layout and component will behave like you want - see for example CreateForm
  const [fields, setFields] = useState(fieldsFormOne);
  // new item
  const [newItem, setNewItem] = useState({ name: "", subname: "" });
  const [showColumn, setShowColumn] = useState(false);
  // when you receive a backend validation it should be implemented through the same error object
  // and a context validator avalible on whole app.
  // const [inputsError, setInputsError] = useValidator(context ? context : {});
  // In this example is backend validation presented on one field and it can be also presented via toast or popup etc.
  // useValidator is not a custom hook it is a context that wraps app like auth context now.
  // Ofc they can be merged, but for sake of simplicity they should stay divided.
  const [inputsError, setInputsError] = useState({});

  useEffect(() => {
    setFields(fieldsFormOne);
  }, []);

  useEffect(() => {
    const errors = { ...inputsError };
    Object.keys(errors).forEach((propName) => {
      if (!isEmpty(newItem[propName])) {
        delete errors[propName];
      }
    });
    setInputsError(errors);
  }, [newItem]);

  const onSubmit = () => {
    const errors = {};
    Object.keys(newItem).forEach((propName) => {
      if (isEmpty(newItem[propName])) {
        if (propName !== "subname") {
          errors[propName] = {
            content: "Polje je obavezno, molim vas unesite vrednost.",
          };
        }
      }
    });
    isEmpty(errors) ? console.log(newItem) : setInputsError(errors);
  };

  const handleSelectInDetails = (id) => {
    // TODO API call for config
    id === 0 ? setFields(fieldsFormOne) : setFields(fieldsFormTwo);
    setShowColumn(!showColumn);
  };

  const formItemChangeHandler = ({ target }) => {
    setNewItem({ ...newItem, [target.name]: target.value });
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
                  error={
                    Array.isArray(item)
                      ? item.map(({ propName }) => inputsError[propName])
                      : inputsError[item.propName]
                  }
                  value={
                    Array.isArray(item) && newItem
                      ? newItem[item.propName]
                      : newItem[item.propName]
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
            onClick={onSubmit}
          >
            Sacuvaj
          </Button>
        </Box>
      }
    />
  );
};

export default DetailsForm;
