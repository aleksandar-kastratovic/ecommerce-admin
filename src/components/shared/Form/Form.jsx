import { Box } from "@mui/system";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import CreateForm from "./CreateForm";
import Buttons from "./Buttons/Buttons";
import { useNavigate } from "react-router-dom";

const Form = ({ formFields = [], initialData = {}, onSubmit = () => {} }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [inputsError, setInputsError] = useState([]);

  const submitHandler = () => {
    const errors = {};
    for (const field of formFields) {
      if (data[field.prop_name] === "" && field.required) {
        errors[field.prop_name] = {
          content: "Polje je obavezno, molim Vas unesite vrednost.",
        };
      }
    }
    isEmpty(errors) ? onSubmit(data) : setInputsError(errors);
  };

  const formItemChangeHandler = ({ target }, type) => {
    if (type === "date") {
      setData({ ...data, [target.name]: formatDate(target.value) });
    } else if (type) {
      setData({ ...data, [target.name]: target.checked });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };

  return (
    <Box component="form" autoComplete="off">
      {formFields &&
        formFields
          .filter(({ in_details }) => in_details)
          .map((item, index) => {
            return (
              <CreateForm
                data-test-id="admin-form"
                onChangeHandler={formItemChangeHandler}
                item={item}
                key={index}
                error={inputsError[item.prop_name]}
                value={
                  Array.isArray(item) && data
                    ? data[item.prop_name]
                    : data[item.prop_name]
                }
              />
            );
          })}
      <Buttons>
        <Button label="Odustani" onClick={() => navigate(-1)} />
        <Button label="Sačuvaj" onClick={submitHandler} variant="contained" />
      </Buttons>
    </Box>
  );
};

export default Form;
