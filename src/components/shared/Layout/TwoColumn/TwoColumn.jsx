import React from "react";

// material-ui components
import Box from "@mui/material/Box";

const TwoColumn = ({ left = {}, right = {} }) => {
  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 3">{left}</Box>
        <Box gridColumn="span 9">
          <Box component="form" autoComplete="off">
            {right}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TwoColumn;
