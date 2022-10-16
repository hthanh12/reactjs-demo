import { useState } from "react";
import {
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { TEAM_MEMBER, TEAM_NAME, SERVERS, VERSION } from "../utils/data";

const userDetault = {
  email: process.env.REACT_APP_USER_IWS,
  password: process.env.REACT_APP_PWD_IWS,
};
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/hthanh12">
        Thành Uchiha - {TEAM_NAME}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

let getRandomBackground = () => {
  let array = [
    {
      id: 1,
      name: "team",
      url: "https://media.discordapp.net/attachments/752362298831667332/983121266842173530/QR.jpg",
    },
  ];

  return array[Math.floor(Math.random() * array.length)].url;
};
const theme = createTheme();

export default function LoginForm() {
  const [server, setServer] = useState(SERVERS[0]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    let findSever = SERVERS.find((o) => o.id * 1 === event.target.value * 1);
    console.log(findSever);
    setServer(findSever);
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let dataLogin = JSON.stringify({
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log(dataLogin);
    const findServer = SERVERS.find((o) => o.id * 1 === data.get("server") * 1);

    var config = {
      method: "post",
      url: findServer.link + "/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataLogin,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        localStorage.setItem("iws", JSON.stringify(response.data));
        localStorage.setItem("env", JSON.stringify(findServer.name));
        setLoading(false);
        window.location.reload(true);
      })
      .catch(function (error) {
        alert(
          "Nhập sai mật khẩu hoặc tài khoản rồi bạn eiiiiiiiiiiiiiiiii\n" +
            error.message
        );
        localStorage.setItem("iws", null);
        setLoading(false);
      });
  };
  let urlBG = getRandomBackground();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${urlBG})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Stack direction="row" spacing={2}>
              {TEAM_MEMBER.map((member) => (
                <Avatar
                  key={member.id}
                  alt={member.name}
                  src={member.avt}
                ></Avatar>
              ))}
            </Stack>
            <Typography component="h1" variant="h5">
              {TEAM_NAME} - HIP HOP NEVER DIE
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
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
              <Box sx={{ minWidth: 120, mt: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Sever
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={server.id ?? ""}
                    label="server"
                    onChange={handleChange}
                    name="server"
                  >
                    {SERVERS.map((server) => (
                      <MenuItem key={server.id} value={server.id}>
                        {" "}
                        {server.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/*               
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>

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
              <h5 sx={{ mt: 5 }}>Version: {VERSION}</h5>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
