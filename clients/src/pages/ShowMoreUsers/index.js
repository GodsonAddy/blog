import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Container,
  Paper,
  CircularProgress,
  Typography,
  Avatar,
  Button,
  Divider,
  Link,
  Collapse,
} from "@mui/material";
import LandingPage from "../LandingPage";
import { useSelector, useDispatch } from "react-redux";
import {
  FollowUserProfile,
  GetAllUsers,
} from "../../features/actions/userAction";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BookIcon from "@mui/icons-material/Book";
import { TransitionGroup } from "react-transition-group";
import { useNavigate, useLocation } from "react-router-dom";
import { Paginate } from "./util";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ShowMoreUsers() {
  const { allusers, loading, jwtToken } = useSelector((state) => state.auth);

  const query = useQuery();
  const page = query.get("page") || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/login";

  useEffect(() => {
    if (page) {
      dispatch(GetAllUsers(page));
    }
  }, [dispatch, page]);

  const FollowUser = async (id) => {
    if (!jwtToken) {
      navigate(from, { replace: true });
    }
    await dispatch(FollowUserProfile(id));
  };

  return (
    <LandingPage>
      <Container>
        <Box component={Paper} mt={10} mb={5} p={2} mx={{ xs: "1rem" }}>
          <Grid container display="flex" spacing={2} flexDirection="column">
            {!allusers?.length && !loading && (
              <Typography>No Users...</Typography>
            )}
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid item>
                <TransitionGroup>
                  {allusers?.map((users) => (
                    <Collapse key={users._id}>
                      <Link
                        href={`/user/${users._id}/${users.moniker}`}
                        underline="none"
                        sx={{
                          color: "tertiary.main",
                        }}
                      >
                        <Grid
                          container
                          display="flex"
                          spacing={2}
                          flexDirection="column"
                          mt={2}
                        >
                          <Grid item>
                            <Grid
                              container
                              display="flex"
                              spacing={2}
                              justifyContent="space-between"
                            >
                              <Grid item>
                                {users?.avatar ? (
                                  <Avatar
                                    alt={users?.name}
                                    src={users?.avatar}
                                  />
                                ) : (
                                  <Avatar
                                    alt={users?.name}
                                    sx={{
                                      bgcolor: users?.color,
                                    }}
                                  >
                                    {users?.initials}
                                  </Avatar>
                                )}
                              </Grid>
                              <Grid item>
                                <Grid
                                  container
                                  display="flex"
                                  flexDirection="column"
                                >
                                  <Grid item>
                                    <Typography>{users?.name}</Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      sx={{
                                        color: "primary.main",
                                        "&:hover": {
                                          textDecoration: "underline",
                                        },
                                      }}
                                    >
                                      {users?.moniker}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Box>
                                  <Button
                                    variant="contained"
                                    type="button"
                                    sx={{
                                      backgroundColor: "tertiary.main",
                                      color: "secondary.main",
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      FollowUser(users?._id);
                                    }}
                                  >
                                    Follow
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              display="flex"
                              spacing={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item>
                                <Grid container display="flex" spacing={2}>
                                  <Grid item>
                                    <GroupIcon />
                                  </Grid>
                                  <Grid item>
                                    <Typography>
                                      {users?.followers} Followers
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container display="flex" spacing={2}>
                                  <Grid item>
                                    <GroupAddIcon />
                                  </Grid>
                                  <Grid item>
                                    <Typography>
                                      {users?.following} Following
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container display="flex" spacing={2}>
                                  <Grid item>
                                    <BookIcon />
                                  </Grid>
                                  <Grid item>
                                    <Typography>0 Blogs</Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider />
                        </Grid>
                      </Link>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </Grid>
            )}
          </Grid>
        </Box>
        <Grid container display="flex">
          <Grid item>
            <Paper sx={{ p: 2 }}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </LandingPage>
  );
}

export default ShowMoreUsers;
