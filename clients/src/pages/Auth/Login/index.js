import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  Container,
  Button,
  Divider,
  useMediaQuery,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  authGooglelogin,
  authLogin,
} from "../../../features/actions/userAction";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "../../../features/reducer/userReducer";
import { GoogleLogin } from "@react-oauth/google";

const initialFormValues = {
  email: "",
  password: "",
};

const LogIn = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [loginError, setLoginError] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { email, password } = formValues;
  const { loading, authError, authMessage } = useSelector(
    (state) => state.auth
  );

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (authError) {
      toast.error(authMessage);
    }

    dispatch(reset());
  }, [authError, authMessage, dispatch, navigate]);

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setLoginError((prev) => {
        return { ...prev, email: "Email is required" };
      });
      return;
    }
    if (!password) {
      setLoginError((prev) => {
        return { ...prev, password: "Password is required" };
      });
      return;
    }

    const resultAction = await dispatch(authLogin(formValues));

    if (authLogin.fulfilled.match(resultAction)) {
      const user = resultAction.payload;

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

  const googleLogin = async (response) => {
    const resultAction = await dispatch(
      authGooglelogin({ token: response.credential })
    );

    if (authGooglelogin.fulfilled.match(resultAction)) {
      const user = resultAction.payload;

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

  const handleForgot = () => {
    dispatch(reset());
    navigate("/forgotpassword");
  };

  const handleSignUp = () => {
    dispatch(reset());
    navigate("/signup");
  };

  return (
    <Container component="main">
      <Link href="/" underline="none">
        <Typography
          sx={{ color: "tertiary.main", fontSize: 50 }}
          component="h1"
          variant="h4"
        >
          vibes<sup>&reg;</sup>
        </Typography>
      </Link>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={5}
      >
        <Grid item>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        component="main"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-around"
        rowSpacing={2}
      >
        <Grid
          item
          md={5}
          sm={8}
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
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                    value={email}
                    onChange={handleInputChange}
                    error={!!loginError.email}
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
                    value={password}
                    onChange={handleInputChange}
                    error={!!loginError.password}
                    helperText={loginError ? loginError.password : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMe}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: "secondary.main" }}
                loading={loading}
              >
                Login
              </LoadingButton>

              <Grid container mb={3}>
                <Grid item xs>
                  <Button
                    onClick={handleForgot}
                    variant="text"
                    sx={{ color: "#E60000", fontSize: 15 }}
                  >
                    {"Forgot password?"}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    onClick={handleSignUp}
                    variant="text"
                    sx={{ fontSize: 15, color: "#E60000" }}
                  >
                    {"Don't have an account? Sign Up"}
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
            text="signin_with"
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
};

export default LogIn;
