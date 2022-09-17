import React, { useEffect } from "react";
import UserDashboard from "..";
import { Grid, Paper, Box, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink, deepOrange } from "@mui/material/colors";
import DescriptionIcon from "@mui/icons-material/Description";
import RecentComment from "./RecentComment";
import Chart from "./Chart";
import BlogTable from "../Dashboard/BlogTable";
import SocialMedia from "./SocialMedia";
import { useDispatch } from "react-redux";
import { getMyBlogs } from "../../../features/actions/blogAction";
import { resetBlog } from "../../../features/reducer/blogReducer";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBlogs());

    dispatch(resetBlog());
  }, [dispatch]);
  return (
    <UserDashboard>
      <Box
        sx={{
          margin: 1,
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          display="flex"
          marginTop={3}
        >
          <Grid item xs={12} sx={{ flex: 2 }} sm={8}>
            <Grid container spacing={2} direction="column" display="flex">
              <Grid item>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  display="flex"
                  marginBottom={2}
                  justifyContent="space-evenly"
                >
                  {/* Followers*/}
                  <Grid item>
                    <Paper
                      elevation={2}
                      variant="elevation"
                      sx={{ width: 160 }}
                    >
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        padding={2}
                        display="flex"
                      >
                        <Grid item>
                          <PeopleAltIcon
                            color="success"
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Grid container spacing={1} direction="column">
                            <Grid item>
                              <Typography variant="h6">1000</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="overline" display="block">
                                Followers
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Posts */}
                  <Grid item>
                    <Paper
                      elevation={2}
                      variant="elevation"
                      sx={{ width: 160 }}
                    >
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        padding={2}
                      >
                        <Grid item>
                          <DescriptionIcon
                            sx={{
                              fontSize: 40,
                              color: deepOrange[500],
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Grid container spacing={1} direction="column">
                            <Grid item>
                              <Typography variant="h6">1000</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="overline" display="block">
                                Posts
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Likes */}
                  <Grid item>
                    <Paper
                      elevation={2}
                      variant="elevation"
                      sx={{ width: 160 }}
                    >
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        padding={2}
                      >
                        <Grid item>
                          <FavoriteIcon
                            sx={{
                              fontSize: 40,
                              color: pink[500],
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Grid container spacing={1} direction="column">
                            <Grid item>
                              <Typography variant="h6">1000</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="overline" display="block">
                                Likes
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Viewers */}
                  <Grid item>
                    <Paper
                      elevation={2}
                      variant="elevation"
                      sx={{ width: 160 }}
                    >
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        padding={2}
                      >
                        <Grid item>
                          <SignalCellularAltIcon
                            color="info"
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Grid container spacing={1} direction="column">
                            <Grid item>
                              <Typography variant="h6">1000</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="overline" display="block">
                                Viewers
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Charts */}
                <Grid item>
                  <Chart />
                </Grid>

                {/* Table */}
                <Grid item my={4}>
                  <BlogTable />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Recent Comments */}
          <Grid item xs={12} sm={4} style={{ display: "flex", flex: 1 }}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <RecentComment />
              </Grid>

              {/* Social Media */}
              <Grid item marginTop={5}>
                <SocialMedia />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </UserDashboard>
  );
}

export default Dashboard;
