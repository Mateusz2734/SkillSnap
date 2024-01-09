import { useColorScheme } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ColorSchemeToggle = () => {
    const { mode, setMode } = useColorScheme();

    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="neutral"

            onClick={() => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
            }}
            sx={{
                '& > *:first-of-type': {
                    display: mode === 'dark' ? 'none' : 'initial',
                },
                '& > *:last-of-type': {
                    display: mode === 'light' ? 'none' : 'initial',
                },
            }}
        >
            <DarkModeRoundedIcon />
            <LightModeIcon />
        </IconButton>
    );
};