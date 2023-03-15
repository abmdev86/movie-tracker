import StarRateIcon from "@mui/icons-material/StarRate";

const GetRatingIcons = ({ count }) => {
    switch (count) {
        case 2: {
            return (
                <>
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                </>
            );
        }
        case 3: {
            return (
                <>
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                </>
            );
        }
        case 4: {
            return (
                <>
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                </>
            );
        }
        case 5: {
            return (
                <>
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                    <StarRateIcon sx={{ color: "#FFD700" }} />
                </>
            );
        }
        default: {
            return <StarRateIcon sx={{ color: "#FFD700" }} />;
        }
    }
};

export default function RatingDisplay({ rating }) {
    return <GetRatingIcons count={rating} />;
}
