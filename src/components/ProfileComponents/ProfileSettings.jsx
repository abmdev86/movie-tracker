import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useContext } from "react";
import { AppModeContext } from "../../contexts/AppThemeProvider";


export default function ProfileSettings() {
    const colorMode = useContext(AppModeContext);
    const theme = useTheme();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);

    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1bh-header"
                    aria-controls='panel1-content'
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        System Settings
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Toggle Dark mode, delete account...
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>Light/Dark mode</Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={colorMode.toggleColorMode}>Toggle {theme.palette.mode === 'light' ? 'dark' : 'light'} mode</Button>

                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}