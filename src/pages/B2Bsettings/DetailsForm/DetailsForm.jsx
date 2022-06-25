import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// material-ui components
import Box from "@mui/material/Box";
import CreateForm from "../../../components/shared/Form/CreateForm";

import DetailsList from "./DetailsList";
import UploadForm from "./UploadForm";
import fieldsFormOne from "../fieldsFormOne.json";
import fieldsFormTwo from "../fieldsFormTwo.json";
import { isEmpty } from "lodash";
import DetailsBasic from "../../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";
import ThreeColumnDetails from "../../../components/shared/Layout/Details/ThreeColumnDetails/ThreeColumnDetails";

import mockData from "../mockData.json";

const DetailsForm = ({}) => {
  const { B2BId } = useParams();
  const navigate = useNavigate();

  const data = mockData;
  // TODO should be fully configurable through API whole page not only details just a showcase
  // showColumn will be removed
  // through config you will get an layout and component will behave like you want - see for example CreateForm
  const [fields, setFields] = useState(fieldsFormOne);
  // new item
  const [newItem, setNewItem] = useState({ name: "", b2b: "", key_word: "" });
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
    // TODO API Get call not mock data
    if (data) {
      const findDetails = data.find(
        (element) => element.id === parseInt(B2BId)
      );
      setNewItem(findDetails);
    }
  }, [B2BId]);

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

  const handleBackToList = () => {
    navigate(`/B2B-settings`);
  };

  return (
    <DetailsBasic
      handleBackToList={handleBackToList}
      list={<DetailsList handleSelectInDetails={handleSelectInDetails} />}
      main={
        <ThreeColumnDetails
          left={
            <UploadForm title={showColumn ? "Logo Slika" : "Tab ikonica"} />
          }
          middle={
            <Box component="form" autoComplete="off">
              {fields.map((item, index) => (
                <CreateForm
                  data-test-id="B2B-settings-form"
                  onChangeHandler={formItemChangeHandler}
                  item={item}
                  key={index}
                  error={
                    Array.isArray(item)
                      ? item.map(({ prop_name }) => inputsError[prop_name])
                      : inputsError[item.prop_name]
                  }
                  value={
                    Array.isArray(item) && newItem
                      ? newItem[item.prop_name]
                      : newItem[item.prop_name]
                  }
                />
              ))}
            </Box>
          }
          right={showColumn ? <UploadForm title="Pozadinska slika" /> : <div />}
          onSubmit={onSubmit}
          buttonText="Sacuvaj"
        />
      }
    />
  );
};

export default DetailsForm;
