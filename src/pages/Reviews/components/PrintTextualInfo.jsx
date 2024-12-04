import { ImageList, ImageListItem, Typography } from "@mui/material";
import ShowRating from "./ShowRating";

const PrintTextualInfo = ({ mainTitle, product_name, author_name, mark, comment, created_at, images, videos }) => {
    return (
        <>
            <Typography variant="h5">{mainTitle}</Typography>

            {product_name && (
                <Typography variant="body1" sx={{ mt: 5 }}>
                    <strong style={{ marginRight: "12px", width: "100px", display: "inline-block" }}>Proizvod:</strong>
                    {product_name}
                </Typography>
            )}

            {author_name && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong style={{ marginRight: "12px", width: "100px", display: "inline-block" }}>Autor:</strong>
                    {author_name}
                </Typography>
            )}

            {mark && <ShowRating mark={mark} />}

            {comment && (
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
                        Komentar:
                    </strong>
                    <span
                        style={{
                            wordBreak: "break-word",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: comment,
                        }}
                    />
                </Typography>
            )}

            {created_at && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong style={{ marginRight: "12px", width: "100px", display: "inline-block" }}>Datum:</strong>
                    {created_at}
                </Typography>
            )}

            {images && images.urls && (
                <>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                        <strong>Slike:</strong>
                    </Typography>
                    <ImageList sx={{ width: "100%", height: "auto", m: 0 }} cols={3}>
                        {images.urls.map((image) => (
                            <ImageListItem key={image}>
                                <img srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} src={`${image}?w=164&h=164&fit=crop&auto=format`} loading="lazy" />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </>
            )}

            {videos && videos.urls && (
                <>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                        <strong>Video:</strong>
                    </Typography>
                    <ImageList sx={{ width: "100%", height: "auto", m: 0 }} cols={3} rowHeight={181}>
                        {videos.urls.map((video) => (
                            <video key={video} width="181" controls src={video} loading="lazy" />
                        ))}
                    </ImageList>
                </>
            )}
        </>
    );
};

export default PrintTextualInfo;
