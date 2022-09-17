import React, { useEffect } from "react";
import {
  Card,
  Collapse,
  CardContent,
  Button,
  Typography,
  Avatar,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  FollowUserProfile,
  GetAtLeastThreeUsers,
} from "../../../features/actions/userAction";
import { TransitionGroup } from "react-transition-group";
import { useLocation, useNavigate } from "react-router-dom";

function MediaCard() {
  const { atleastthreeusers, jwtToken, loading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/login";

  useEffect(() => {
    dispatch(GetAtLeastThreeUsers());
  }, [dispatch]);

  const FollowUser = async (id) => {
    console.log("id", id);
    if (!jwtToken) {
      navigate(from, { replace: true });
    }
    await dispatch(FollowUserProfile(id));
  };

  const reduceWords = (str) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "16px" }} elevation={1} raised>
      <CardContent>
        <Typography variant="h6" fontWeight={700} component="span">
          Who to follow
        </Typography>

        <Grid
          container
          display="flex"
          flexDirection="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>{loading && <CircularProgress />}</Grid>
          <Grid item>
            <TransitionGroup>
              {atleastthreeusers?.length > 0 &&
                atleastthreeusers?.map((user) => (
                  <Collapse key={user._id}>
                    <Link
                      href={`/user/${user._id}/${user.moniker}`}
                      underline="none"
                      sx={{
                        color: "tertiary.main",
                      }}
                    >
                      <Grid
                        container
                        display="flex"
                        spacing={2}
                        // justifyContent="center"
                        // alignItems="center"
                        p={2}
                      >
                        <Grid item>
                          {user?.avatar ? (
                            <Avatar alt={user?.name} src={user?.avatar} />
                          ) : (
                            <Avatar
                              alt={user?.name}
                              sx={{
                                bgcolor: user?.color,
                              }}
                            >
                              {user.initials}
                            </Avatar>
                          )}
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            display="flex"
                            // justifyContent="center"
                            // alignItems="center"
                            flexDirection="column"
                          >
                            <Grid item>
                              <Typography component="span" fontWeight={600}>
                                {user.first_name + user.last_name}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                component="span"
                                sx={{
                                  color: "primary.main",
                                  "&:hover": { textDecoration: "underline" },
                                }}
                              >
                                {reduceWords(user.moniker)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            type="button"
                            sx={{
                              backgroundColor: "tertiary.main",
                              color: "secondary.main",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              FollowUser(user._id);
                            }}
                          >
                            Follow
                          </Button>
                        </Grid>
                      </Grid>
                    </Link>
                  </Collapse>
                ))}
            </TransitionGroup>
          </Grid>
          {atleastthreeusers?.length > 0 ? (
            <Grid item>
              <Button
                variant="text"
                type="button"
                onClick={() => navigate("/user")}
              >
                {" "}
                Show more
              </Button>
            </Grid>
          ) : (
            <Typography p={2} component="span">
              No user available...
            </Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MediaCard;
