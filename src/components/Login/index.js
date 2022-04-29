import React, { useState } from "react";
import {
  TextField,
  Alert,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  Collapse,
  Container
} from "@mui/material";
import { withRouter, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
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
};

const LogIn = () => {
  const helperTestClasses = helperTextStyles();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [showAlert, setShowAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [loginError, setLoginError] = useState({});

  const dispatch = useDispatch();

  const { validator } = useSelector((state) => state.errorAuth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((values) => ({
      ...values,
      [name]: value,
    }));

    if (value !== "") {
      setLoginError((prev) => {
        return { ...prev, [name]: null };
      });
    } else {
      setLoginError((prev) => {
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
    const { email, password } = formValues;
    const payload = { email, password };
    console.log(payload);

    if (!formValues.email) {
      setLoginError((prev) => {
        return { ...prev, email: "Email is required" };
      });
      return;
    }
    if (!formValues.password) {
      setLoginError((prev) => {
        return { ...prev, password: "Password is required" };
      });
      return;
    }
    setLoader(true);
    setDisabled(true);
    dispatch(login(formValues))
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
    <Container className="nonito" component="main">
      <Typography variant="h4">
        vibes<sup className="rotated">&reg;</sup>
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
              Sign in
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formValues.email}
                    onChange={handleInputChange}
                    disabled={disabled}
                    FormHelperTextProps={{ classes: helperTestClasses }}
                    helperText={loginError ? loginError.email : null}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    disabled={disabled}
                    FormHelperTextProps={{ classes: helperTestClasses }}
                    helperText={loginError ? loginError.email : null}
                  />
                </Grid>

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  loading={loader}
                >
                  Sign In
                </LoadingButton>

                <Grid container>
                  <Grid item xs>
                    <NavLink
                      to="/"
                      variant="body2"
                      style={{ textDecoration: "none", color: "red" }}
                    >
                      Forgot password?
                    </NavLink>
                  </Grid>

                  <Grid item>
                    <NavLink
                      to="/signup"
                      variant="body2"
                      style={{ textDecoration: "none", color: "red" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(LogIn);
