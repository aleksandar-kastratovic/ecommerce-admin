import React from "react";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

const TextBoxSingle = ({
    name = "",
    label = "",
    value = "",
    description = "",
    required = false,
    width = "100%",
    margin = "0",
    placeholder = "",
    size = "small",
    fontWeight = "normal",
    error = "",
    saveIcon = "check_circle",
    cancelIcon = "cancel",
    onChange = () => {},
    onSaveClick = () => {},
    onCancelClick = () => {},
}) => {
    // reusable component for individual input fields that have actions save and cancel
    return (
        <FormControl
            sx={{
                width: width,
                margin: margin,
            }}
        >
            <FormLabel
                required={required}
                sx={{
                    fontWeight: fontWeight,
                }}
            >
                {label}
            </FormLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                    name={name}
                    size={size}
                    value={value ? value : ""}
                    error={!!error}
                    placeholder={placeholder}
                    onChange={onChange}
                    sx={{
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                    }}
                    helperText={error?.content ? error.content : description}
                />
                <IconButton onClick={onSaveClick} aria-label="plus" style={{ marginTop: 15 }}>
                    {/* <AddCircleOutlineIcon fontSize="inherit" /> */}
                    <Icon>{saveIcon}</Icon>
                </IconButton>
                <IconButton onClick={onCancelClick} aria-label="minus" style={{ marginTop: 15 }}>
                    <Icon>{cancelIcon}</Icon>
                </IconButton>
            </div>
        </FormControl>
    );
};

export default TextBoxSingle;
