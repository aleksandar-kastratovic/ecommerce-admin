import { Button } from "@mui/material";
import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-contex";
import ListItem from "./ListItem";

const List = ({
  listFields = [],
  formFields = [],
  init = {},
  onDelete = () => {},
  required = [],
  onSave = () => {},
}) => {
  const [fields, setFields] = useState(listFields);
  const { user } = useContext(AuthContext);

  const deleteHandler = async (id, dataId) => {
    if (dataId !== null) {
      try {
        await onDelete(user.access_token, dataId);
      } catch (error) {
        console.warn(error);
      }
    }
    let newFields = [...fields.slice(0, id), ...fields.slice(id + 1)];
    setFields([...newFields]);
  };

  const addFieldHandler = () => {
    setFields([...fields, init]);
  };

  useEffect(() => {
    setFields(listFields);
  }, []);

  return (
    <div>
      <Button onClick={addFieldHandler}>Add field</Button>
      {fields.map((field, index) => {
        return (
          <ListItem
            key={!isEmpty(field.id) ? field.id : `${index}new`}
            data={listFields[index] ?? init}
            index={index}
            onDelete={deleteHandler}
            saveData={onSave}
            required={required}
            formFields={formFields}
          />
        );
      })}
    </div>
  );
};

export default List;
