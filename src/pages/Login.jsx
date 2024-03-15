import "../css/auth.css"; // Keep your existing CSS if needed
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";



const Login = () => {

  const {user, loginUser} = useAuth()
  const navigate = useNavigate()

  const loginForm = useRef(null)


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (user){
      navigate('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const userInfo = {email, password}

    loginUser(userInfo)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>  
    <Box
      sx={{
        bgcolor: 'background.paper', // Use theme colors
        boxShadow: 1, // Add subtle shadow
        borderRadius: 2, // Slightly rounded corners
        p: 4, // Inner padding
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Sign In
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container spacing={2}>  
          <Grid item xs={6}> 
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}> 
            <Link to={"/register"} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  )
}

export default Login
