import React, { useState } from "react";
import {
  TextField,
  Alert,
  Checkbox,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import {
  Collapse,
  Container,
  CssBaseline,
  FormControlLabel,
} from "@mui/material";
import { withRouter, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { errorDeleted } from "../../actions/errorAction";
import LoadingButton from "@mui/lab/LoadingButton";

const helperTextStyles = makeStyles((theme) => ({
  root: {
    margin: 4,
    color: "red !important",
  },
}));

const initialFormValues = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
};

function SignUp() {
  const helperTestClasses = helperTextStyles();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [showAlert, setShowAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [signUpError, setSignUpError] = useState({});

  const dispatch = useDispatch();

  const { validator } = useSelector((state) => state.errorAuth);

  const handleSignUp = (e) => {
    const { name, value } = e.target;
    setFormValues((values) => ({
      ...values,
      [name]: value,
    }));

    if (value !== "") {
      setSignUpError((prev) => {
        return { ...prev, [name]: null };
      });
    } else {
      setSignUpError((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
  };

  const closeAlert = () => {
    dispatch(errorDeleted());
    setOpen(false);
    setFormValues((prev) => ({ ...prev, ...initialFormValues }));
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, first_name, last_name } = formValues;
    const payload = { email, password, first_name, last_name };
    console.log(payload);

    if (!formValues.first_name) {
      setSignUpError((prev) => {
        return { ...prev, first_name: "First name is required" };
      });
      return;
    }
    if (!formValues.last_name) {
      setSignUpError((prev) => {
        return { ...prev, last_name: "Last name is required" };
      });
      return;
    }
    if (!formValues.email) {
      setSignUpError((prev) => {
        return { ...prev, email: "Email is required" };
      });
      return;
    }
    if (!formValues.password) {
      setSignUpError((prev) => {
        return { ...prev, password: "Password is required" };
      });
      return;
    }
    setLoader(true);
    setDisabled(true);
    dispatch(register(formValues))
      .then((res) => {
        console.log(res);
        setLoader(false);
        setShowAlert(true);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setShowAlert(false);
        setFormValues(initialFormValues);
      });
  };

  return (
    <Container component="main">
      <CssBaseline />

      <Typography variant="h4">
        vibes<sup>&reg;</sup>
      </Typography>

      <Grid
        container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={8} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 6,
            }}
          >
            <Collapse in={open}>
              {validator.msg && (
                <Alert
                  severity={showAlert ? "success" : "error"}
                  onClose={closeAlert}
                >
                  {validator.msg}
                </Alert>
              )}
            </Collapse>

            <Typography component="h1" variant="h3">
              {" "}
              Sign up
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
                    autoComplete="fname"
                    name="first_name"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    autoFocus
                    value={formValues.first_name}
                    onChange={handleSignUp}
                    disabled={disabled}
                    FormHelperTextProps={{ classes: helperTestClasses }}
                    helperText={signUpError ? signUpError.first_name : null}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="lname"
                    value={formValues.last_name}
                    onChange={handleSignUp}
                    disabled={disabled}
                    FormHelperTextProps={{ classes: helperTestClasses }}
                    helperText={signUpError ? signUpError.last_name : null}
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
                    value={formValues.email}
                    onChange={handleSignUp}
                    disabled={disabled}
                    FormHelperTextProps={{ classes: helperTestClasses }}
                    helperText={signUpError ? signUpError.email : null}
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
                    value={formValues.password}
                    onChange={handleSignUp}
                    disabled={disabled}
                    FormHelperTextProps={{ classes: helperTestClasses }}
                    helperText={signUpError ? signUpError.password : null}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loader}
              >
                Sign Up
              </LoadingButton>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink
                    to="/login"
                    variant="body2"
                    style={{ textDecoration: "none", color: "red" }}
                  >
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(SignUp);
