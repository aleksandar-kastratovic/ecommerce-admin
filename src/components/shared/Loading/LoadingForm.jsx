import { Skeleton, Stack } from "@mui/material";

const LoadingForm = ({ fields = 0 }) => {
  return (
    <Stack>
      {Array(+fields).map(() => {
        return <Skeleton variant="text" height={60} key={key} />;
      })}
    </Stack>
  );
};

export default LoadingForm;
