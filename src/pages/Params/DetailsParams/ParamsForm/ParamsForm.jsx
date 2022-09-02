import { useState } from "react";
import CreateForm from "../../../../components/shared/Form/CreateForm";
import Form from "../../../../components/shared/Form/Form";

import paramsTypeField from "../forms/paramsType.json";
import paramsCheckbox from "../forms/paramsCheckbox.json";
import basicForm from "../forms/paramBasicForm.json";
import slugName from "../forms/slugNameField.json";

import { useEffect } from "react";
import { Box } from "@mui/material";

const ParamsForm = ({
  onSubmit = () => {},
  onChange = () => {},
  data = {},
  subForm = [],
}) => {
  const [paramType, setParamType] = useState(data.field_type);
  const [multiParam, setMultiParam] = useState(data.field_is_multiple);

  const submitHandler = (data) => {
    const ret = {
      ...data,
      field_type: paramType,
      field_is_multiple: multiParam,
    };
    onSubmit(ret);
  };
  useEffect(() => {
    onChange({ ...data, field_type: paramType, field_is_multiple: multiParam });
  }, [multiParam, paramType]);

  useEffect(() => {
    setParamType(data.field_type);
    setMultiParam(data.field_is_multiple);
  }, [data]);

  return (
    <Box>
      <CreateForm
        onChangeHandler={({ target }) => setParamType(target.value)}
        item={paramsTypeField}
        value={paramType}
      />
      <CreateForm
        onChangeHandler={({ target }) => setMultiParam(target.checked)}
        item={paramsCheckbox}
        value={multiParam}
      />
      <Form
        formFields={[...slugName, ...subForm, ...basicForm]}
        initialData={data}
        onSubmit={submitHandler}
      />
    </Box>
  );
};

export default ParamsForm;
