import { style } from "@mui/system";
import React, { useEffect, useState, useRef, createElement } from "react";
import useAPI from "../../../../api/api";
import Group from "./Group/Group";
import Row from "./Row/Row";
import { v4 } from "uuid";
import DeleteDialog from "../../../../components/shared/Dialogs/DeleteDialog";
import group_file from "./Group/group_file.json"
import row_file from "./Row/row_file.json"
import Buttons from "../../../../components/shared/Form/Buttons/Buttons";
import Button from "../../../../components/shared/Button/Button";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";

const Conditions = ({ campaignId }) => {
  const elementRef = useRef("");
  const [data, setData] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({ show: false });
  const [removeComponentId, setRemoveComponentId] = useState(null);

  const api = useAPI();
  const apiPath = "admin/campaigns-product-catalog/conditions";

  async function handleData() {
    await api
      .get(`${apiPath}/${campaignId}`)
      .then((response) => {
        setContentData(response?.payload);

      })
      .catch((error) => console.warn(error));
  }

  useEffect(() => {
    handleData();
  }, []);

  const setContentData = (data = []) => {
    // Ukoliko nema nista od podataka da uzme default vrednost
    if (!data.length) {
      data = [{ ...cloneDeep(group_file), id: v4() }];
    }
    setData(data);
  }

  const renderContent = (param_data) => {
    return <>{param_data.map((t_row) => {
      if (t_row?.type) {
        if (t_row.type === "group") {
          let rules = [];
          if (t_row.rules.length) {
            rules = renderContent(t_row.rules);
          }

          return <Group key={t_row.id} id={t_row.id} data={t_row} rules={rules} handleAddComponent={handleAddComponent} handleRemoveComponent={handleRemoveComponent}
          />;
        } else if (t_row.type === "row_select") {
          return <Row key={t_row.id} id={t_row.id} data={t_row} handleRemoveComponent={handleRemoveComponent} />;
        }
      } else {
        console.log("Nije definisan type za componenty");
        return null;
      }
    })}</>
  };

  function onSubmit() {
    api.post(apiPath, data)
      .then((response) => {
        setData({ ...data });
        toast.success("Uspešno!");
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
      });
  }

  function handleAddComponent(parentId, componentType) {
    let temp = addComponent(data, parentId, componentType);
    setContentData(temp);
  }

  const addComponent = (param_data, parentId, componentType) => {
    return param_data.map((t_row) => {
      if (t_row.id === parentId) {
        if (componentType === "group") {
          const newRules = [{ ...cloneDeep(group_file), id: v4() }];
          return { ...t_row, rules: [...t_row.rules, ...newRules] };
        } else if (componentType === "row_select") {
          let isLastSelected = true;
          for (let i = t_row.rules.length - 1; i >= 0; i++) {
            if (t_row.rules[i].type === "row_select") {
              console.log(t_row.rules);
              isLastSelected = t_row.rules[i].fields[t_row.rules[i].fields.length - 2].selected.id != null && t_row.rules[i].fields[t_row.rules[i].fields.length - 2].selected.id != 0;
              break;
            }
          }
          console.log(isLastSelected);
          if (!isLastSelected) {
            toast.warn("Selektujte sva input polja!");
            return t_row;
          }
          const newRules = [{ ...cloneDeep(row_file), id: v4() }];
          return { ...t_row, rules: [...t_row.rules, ...newRules] };
        }
      } else if (t_row.rules?.length > 0) {
        return { ...t_row, rules: addComponent(t_row.rules, parentId, componentType) };
      }

      return t_row;
    });
  };



  const handleRemoveComponentCancel = () => {
    setOpenDeleteDialog({ show: false });
    setRemoveComponentId(null);
  };

  const handleRemoveComponent = (id, componentType) => {
    if (id) {
      setOpenDeleteDialog({ show: true });
      setRemoveComponentId(id);
    } else {
      setRemoveComponentId(null);
    }
  }

  const handleRemoveComponentConfirm = () => {
    let temp = removeComponent(data, removeComponentId);
    setContentData(temp);
    // Reset dialog and remove id
    setRemoveComponentId(null);
    setOpenDeleteDialog({ show: false });
  }

  const removeComponent = (param_data, id) => {
    return param_data.filter((t_row) => {
      if (t_row.id === id) {
        // Return false to remove the item from the array
        return false;
      } else if (t_row.rules?.length > 0) {
        // Recursively call removeComponent on the "rules" array
        t_row.rules = removeComponent(t_row.rules, id);
        // Return true to keep the item in the array (since we modified it)
        return true;
      }

      // Return true to keep the item in the array
      return true;
    });
  };

  return (
    <>
      <div ref={elementRef} className="campaignConditionsBox" id="campaignConditionsBox">
        {renderContent(data)}
      </div>
      <Buttons>
        <Button label="Sačuvaj" variant="contained" onClick={onSubmit} />
      </Buttons>

      <DeleteDialog
        title=""
        handleCancel={handleRemoveComponentCancel}
        handleConfirm={handleRemoveComponentConfirm}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        nameOfButton="Obriši"
        deafultDeleteIcon={false}
      />
    </>
  );
};

export default Conditions;
