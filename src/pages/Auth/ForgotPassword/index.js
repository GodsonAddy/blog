import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  CssBaseline,
  Box,
  Button,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../../../features/actions/userAction";
import { toast } from "react-toastify";
import { reset } from "../../../features/reducer/userReducer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

function ForgotPasswordChange() {
  const [email, setEmail] = useState("");
  const [forgotError, setForgotError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authMessage, authError, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authError) {
      toast.error(authMessage);
    }

    // if (authSuccess || authUser) {
    //   //toast.success(authMessage);
    // }

    dispatch(reset());
  }, [authError, authMessage, dispatch]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (value !== "") {
      setForgotError((prev) => {
        return { ...prev, email: null };
      });
    } else {
      setForgotError((prev) => {
        return { ...prev, email: "This field is required" };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setForgotError((prev) => {
        return { ...prev, email: "Email is required" };
      });
      return;
    }

    const resultAction = await dispatch(ForgotPassword({ email }));
    if (ForgotPassword.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      toast.success(user.msg);
      setEmail("");
    } else {
      if (resultAction.payload) {
        toast.error(`Login failed: ${resultAction.payload}`);
      } else {
        toast.error(`Login failed, ${resultAction.error.message}`);
      }
    }
  };
  return (
    <Container component="main">
      <CssBaseline />
      <Link onClick={() => navigate("/")} underline="none">
        <Typography
          sx={{ color: "tertiary.main", fontSize: 50 }}
          component="h1"
          variant="h4"
        >
          vibes<sup>&reg;</sup>
        </Typography>
      </Link>

      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        container
        mt={2}
      >
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid
                  container
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  mt={5}
                  mb={3}
                >
                  <Grid item>
                    <Typography component="h1" variant="h4" mb={2}>
                      Reset Password
                    </Typography>
                  </Grid>
                  <Grid item>
                    {" "}
                    <Typography component="h1" variant="body1">
                      Type in your email to reset your password
                    </Typography>
                  </Grid>
                </Grid>
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
                    error={!!forgotError.email}
                    helperText={forgotError ? forgotError.email : null}
                  />
                </Grid>
              </Grid>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3, color: "secondary.main" }}
                loading={loading}
              >
                Submit
              </LoadingButton>

              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="text"
                    sx={{ color: "#E60000", fontSize: 15, mb: 2 }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ForgotPasswordChange;
