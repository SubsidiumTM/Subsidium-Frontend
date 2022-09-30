// Materials UI
// import * as React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';

// React
import React, { useState, useEffect } from "react";

// Amplify
import { Auth } from 'aws-amplify';
import { List, ListItem } from '@mui/material';

// Template de MUI
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Amplify Sign Up Function
async function signUp(username, password, email, name, familyName) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                name,           
                familyName
            },
            autoSignIn: { // optional - enables auto sign in after user is confirmed
                enabled: false,
            }
        });
        console.log(user);
        return true;
    } catch (error) {
        console.log('error signing up:', error);
        return false;
    }
}

const theme = createTheme();

export default function SignUpSide() {

    // Submit controller
    const handleSubmit = (event) => {
        event.preventDefault();
        if (registeredState === "notRegistered") {
            handleRegister(event)
        }
        else if (registeredState === "registered") {
            handleVerify(event)
        }
    }

    // Register Controller
    // Adds user to registered users
    const handleRegister = (event) => {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        console.log({
          username: data.get('username'),
          name: data.get('username'),
          familyName: data.get('surname'),
          email: data.get('email'),
          password: data.get('password'),
        });

        setRegisteredState("registered");
      };


    // Verification controller
    // Verifies account with code received via email
    const handleVerify = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        code: data.get('code')
        });
    };

  // State to call functions and update page
  const [registeredState, setRegisteredState] = useState("notRegistered");

  // Function to change between the inputs on the form
  function bottomForm (state) {
    // Show "Registrame" button if not registered allready
    if (state === "notRegistered") {
        return (
          <>
            <Typography component="h1" variant="h5">
              Registro
            </Typography>
            <Typography component="p" variant="caption">
              Complete los campos
            </Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de Usuario"
            name="username"
            autoComplete="username"
            autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre(s)"
              name="name"
              autoComplete="name"
              autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Apellido(s)"
              name="surname"
              autoComplete="surname"
              autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              // type="password"
              id="password"
              autoComplete="current-password" />
            <List>
              La contraseña debe seguir lo siguiente:

              <ListItem><Typography component="p" variant="caption">
                - Longitud mínima de 12 
              </Typography></ListItem>

              <ListItem><Typography component="p" variant="caption">
                - Incluir letras minúsculas, mayúsculas y números
              </Typography></ListItem>

              <ListItem><Typography component="p" variant="caption">
                - Al menos un caractér especial (_,$,%,ect.)
              </Typography></ListItem>

            </List>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
              Registrarme
            </Button></>
        )
    }
    // Show textfield of verification code and verify button
    else if (state === "registered") {
        return (
          <>
            <Typography component="h1" variant="h5">
              Registro exitoso
            </Typography>
            <Typography component="p" variant="caption">
              Se ha enviado un código de verificación a su correo, por favor escribalo a continuación.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Código de Verificación"
              name="code"
              autoComplete="code"
              autoFocus />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
              Verificar
            </Button>
          </>
        )
    }
  }

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
            backgroundImage: 'url(https://source.unsplash.com/random)',
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              {bottomForm(registeredState)}

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}