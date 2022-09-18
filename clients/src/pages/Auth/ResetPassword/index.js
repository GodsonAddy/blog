import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  CssBaseline,
  Box,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetPassword,
  VerifyPassword,
} from "../../../features/actions/userAction";
import { toast } from "react-toastify";
import { reset } from "../../../features/reducer/userReducer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLocation, useNavigate } from "react-router-dom";
import querystring from "query-string";
import "../../../App.css";

const initialFormValues = {
  password: "",
  confirmpassword: "",
};
function ResetPasswordChange() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [resetError, setResetError] = useState({});
  const [valid, setValid] = useState(false);
  const [resetLoader, setResetLoader] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const { authMessage, authError, loading } = useSelector(
    (state) => state.auth
  );

  const { password, confirmpassword } = formValues;
  const { id, token } = querystring.parse(location.search);

  useEffect(() => {
    const verifyPassword = async () => {
      setResetLoader(true);
      const resultActions = await dispatch(VerifyPassword({ id, token }));
      if (VerifyPassword.fulfilled.match(resultActions)) {
        const user = resultActions.payload;
        toast.success(user.msg);
        console.log("data", user);
        setResetLoader(false);
        setValid(true);
      } else {
        console.log(authMessage);
        if (resultActions.payload) {
          toast.error(`Login failed: ${resultActions.payload}`);

          setValid(false);
          setResetLoader(false);
        } else {
          toast.error(`Login failed`, authMessage);
        }
      }
    };
    verifyPassword();
  }, [authMessage, dispatch, id, token]);

  useEffect(() => {
    if (authError) {
      toast.error(authMessage);
    }

    dispatch(reset());
  }, [authError, authMessage, dispatch]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormValues((values) => ({
      ...values,
      [name]: value,
    }));

    if (value !== "") {
      setResetError((prev) => {
        return { ...prev, [name]: null };
      });
    } else {
      setResetError((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setResetError((prev) => {
        return { ...prev, password: "Password is required" };
      });
      return;
    }
    if (!confirmpassword) {
      setResetError((prev) => {
        return { ...prev, password: "Confirm your password" };
      });
      return;
    }
    if (password !== confirmpassword) {
      setResetError((prev) => {
        return { ...prev, password: "Password must be the same" };
      });
      return;
    }

    const resultAction = await dispatch(ResetPassword({ id, token, password }));
    if (ResetPassword.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      toast.success(user.msg);
      setFormValues(initialFormValues);
      const toaster = () => {
        navigate("/login");
      };
      setTimeout(toaster, 2000);
    } else {
      if (resultAction.payload) {
        //toast.error(`Login failed: ${resultAction.payload}`);
      } else {
        toast.error(`Login failed`, authMessage);
      }
    }
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
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        container
        mt={10}
      >
        {resetLoader ? (
          <Typography>Loading...</Typography>
        ) : valid ? (
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
                    mb={5}
                  >
                    <Grid item>
                      <Typography component="h1" variant="h4">
                        Reset Password
                      </Typography>
                    </Grid>
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
                      error={!!resetError.password}
                      helperText={resetError ? resetError.password : null}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    autoComplete="current-password"
                    value={confirmpassword}
                    onChange={handleInputChange}
                    error={!!resetError.confirmpassword}
                    helperText={resetError ? resetError.confirmpassword : null}
                  />
                </Grid>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: "secondary.main" }}
                  loading={loading}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        ) : (
          <Typography>404 Not Found</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default ResetPasswordChange;
