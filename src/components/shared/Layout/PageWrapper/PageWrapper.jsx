import Paper from "@mui/material/Paper";
import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import scss from "./PageWrapper.module.scss";

const PageWrapper = ({ title, back, children, actions }) => (
  <Paper elevation={0} className={scss.wrapper}>
    {/* Page title */}
    {title && <PageTitle title={title} back={back} actions={actions} />}

    {/* Page contents */}
    {children}
  </Paper>
);

export default PageWrapper;
