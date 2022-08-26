import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useState } from "react";

import groupForm from "../groupForm.json";
import CreateForm from "../../../../../components/shared/Form/CreateForm";
import { formatDate } from "../../../../../helpers/dateFormat";
import { Button } from "@mui/material";

const GroupField = ({ title = "", groupId, setId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [data, setData] = useState({});

  const isOpenToggle = () => {
    setIsOpen(!isOpen);
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

  useEffect(() => {
    if (open) {
      setFormFields(groupForm);
    }
  }, [open]);

  return (
    <Box>
      <div onClick={isOpenToggle}>
        {groupId}
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      {isOpen && (
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
                    value={
                      Array.isArray(item) && data
                        ? data[item.prop_name]
                        : data[item.prop_name]
                    }
                  />
                );
              })}
          <Button onClick={() => {}}>Sačuvaj</Button>
        </Box>
      )}
    </Box>
  );
};

export default GroupField;
