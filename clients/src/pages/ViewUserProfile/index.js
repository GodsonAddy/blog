import React, { useEffect } from "react";
import {
  FollowUserProfile,
  GetAUserProfile,
} from "../../features/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "../LandingPage";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  FormControlLabel,
  CardActionArea,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Paper,
  Container,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BookIcon from "@mui/icons-material/Book";
import Favorite from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Paginate } from "../Blogs/util";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ViewUserProfile = () => {
  const { auserprofile, authError, auserpost, loading, jwtToken } = useSelector(
    (state) => state.auth
  );

  const params = useParams();
  const query = useQuery();
  const page = query.get("page") || 1;
  const { id, moniker } = params;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/login";

  useEffect(() => {
    if (authError) {
      navigate("/404");
    }
    if (page) {
      dispatch(GetAUserProfile({ id, moniker, page }));
    }
  }, [authError, dispatch, id, moniker, navigate, page]);

  const reduceWords = (str) => {
    return str.length > 300 ? str.substring(0, 220) + "..." : str;
  };

  const FollowUser = async (id) => {
    if (!jwtToken) {
      navigate(from, { replace: true });
    }
    await dispatch(FollowUserProfile(id));
  };

  return (
    <LandingPage>
      <Container>
        <Box my={10}>
          <Grid
            container
            display="flex"
            spacing={2}
            // justifyContent="center"
            // alignItems="center"
            flexDirection="column"
          >
            <Grid item>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid
                    container
                    display="flex"
                    spacing={2}
                    // justifyContent="center"
                    // alignItems="center"
                    flexDirection="column"
                  >
                    <Grid item>{loading && <CircularProgress />}</Grid>
                    <Grid item>
                      <Grid
                        container
                        display="flex"
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          {auserprofile?.avatar ? (
                            <Avatar
                              alt={auserprofile?.name}
                              src={auserprofile?.avatar}
                              sx={{ height: 100, width: 100 }}
                            />
                          ) : (
                            <Avatar
                              alt={auserprofile?.name}
                              sx={{
                                bgcolor: auserprofile?.color,
                                height: 100,
                                width: 100,
                                fontSize: 40,
                              }}
                            >
                              {auserprofile?.initials}
                            </Avatar>
                          )}
                        </Grid>
                        <Grid item>
                          <Typography variant="h4">
                            {auserprofile?.name}
                          </Typography>
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
                              FollowUser(auserprofile?._id);
                            }}
                          >
                            Follow
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      display="flex"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      mt={3}
                    >
                      <Grid item>
                        <Grid container display="flex" spacing={2}>
                          <Grid item>
                            <GroupIcon />
                          </Grid>
                          <Grid item>
                            <Typography>
                              {auserprofile?.followers} Followers
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
                              {auserprofile?.following} Following
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
                </CardContent>
              </Card>
            </Grid>
            {!auserpost?.length && !loading && (
              <Typography>No blog post...</Typography>
            )}
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid item>
                {auserpost?.map((blog) => (
                  <Grid item key={blog?._id} style={{ display: "flex" }}>
                    <Card
                      key={blog?._id}
                      variant="outlined"
                      borderRadius="16px"
                      sx={{
                        maxWidth: 345,
                        mb: 2,
                        pb: 2,
                        "&:hover": {
                          backgroundColor: "silver[400]",
                          transform: "scale(1.01)",
                          boxShadow: "1px 1px 30px silver",
                        },
                      }}
                    >
                      <CardActionArea
                        LinkComponent={Link}
                        to={`/blog/${blog.category}/${blog._id}/${blog.slug}`}
                      >
                        <CardHeader
                          title={<Typography> {blog?.title}</Typography>}
                          subheader={format(
                            new Date(blog?.createdAt),
                            "dd-MMM-yyyy"
                          )}
                        />
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
                          alt="green iguana"
                        />
                        <CardContent>
                          <Chip
                            label={blog?.category}
                            sx={{
                              bgcolor: blog?.author?.color
                                ? blog?.author?.color
                                : "primary.main",
                              color: "secondary.main",
                            }}
                          />

                          <Typography variant="body2" color="text.primary">
                            {reduceWords(blog?.content)}
                          </Typography>
                        </CardContent>

                        <CardActions>
                          <Grid
                            container
                            display="flex"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item>
                              <ModeCommentIcon />
                            </Grid>

                            <Grid item>
                              <FormControlLabel
                                label={blog?.favorites}
                                control={
                                  <Checkbox
                                    label="10k"
                                    checkedIcon={<Favorite />}
                                    defaultChecked
                                    sx={{
                                      "&.Mui-checked": {
                                        color: "#E60000",
                                      },
                                    }}
                                  />
                                }
                              />
                            </Grid>

                            <Grid item>
                              <Chip icon={<VisibilityIcon />} label="100" />
                            </Grid>
                          </Grid>
                        </CardActions>
                      </CardActionArea>
                    </Card>
                    <Grid item>
                      <Paper sx={{ p: 2 }}>
                        <Paginate page={page} />
                      </Paper>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </LandingPage>
  );
};

export default ViewUserProfile;
