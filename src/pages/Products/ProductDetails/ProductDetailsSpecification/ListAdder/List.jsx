import { Button } from "@mui/material";
import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../../store/auth-contex";
import ListItem from "./ListItem";

import styles from "./List.module.scss";

import chooseSetForm from "../chooseSetForm.json";
import { getProductSpecsSetDDL } from "../../../services";

const set = { setId: 0, setFormFields: chooseSetForm, selectedSet: 1 };

const List = ({ onDelete = () => {} }) => {
  const [fields, setFields] = useState([set]);
  const { user } = useContext(AuthContext);
  const [chooseSet, setChooseSet] = useState(chooseSetForm[0]);

  const getSetDDL = async () => {
    try {
      let response = await getProductSpecsSetDDL(user.access_token);
      setChooseSet({ ...chooseSet, options: response?.data?.payload });
    } catch (error) {
      console.warn(error);
    }
  };

  const deleteHandler = async (id, dataId) => {
    /*  if (dataId !== null) {
      try {
        await onDelete(user.access_token, dataId);
      } catch (error) {
        console.warn(error);
      }
    } */
    let newFields = [...fields.slice(0, id), ...fields.slice(id + 1)];
    setFields([...newFields]);
  };

  const addFieldHandler = () => {
    setFields([...fields, { ...set, setId: fields.length }]);
  };

  useEffect(() => {
    setFields([]);
    getSetDDL();
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.buttonsHolder}>
        <Button onClick={addFieldHandler} className={styles.buttonPrimary}>
          Add field
        </Button>
      </div>
      {fields.map((field, index) => {
        return (
          <ListItem
            key={field.setId ? field.setId : `${index}new`}
            setId={field.setId}
            index={index}
            onDelete={deleteHandler}
            setFormFields={[chooseSet]}
            selectedSet={field.selectedSet}
          />
        );
      })}
    </div>
  );
};

export default List;
