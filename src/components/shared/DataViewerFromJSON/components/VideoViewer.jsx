import { ImageList, Typography } from "@mui/material";

const VideoViewer = ({ label, value }) => {
    if (!value || value.length === 0) return <></>;
    return (
        <>
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                <strong>{label}:</strong>
            </Typography>
            <ImageList sx={{ width: "100%", height: "auto", m: 0 }} cols={3} rowHeight={181}>
                {value.map((video) => (
                    <video key={video} width="181" controls src={video} loading="lazy" />
                ))}
            </ImageList>
        </>
    );
};

export default VideoViewer;
