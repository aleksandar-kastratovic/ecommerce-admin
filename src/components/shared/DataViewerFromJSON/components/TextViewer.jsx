import { Typography } from "@mui/material";

const TextViewer = ({ label, value }) => {

    if (!value || value.length === 0) return <></>;

    return (
        <Typography variant="body1" sx={{ mt: 2 }}>
            <strong style={{ marginRight: "12px", width: "100px", display: "inline-block" }}>{label}:</strong>
            {value}
        </Typography>
    );
};

export default TextViewer;
