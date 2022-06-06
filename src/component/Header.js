import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

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

    let onClickHandle = () => {
        localStorage.removeItem('iws')
        localStorage.removeItem('env')
        setEnv(null)
        window.location.reload(true);
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
                    </Typography>
                    {env} - {iws.id} - {iws.name}
                    <Button color="inherit" onClick={onClickHandle}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
