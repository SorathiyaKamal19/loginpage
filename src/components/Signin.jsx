import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Validate } from "./Validation";
import {  IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import useAuth
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext
  const [userInput, setUserInput] = useState({
      username: "",
      password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
  };

  const onhandleChange = (event) => {
      const { name, value } = event.target;
      setUserInput((prevInput) => ({
          ...prevInput,
          [name]: value,
      }));
      setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
      }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = Validate(userInput);

    if (Object.keys(newErrors).length === 0) {
        try {
            const response = await axios.get("http://localhost:3000/users", {
                params: {
                    username: userInput.username
                },
            });

            // Check if the user exists
            const user = response.data.find(user => user.username === userInput.username);

            if (!user) {
                // If the username doesn't exist
                setErrors({ username: "Username not found" });
                toast("Username not found!"); // Alert for invalid username
            } else {
                // If the user exists, check if the password matches
                if (user.password !== userInput.password) {
                    setErrors({ password: "Incorrect password" });
                    toast("Incorrect password!"); // Alert for incorrect password
                } else {
                  toast("Login successful!"); 

                  setTimeout(() =>{

                    login(); // Set isAuthenticated to true
                    toast("Login Successfull")
                    navigate("/dashboard"); // Redirect to the dashboard
                  },2000)
                }
            }
        } catch (error) {
            console.error("Login Failed:", error.message);
            setErrors({ server: "Server error, please try again later" });
        }
    } else {
        setErrors(newErrors); // Handle other validation errors
    }
};
  
  return (
      <ThemeProvider theme={createTheme()}>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
            <ToastContainer/>
              <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Login Page
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <TextField
                                  name="username"
                                  type="string"
                                  value={userInput.username}
                                  onChange={onhandleChange}
                                  label="userName"
                                  required
                                  fullWidth
                                  error={!!errors.username}
                                  helperText={errors.username}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  name="password"
                                  value={userInput.password}
                                  onChange={onhandleChange}
                                  label="Password"
                                  type={showPassword ? "text" : "password"}
                                  required
                                  fullWidth
                                  error={!!errors.password}
                                  helperText={errors.password}
                                  InputProps={{
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <IconButton onClick={handleTogglePasswordVisibility}>
                                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                          </InputAdornment>
                                      ),
                                  }}
                              />
                          </Grid>
                      </Grid>
                      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                          Login
                      </Button>
                      <Link to="/register">Dont have an Account? Register Here</Link>
                  </Box>
              </Box>
          </Container>
      </ThemeProvider>
  );
};

export default Signin;



