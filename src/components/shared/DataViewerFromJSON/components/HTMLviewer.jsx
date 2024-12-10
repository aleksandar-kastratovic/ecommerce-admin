import { Typography } from "@mui/material";

const HTMLviewer = ({ label, value }) => {
    return (
        <Typography
            variant="body1"
            sx={{
                mt: 2,
                display: "flex",
                alignItems: "flex-start",
            }}
        >
            <strong
                style={{
                    marginRight: "12px",
                    width: "100px",
                    flexShrink: 0,
                }}
            >
                {label}:
            </strong>
            <span
                style={{
                    wordBreak: "break-word",
                }}
                dangerouslySetInnerHTML={{
                    __html: value,
                }}
            />
        </Typography>
    );
};

export default HTMLviewer;
