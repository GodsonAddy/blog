import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  Grid,
  Box,
  Typography,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Divider,
  useMediaQuery,
  Link,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authRegister,
  authGooglelogin,
} from "../../../features/actions/userAction";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";
import { reset } from "../../../features/reducer/userReducer";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import "../../../App.css";

const initialFormValues = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
};

function SignUp() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [signUpError, setSignUpError] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { loading, authMessage, authError } = useSelector(
    (state) => state.auth
  );

  let from = location.state?.from?.pathname || "/";
  const { email, password, first_name, last_name } = formValues;

  useEffect(() => {
    if (authError) {
      toast.error(authMessage);
    }

    dispatch(reset());
  }, [authError, authMessage, dispatch, navigate]);

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

  function validate(entity, callback) {
    let result = true;

    for (const [key, value] of Object.entries(entity)) {
      if (!value) {
        result = false;
        callback((prev) => ({
          ...prev,
          [key]: "This field is required",
        }));
      }
    }
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = validate(formValues, setSignUpError);
    if (!isValid) {
      return;
    }
    const resultAction = await dispatch(authRegister(formValues));

    if (authRegister.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      toast.success(`You're now logged in as ${user.email}`);
      const toaster = () => {
        navigate(from, { replace: true });
      };
      setTimeout(toaster, 2000);
    } else {
      if (resultAction.payload) {
        //toast.error(`Login failed: ${resultAction.payload}`);
      } else {
        toast.error(`Login failed`);
      }
    }
  };

  const googleLogin = async (response) => {
    const resultAction = await dispatch(
      authGooglelogin({ token: response.credential })
    );

    if (authGooglelogin.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      console.log("user", user);
      toast.success(`Welcome back ${user.name}`);
      const toaster = () => {
        navigate(from, { replace: true });
      };
      setTimeout(toaster, 2000);
    } else {
      if (resultAction.payload) {
        //toast.error(`Login failed: ${resultAction.payload}`);
      } else {
        toast.error(`Login failed`);
      }
    }
  };

  const handleLogin = () => {
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Container component="main">
      <CssBaseline />

      <Grid container display="flex">
        <Grid item sm={3}>
          <Link href="/" underline="none">
            <Typography
              variant="h4"
              sx={{
                letterSpacing: 5,
                backgroundColor: "tertiary.main",
                color: "secondary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              id="logo"
            >
              <sup style={{ fontSize: "14px" }}>THE</sup>BLOGMENTARY
            </Typography>
          </Link>
        </Grid>
      </Grid>

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        my={5}
      >
        <Grid item>
          <Typography component="h1" variant="h4">
            {" "}
            Sign up
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        component="main"
        rowSpacing={2}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid
          item
          sm={8}
          md={5}
          sx={{
            xs: useMediaQuery(theme.breakpoints.down(300)) ? "column" : "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                    name="first_name"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    autoFocus
                    value={first_name}
                    onChange={handleSignUp}
                    error={!!signUpError.first_name}
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
                    autoComplete="family-name"
                    value={last_name}
                    onChange={handleSignUp}
                    error={!!signUpError.last_name}
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
                    value={email}
                    onChange={handleSignUp}
                    error={!!signUpError.email}
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
                    value={password}
                    onChange={handleSignUp}
                    error={!!signUpError.password}
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
                sx={{ mt: 3, mb: 5, color: "secondary.main" }}
                loading={loading}
              >
                Sign Up
              </LoadingButton>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    onClick={handleLogin}
                    variant="text"
                    sx={{ color: "#E60000", fontSize: 15, mb: 2 }}
                  >
                    Already have an account? Sign in
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Divider
          orientation={
            useMediaQuery(theme.breakpoints.down(300))
              ? "horizontal"
              : "vertical"
          }
          flexItem={true}
        >
          OR
        </Divider>

        <Grid
          item
          sx={{
            xs: useMediaQuery(theme.breakpoints.down(300))
              ? "vertical"
              : "horizontal",
          }}
        >
          <GoogleLogin
            onSuccess={googleLogin}
            onError={googleLogin}
            size="large"
            text="signup_with"
            width="300px"
            shape="rectangular"
            logo_alignment="center"
            theme="filled_black"
            cancel_on_tap_outside
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
