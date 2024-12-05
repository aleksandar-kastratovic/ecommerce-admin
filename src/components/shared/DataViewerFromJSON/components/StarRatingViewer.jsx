import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const StarRatingViewer = ({ mark }) => {
    const numericMark = Number(mark);

    if (isNaN(numericMark)) {
        return (
            <Typography variant="body1" sx={{ mt: 2 }}>
                <strong style={{ marginRight: "12px", width: "100px", display: "inline-block" }}>Ocena:</strong>
                Nema dostupnih ocena
            </Typography>
        );
    }

    const fullStars = Math.floor(numericMark);
    const hasHalfStar = numericMark % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <Typography variant="body1" sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <strong style={{ marginRight: "12px", width: "100px", display: "inline-block" }}>Ocena:</strong>
            {Array(fullStars)
                .fill()
                .map((_, index) => (
                    <StarIcon key={`full-${index}`} style={{ color: "#FFD700" }} />
                ))}
            {hasHalfStar && <StarHalfIcon style={{ color: "#FFD700" }} />}
            {Array(emptyStars)
                .fill()
                .map((_, index) => (
                    <StarOutlineIcon key={`empty-${index}`} style={{ color: "#FFD700" }} />
                ))}
            <span style={{ marginLeft: "12px" }}>{numericMark.toFixed(1)}</span>
        </Typography>
    );
};

export default StarRatingViewer;
