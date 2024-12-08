import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import {  IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate()
    const [userInput,setUserInput]=useState({
        firstName: "",
        lastName:"",
        username:"",
        email: "",
        phone:"",
        password: "",
    })
    const [errors,setErrors]=useState("")
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
    


  const defaultTheme = createTheme();

  const onhandleChange = () =>{
    const { name, value, files } = event.target;
    const newValue = files ? files[0] : value;
    // console.log(`${name}:`, newValue);

    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: newValue,
    }));
    setErrors(" ")

  }
//   const handleDateChange = (date) => {
//     setUserInput((prevInput) => ({
//       ...prevInput,
//       dob: date,
//     }));
//   };


const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    // Check if the username already exists
    const existingUser = await axios.get("http://localhost:3000/users", {
      params: { username: userInput.username },
    });

    if (existingUser.data.length > 0) {
      setErrors("Username already exists. Please choose a different username.");
      return;
    }

    // Add the new user
    const response = await axios.post("http://localhost:3000/users", {
      firstname:userInput.firstName,
      lastname:userInput.lastName,
      email:userInput.email,
      phone:userInput.phone,
      username: userInput.username,
      password: userInput.password,
    });

    console.log("Registration Successful:", response.data);
    toast("Registeration Successfully!")

    setTimeout(() =>{

      navigate("/"); // Redirect to login page after successful registration
    },2000 )

  } catch (error) {
    toast("Registration Failed:", error);
    setErrors("An error occurred. Please try again.");
  }
};
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ToastContainer/>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={userInput.firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={onhandleChange}
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={userInput.lastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={onhandleChange}
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userInput.username}
                  id="UserName"
                  label="User Name"
                  name="username"
                  onChange={onhandleChange}
                  autoComplete="family-name"
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userInput.email}
                  id="email"
                  label="Email Address"
                  onChange={onhandleChange}
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userInput.phone}
                  id="phone"
                  label="Phone Number"
                  onChange={onhandleChange}
                  name="phone"
                  autoComplete="Phone Number"
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  sx={{width:"100%"}}
                    label="Date of Birth"
                    value={userInput.dob}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                      />
                    )}
                  />
                  {
                    errors.dob && <Typography variant="body2" color="error">{errors.dob}</Typography>
                  }
                </LocalizationProvider>
              </Grid> */}


              {/* <Grid item xs={12} sm={6}>
                
                  <Input type="file" name="file" id="file"  onChange={onhandleChange}/>
                  {
                    errors.file &&(
                        <Typography variant="body2" color="error">
                            {errors.file}
                            </Typography>
                    )
                  }
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={userInput.password}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={onhandleChange}
                  // autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}

                  
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
