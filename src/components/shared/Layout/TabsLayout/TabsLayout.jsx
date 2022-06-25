import React, { useState } from "react";

// material-ui components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import styles from "./TabsLayout.module.scss";

// The old layout type is not used anymore. It is here just because if we decide to go back to this kind of layout.
const TabsLayout = ({
  listTitle = "",
  detailsTitle = "",
  list = {},
  details = {},
  handleTabChange = () => {},
  selectedTab,
  handleCreateNew = () => {},
  handleBackToList = () => {},
}) => {
  // Note you can not just add a button or other element in tabs,
  // because tabs re-render all components and wrap them, you will
  // get an console error that doesnt say much and it will not be clear for you what is wrong.
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  const ButtonInTabs = ({ className, onClick, children }) => {
    return (
      <Button
        variant="contained"
        className={className}
        onClick={onClick}
        children={children}
      />
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          className={styles.tabs}
          TabIndicatorProps={{
            style: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Tab
            className={
              selectedTab === 0 ? styles.tabsActive : styles.tabsPasive
            }
            label={listTitle}
            disabled={selectedTab === 1 ? true : false}
          />
          <Tab
            className={
              selectedTab === 1 ? styles.tabsActive : styles.tabsPasive
            }
            label={detailsTitle}
          />
          {selectedTab === 0 ? (
            <ButtonInTabs
              className={styles.tabsBtnCreate}
              onClick={handleCreateNew}
            >
              Kreiraj novi
              <AddIcon />
            </ButtonInTabs>
          ) : (
            <ButtonInTabs
              className={styles.tabsBtnBack}
              onClick={handleBackToList}
            >
              Nazad
              <KeyboardReturnIcon />
            </ButtonInTabs>
          )}
        </Tabs>
      </Box>
      <Paper elevation={0}>
        <TabPanel value={selectedTab} index={0}>
          {list}
        </TabPanel>
      </Paper>
      <Paper elevation={0}>
        <TabPanel value={selectedTab} index={1}>
          {details}
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default TabsLayout;
