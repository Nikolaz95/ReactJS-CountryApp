import React, { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';


//import css
import "./Switcher.css"

//import  icons
import LightMode from "../../assets/icon-sun.png"
import DarkMode from "../../assets/icon-moon-phase.png"


const Switcher = () => {
    const [switchMode, setSwitchMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: switchMode ? 'light' : 'dark',
        },
    });

    const handleChange = (event) => {
        setSwitchMode(event.target.checked);
    };

    const labelText = switchMode ? 'Dark Mode' : 'Light Mode';

    // Effect to update data-theme attribute
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', switchMode ? 'dark' : 'light');
    }, [switchMode]);
    return (
        <ThemeProvider theme={theme}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={switchMode}
                            onChange={handleChange}
                            color="primary"
                        />
                    }
                    label={
                        <div className="switch-label">
                            {/* Display sun icon for light mode and moon for dark mode */}
                            <img
                                src={switchMode ? DarkMode : LightMode}
                                alt={switchMode ? 'Dark Mode' : 'Light Mode'}
                                className="mode-icon"
                            />
                            {labelText}
                        </div>
                    }
                />
            </FormGroup>
        </ThemeProvider>

    )
}

export default Switcher