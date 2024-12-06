import { Alert, Typography } from "@mui/material";

import { StarRatingViewer, HTMLviewer, ImageViewer, TextViewer, VideoViewer, DateViewer } from "./components";

const SimpleDataViewer = ({ data, mainTitle }) => {
    const renderComponentByType = (item) => {
        const { type, value, label, id } = item;

        switch (type) {
            case "text":
                return <TextViewer key={id} label={label} value={value} />;
            case "html":
                return <HTMLviewer key={id} label={label} value={value} />;
            case "mark":
                return value && value !== null && <StarRatingViewer key={id} mark={value} />;
            case "date":
                return <DateViewer key={id} label={label} value={value} />;
            case "images":
                return <ImageViewer key={id} type={type} label={label} value={value} />;
            case "videos":
                return <VideoViewer key={id} type={type} label={label} value={value} />;
        }
    };

    return (
        <>
            <Typography variant="h5" sx={{ mb: 5 }}>
                {mainTitle}
            </Typography>

            {data.map((item) => (
                <div key={item.id} style={{ marginBottom: "16px" }}>
                    {renderComponentByType(item)}
                </div>
            ))}
        </>
    );
};

export default SimpleDataViewer;
