import React, { useEffect } from "react";
import LandingPage from "../LandingPage";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Link,
  CssBaseline,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Paginate } from "./util";
import { GetAllNews } from "../../features/actions/newsAction";

const Img = styled("img")({
  maxWidth: "20rem",
  maxHeight: "20rem",
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function News() {
  const { newsContents, loader } = useSelector((state) => state.news);

  const query = useQuery();

  const page = query.get("page") || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(GetAllNews(page));
    }
  }, [dispatch, page]);
  return (
    <LandingPage>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 10 }}>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            flexDirection="column"
          >
            {!newsContents?.length && !loader && (
              <Typography>No News...</Typography>
            )}
            {loader ? (
              <CircularProgress />
            ) : (
              <Grid item>
                <Grid
                  container
                  display="flex"
                  spacing={2}
                  flexDirection="column"
                >
                  {newsContents?.map((news, index) => (
                    <Grid item key={index}>
                      <Link
                        href={news.url}
                        underline="none"
                        rel="noopener"
                        target="_blank"
                      >
                        <Paper
                          elevation={2}
                          sx={{
                            mb: 5,

                            p: 2,
                            borderRadius: "16px",

                            transition: "0.2s",

                            "&:hover": {
                              backgroundColor: "silver[400]",
                              transform: "scale(1.1)",
                              boxShadow: "1px 1px 30px silver",
                            },
                          }}
                        >
                          <Grid
                            container
                            display="flex"
                            spacing={{ xs: 2, md: 20 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                          >
                            <Grid item xs={12} sm={4} lg={4}>
                              <Img alt={news.description} src={news.urlImage} />
                            </Grid>
                            <Grid item xs={12} sm={8} lg={8}>
                              <Grid
                                container
                                display="flex"
                                flexDirection="column"
                                spacing={2}
                              >
                                <Grid item>
                                  <Typography
                                    variant="h5"
                                    sx={{ color: "crimson", fontWeight: 700 }}
                                  >
                                    {news.source}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography fontWeight={700}>
                                    {news.title}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    display="flex"
                                    justifyContent="space-between"
                                    spacing={2}
                                  >
                                    <Grid item>
                                      <Typography variant="span">
                                        {news.author}
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Typography variant="span">
                                        {news.timestamp}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
        {newsContents?.length !== 0 && (
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item mt={10}>
              <Paper sx={{ p: 2 }}>
                <Paginate page={page} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </LandingPage>
  );
}

export default News;
