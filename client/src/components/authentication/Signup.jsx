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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const theme = createTheme(); 

export default function Signup() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const navigate = useNavigate();

  // const history = useHistory();


  const postDetails = (pics) => {
    setPicLoading(true);
    console.log(pics);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dzbdafyhk");
      fetch("https://api.cloudinary.com/v1_1/dzbdafyhk/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {

      setPicLoading(false);
      return;
    }
  };



  const submitHandler = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate('/chats');

    } catch (error) {
      setPicLoading(false);
      console.error("Login failed:", error);

    }
  };

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
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => { setName(e.target.value) }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => { setEmail(e.target.value) }}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => { setPassword(e.target.value) }}

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-cpassword"
                  onChange={(e) => { setConfirmpassword(e.target.value) }}

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pic"
                  label=""
                  type="file"
                  accept="image/*"
                  id="pic"
                  autoComplete="new-pic"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitHandler}
            >
              Sign Up
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