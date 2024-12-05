import { ImageList, ImageListItem, Typography } from "@mui/material";

const ImageViewer = ({ label, value }) => {
    if (!value) return <></>;

    return (
        <>
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                <strong>{label}:</strong>
            </Typography>
            <ImageList sx={{ width: "100%", height: "auto", m: 0 }} cols={3}>
                {value.map((image) => (
                    <ImageListItem key={image}>
                        <img srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} src={`${image}?w=164&h=164&fit=crop&auto=format`} loading="lazy" />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};

export default ImageViewer;
