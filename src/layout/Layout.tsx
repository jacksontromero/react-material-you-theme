import { FC, useContext } from "react";
import { styled, useTheme } from '@mui/material/styles';

import { AppBar, Toolbar, Box, Container, SxProps, Typography, Theme, IconButton, Badge, Button } from "@mui/material";

import ElevationToolbar from "../components/ElevationToolbar";

import ColorIcon from '@mui/icons-material/ColorLensTwoTone';
import DarkIcon from '@mui/icons-material/DarkModeTwoTone';
import LightIcon from '@mui/icons-material/LightModeTwoTone';
import MailIcon from '@mui/icons-material/MailTwoTone';
import NotificationIcon from '@mui/icons-material/NotificationsTwoTone';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';
import MenuIcon from '@mui/icons-material/MenuTwoTone';

import { ThemeModeContext } from '../theme/context/ThemeModeContext';
import { ThemeSchemeContext } from '../theme/context/ThemeSchemeContext';
import { Link } from "react-router-dom";

interface LayoutProps {
    window?: () => Window;
    children: React.ReactElement;
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Layout: FC<LayoutProps> = ({ children, window }) => {

    const boxContainerStyle: SxProps<Theme> = {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
    };

    const { themeMode, toggleThemeMode, resetThemeMode } = useContext(ThemeModeContext);
    const { generateThemeScheme, resetThemeScheme } = useContext(ThemeSchemeContext);

    const changeThemeMode = () => toggleThemeMode();

    const changeThemeScheme = async () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        generateThemeScheme(randomColor);
    };

    const reset = () => {
        resetThemeMode();
        resetThemeScheme();
        generateThemeScheme("#6750A4");
        //generateThemeScheme("#293064");
        //generateThemeScheme("#3a691e");
    };

    return <>
        <ElevationToolbar window={window} >
            <AppBar enableColorOnDark position="fixed" color="primary">
                <Toolbar>
                    <IconButton color="inherit" size="large" edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Material You
                    </Typography>
                    <Button component={Link} to='/Components' color="inherit" >
                        Components
                    </Button>
                    <Button component={Link} to='/ThemeData' color="inherit">
                        Theme Data
                    </Button>
                    <IconButton color="inherit" size="large" title="1 Message">
                        <Badge badgeContent="1" color="primary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" size="large" title="4 Notifications">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationIcon />
                        </Badge>
                    </IconButton>
                    <IconButton size='large' color='inherit' title='Change Color' onClick={changeThemeScheme}>
                        <ColorIcon />
                    </IconButton>
                    <IconButton size='large' color='inherit' title='Switch Theme' onClick={changeThemeMode}>
                        {themeMode == 'light' ? <DarkIcon /> : <LightIcon />}
                    </IconButton>
                    <IconButton size='large' color='inherit' title='Reset Theme' onClick={reset}>
                        <RestartAltTwoToneIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </ElevationToolbar>
        <Offset />
        <Box sx={boxContainerStyle}>
            <Container maxWidth="lg">
                {children}
            </Container>
        </Box>
    </>
};

export default Layout;