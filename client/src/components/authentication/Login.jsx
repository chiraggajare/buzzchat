import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Login() {

  const [show, setShow] = useState(false);
  //const handleClick = () => setShow(!show);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();



  const handleGuestLogin = () => {
    // Set the desired email and password values 
    setEmail('michaelscott@dundermifflin.com');
    setPassword('bankruptcy');
  };


  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      return;
    }
  
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
  
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
  
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      // Display an error message to the user
    }
  }





  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white',
            padding: 5,
            borderRadius: 7,
            boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Avatar sx={{ bgcolor: '#6200ea' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="black">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => { setEmail(e.target.value) }}
                  value={email}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="pass"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />

              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              onClick={submitHandler}
            >
              Login
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2, bgcolor: 'red   ' }}
              onClick={handleGuestLogin}
            >
              Guest Login
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
