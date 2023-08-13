import React from "react";
import { Grid, Skeleton } from "@mui/material";

const GallerySkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ height: "200px" }}>
        <Skeleton
          width="100%"
          sx={{
            height: "100%",
            transformOrigin: "none !important",
            transform: "none !important",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={6} sm={3} key={item}>
              <Skeleton
                variant="rectangular"
                height={160}
                sx={{ borderRadius: "4px" }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid >
  );
};

export default GallerySkeleton;