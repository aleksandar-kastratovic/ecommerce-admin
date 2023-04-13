import React from "react";

import Box from "@mui/material/Box";


/** Standardized grid with 12 columns. */
const Grid12 = ({ children }) => (
  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
    {children}
  </Box>
)

export default Grid12
