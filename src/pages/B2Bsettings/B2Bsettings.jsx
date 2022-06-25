import React from "react";

import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import ListTable from "../../components/shared/ListTable/ListTable";

import styles from "./B2Bsettings.module.scss";
import { flatten } from "lodash";
import fields from "./mainListFields.json";

import mockData from "./mockData.json";

const B2Bsettings = ({}) => {
  const init = {
    id: null,
    name: "",
    b2b: "",
    image_logo: "",
  };

  const navigate = useNavigate();
  // Main component with all frontend logic
  // Please use destructuring
  // Since on a project is not used strong type(for example typescript or even proptypes - deprecated)
  // it is recommended for all properties to give an initial value
  // In that way if you don't receive value app will not break and all developers will know what type to expect number, string or object, arr etc.

  const handleCreateNew = (e) => {
    // TODO handle create new
    console.log(e);
  };

  const handleEditClick = (id) => () => {
    navigate(`/B2B-settings/${id}`);
  };

  return (
    <>
      <Paper elevation={0} className={styles.paperStyle}>
        <ListTable
          title="B2B eCommerce podesavanje modula"
          fields={flatten(fields).filter(({ in_main_table }) => in_main_table)}
          data={mockData}
          handleEditClick={handleEditClick}
          handleCreateNew={handleCreateNew}
          showButton={false}
        />
      </Paper>
    </>
  );
};

export default B2Bsettings;
