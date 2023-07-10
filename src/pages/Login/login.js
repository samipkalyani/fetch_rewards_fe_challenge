import { Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = (props) => {
  const { setAppState } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [validators, setValidators] = useState({
    nameError: false,
    nameHelperText: "",
    emailError: false,
    emailHelperText: "",
  });

  const handleNameChange = (e) => {
    setValidators((prevValidator) => ({
      ...prevValidator,
      nameError: false,
      nameHelperText: "",
    }));
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setValidators((prevValidator) => ({
      ...prevValidator,
      emailError: false,
      emailHelperText: "",
    }));
    setFormData({ ...formData, email: e.target.value });
  };

  const validateOnSubmit = (name, email) => {
    var valid = true;
    if (name.trim() === "") {
      setValidators((prevValidator) => ({
        ...prevValidator,
        nameError: true,
        nameHelperText: "Enter a name.",
      }));
      valid = false;
    }
    if (email.trim() === "") {
      setValidators((prevValidator) => ({
        ...prevValidator,
        emailError: true,
        emailHelperText: "Enter an email address.",
      }));
      valid = false;
    }
    const email_regex = new RegExp("^(([a-zA-Z]+[0-9]*)+@[a-zA-Z]+.com)$");
    if (valid && !email_regex.test(email)) {
      setValidators((prevValidator) => ({
        ...prevValidator,
        emailError: true,
        emailHelperText: "Email address is not valid.",
      }));
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateOnSubmit(formData.name, formData.email)) {
      const body = {
        name: formData.name,
        email: formData.email,
      };
      const url = "https://frontend-take-home-service.fetch.com/auth/login";
      try {
        await axios.post(url, body, {
          withCredentials: true,
        });
          ((...prevAppState) => ({
          ...prevAppState,
          isAuth: true,
          firstVisit: true,
        }));
      } catch (err) {
        setAppState((prevAppState) => ({
          ...prevAppState,
          error: true,
          message: `Tried to POST ${url} and an error occured.`,
        }));
      }
    }
  };

  return (
    <div data-testid="login">
      <form onSubmit={handleSubmit}>
        <Grid>
          <Paper elevation={10} className="paperStyle">
            <Grid>
              <h2>Login</h2>
            </Grid>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              sx={{ marginBottom: 2.5 }}
              fullWidth
              value={formData.name}
              onChange={handleNameChange}
              error={validators.nameError}
              helperText={validators.nameHelperText}
            ></TextField>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              sx={{ marginBottom: 2.5 }}
              fullWidth
              value={formData.email}
              onChange={handleEmailChange}
              error={validators.emailError}
              helperText={validators.emailHelperText}
            ></TextField>
            <Button fullWidth variant="contained" type="submit">
              Login
            </Button>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
