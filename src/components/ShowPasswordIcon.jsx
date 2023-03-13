import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment } from "@mui/material";

const ShowPasswordIcon = ({ isVisible, handleIsVisible }) => {
    return (
        <InputAdornment position="end">
            <IconButton onClick={handleIsVisible}>
                {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
        </InputAdornment>
    );
};

export default ShowPasswordIcon;