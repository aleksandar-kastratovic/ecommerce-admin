import { Button } from "@mui/material";
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

  return (
    <div>
      <Button onClick={addFieldHandler}>Add field</Button>
      {fields.map((field, index) => {
        return (
          <ListItem
            key={field.id !== null ? field.id : index + "new"}
            data={field}
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
