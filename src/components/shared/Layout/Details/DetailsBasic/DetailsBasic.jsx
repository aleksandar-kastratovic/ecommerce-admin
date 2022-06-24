import React from "react";

// material-ui components
import Box from "@mui/material/Box";

const DetailsBasic = ({ list = {}, main = {} }) => {
  return (
    <Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 3">{list}</Box>
        <Box gridColumn="span 9">
          <Box>{main}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsBasic;
