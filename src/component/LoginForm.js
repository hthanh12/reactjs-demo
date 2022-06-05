import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
const servers = [
  {id:1, name:'DEV', link:process.env.REACT_APP_LINK_IWS_DEV},
  {id:2, name:'STAGING', link:process.env.REACT_APP_LINK_IWS_STAGING},
]
const userDetault = {
  email: process.env.REACT_APP_USER_IWS,
  password: process.env.REACT_APP_PWD_IWS,
}
console.log("🚀 ~ file: LoginForm.js ~ line 28 ~ userDetault", userDetault)
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/hthanh12">
      Thanh Uchiha - Team WRF 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginForm() {
  const [server, setServer] = React.useState(servers[0]);

  const handleChange = (event) => {
    let findSever = servers.find((o)=> o.id*1 === event.target.value*1)
    console.log(findSever);
    setServer(findSever);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let dataLogin =JSON.stringify({
      email: data.get('email'),
      password: data.get('password'),
    })
    console.log(dataLogin)
    const link = servers.find((o)=> o.id*1 === data.get('server')*1).link

    var config = {
      method: 'post',
      url: link+'/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dataLogin
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      alert('Nhập sai mật khẩu hoặc tài khoản rồi bạn eiiiiiiiiiiiiiiiii')
      console.log(error);
    });


  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://media.discordapp.net/attachments/752362298831667332/983121266842173530/QR.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                defaultValue={userDetault.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                defaultValue={userDetault.password}
              />
              <Box sx={{ minWidth: 120,mt: 1  }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Sever</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={server.id ?? ''}
                        label="server"
                        onChange={handleChange}
                        name="server"
                      >
                        {
                          servers.map((server)=> <MenuItem key={server.id} value={server.id}> {server.name}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Box>
{/*               
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
