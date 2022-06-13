import { useState, useEffect } from 'react';
import { AppBar, IconButton, Box, Toolbar, Typography, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout'
export default function ButtonAppBar() {
    const navigate = useNavigate();

    let iws = JSON.parse(localStorage.getItem('iws'))
    let [env, setEnv] = useState(JSON.parse(localStorage.getItem('env')))
    useEffect(() => {
        if (env) {
            window.onbeforeunload = function () {
                return true;
            };
        }

        return () => {
            window.onbeforeunload = null;
        };
    }, [env]);

    let onClickHandleLogout = () => {
        localStorage.removeItem('iws')
        localStorage.removeItem('env')
        setEnv(null)
        window.location.reload(true);
        navigate(`/`)
    }

    let onClickHandleHome = () => {
        navigate(`/`)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button variant="text" sx={{ color: 'white' }} onClick={onClickHandleHome}>Home</Button>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {env} - {iws.id} - {iws.name}
                    </Typography>
                    <Button color="inherit" onClick={onClickHandleLogout} endIcon={<LogoutIcon />}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
