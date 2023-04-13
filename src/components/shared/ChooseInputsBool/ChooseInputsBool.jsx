import Box from "@mui/material/Box";
import scss from "./ChooseInputsBool.module.scss";

const ChooseInputsBool = (props) => {
  return (
    <>
      <Box className={props.className}>
        {props.textStart} <span className={scss.span}> {props.fields.condition} </span> {props.textEnd} <span className={scss.span}> {props.fields.value} </span>:
      </Box>
    </>
  );
};

export default ChooseInputsBool;
