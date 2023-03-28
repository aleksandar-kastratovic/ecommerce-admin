import { Box } from "@mui/material";
import style from "./ChooseInputsBool.module.scss";

const ChooseInputsBool = (props) => {
    return (
        <>
            <Box className={props.className}>
                {props.textStart} <span className={style.span}> {props.fields.condition} </span> {props.textEnd} <span className={style.span}> {props.fields.value} </span>:
            </Box>
        </>
    );
};

export default ChooseInputsBool;
