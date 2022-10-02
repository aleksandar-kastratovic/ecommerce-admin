import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../../../../components/shared/Button/Button";
import Buttons from "../../../../../components/shared/Form/Buttons/Buttons";
import CreateForm from "../../../../../components/shared/Form/CreateForm";

const VariationForm = ({ fields = [], onSumbit = () => {} }) => {
  const [data, setData] = useState(fields);
  const formItemChangeHandler = ({ target }) => {
    const [id_attr, id_value] = target.name.split("_");
    const arr = [...data];
    for (const field of arr) {
      if (field.attr.id === Number(id_attr)) {
        for (const value of field.values) {
          if (value.id === Number(id_value)) {
            value.selected = target.checked;
          }
        }
      }
    }
    setData(arr);
  };

  useEffect(() => {
    setData(fields);
  }, [fields]);

  const submitHandler = () => {
    onSumbit(data);
  };

  return (
    <Box>
      {data.map((item) => {
        return (
          <Box key={item.attr.id}>
            <Box>{item.attr.name}</Box>
            {item.values.map((value) => (
              <CreateForm
                data-test-id="admin-form"
                onChangeHandler={formItemChangeHandler}
                item={{
                  editable: true,
                  prop_name: `${item.attr.id}_${value.id}`,
                  input_type: "switch",
                  field_name: value.name,
                }}
                key={value.id}
                error={""}
                value={value.selected ?? false}
              />
            ))}
          </Box>
        );
      })}
      <Buttons>
        <Button label="Sačuvaj" onClick={submitHandler} variant="contained" />
      </Buttons>
    </Box>
  );
};

export default VariationForm;
