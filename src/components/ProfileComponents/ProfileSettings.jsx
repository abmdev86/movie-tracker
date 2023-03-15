import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useContext } from "react";
import { AppModeContext } from "../../contexts/AppThemeProvider";
import { UserContext } from "../../contexts/FirebaseAuthContext";

export default function ProfileSettings() {
    const colorMode = useContext(AppModeContext);
    const theme = useTheme();
    const { deleteCurrentUser, auth } = useContext(UserContext);

    const [expanded, setExpanded] = useState(false);
    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            console.log('confirmed deletion of ', auth.currentUser);
            deleteCurrentUser(auth.currentUser);
        }
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1bh-header"
                    aria-controls="panel1-content"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        System Settings
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Toggle Dark mode, delete account...
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            Light/Dark mode
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={colorMode.toggleColorMode}>
                                Toggle {theme.palette.mode === "light" ? "dark" : "light"} mode
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>

            </Accordion>
            <Accordion expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}

            >
                <AccordionSummary
                    id="panel2bh-header"
                    aria-controls="panel2-content"
                    expandIcon={<ExpandMoreIcon />}>
                    Account Settings
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            Delete Account
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={handleDeleteAccount} color='danger' >
                                Delete Account
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
