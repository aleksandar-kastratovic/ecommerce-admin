import React, { useState, useEffect } from "react";
import fields from "./fields.json";

import Paper from "@mui/material/Paper";
import TextBox from "../../components/shared/TextBox/TextBox";
import ListTable from "../../components/shared/ListTable/ListTable";
import TabsLayout from "../../components/shared/Layout/TabsLayout/TabsLayout";
import DetailsForm from "./DetailsForm/DetailsForm";

import styles from "./B2Bsettings.module.scss";
import { flatten } from "lodash";

import mockData from "./mockData.json";

const B2Bsettings = ({ history }) => {
  const init = {
    id: null,
    name: "",
    b2b: "",
    image_logo: "",
  };
  // Main component with all frontend logic
  // Please use destructuring
  // Since on a project is not used strong type(for example typescript or even proptypes - deprecated)
  // it is recommended for all properties to give an initial value
  // In that way if you don't receive value app will not break and all developers will know what type to expect number, string or object, arr etc.
  const [b2bconfig, setB2bconfig] = useState(init);

  const [selectedData, setSelectedData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  const formItemChangeHandler = (event, data) => {
    console.log(event, data);
  };

  const handleRowClick = (id) => () => {
    setSelectedData(selectedData === id ? null : id);
    handleTabChange(null, 1);
    const findDetails = mockData.find((element) => element.id === id);
    setB2bconfig(findDetails);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCreateNew = (e, data) => {
    handleTabChange(null, 1);
    setB2bconfig(init);
  };

  const handleBackToList = (e, data) => {
    handleTabChange(null, 0);
    setB2bconfig(init);
  };

  return (
    <>
      <Paper elevation={0} className={styles.paperStyle}>
        <TabsLayout
          listTitle="Lista"
          detailsTitle="Detalji"
          handleCreateNew={handleCreateNew}
          handleBackToList={handleBackToList}
          list={
            <>
              <TextBox
                width="25%"
                label="Pretraga"
                placeholder="Pretrazite proizvode"
                fontWeight="bold"
              />
              <ListTable
                fields={flatten(fields).filter(
                  ({ inMainTable }) => inMainTable
                )}
                data={mockData}
                handleRowClick={handleRowClick}
              />
            </>
          }
          details={
            <DetailsForm
              fields={fields.filter(({ inDetails }) => inDetails)}
              formItemChangeHandler={formItemChangeHandler}
              b2bconfig={b2bconfig}
            />
          }
          selectedData={selectedData}
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
        />
      </Paper>
    </>
  );
};

export default B2Bsettings;
