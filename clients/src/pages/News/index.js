import React, { useEffect } from "react";
import LandingPage from "../LandingPage";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReadNews } from "../../features/actions/blogAction";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
  Link,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { Paginate } from "./util";

const Img = styled("img")({
  maxWidth: "20rem",
  maxHeight: "20rem",
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function News() {
  const { getnews, loader } = useSelector((state) => state.blog);

  const query = useQuery();

  const page = query.get("page") || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(ReadNews(page));
    }
  }, [dispatch, page]);
  return (
    <LandingPage>
      <CssBaseline />

      <Box sx={{ my: 10 }}>
        <Container>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            flexDirection="column"
          >
            {!getnews?.length && !loader && <Typography>No News...</Typography>}
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
                  {getnews?.map((news, index) => (
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
                              <Img
                                alt={news.description}
                                src={news.urlToImage}
                              />
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
                                    {news.source.name}
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
                                        {format(
                                          new Date(news.publishedAt),
                                          "dd-MMM-yyyy"
                                        )}
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
        </Container>
      </Box>
      {getnews?.length !== 0 && (
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
    </LandingPage>
  );
}

export default News;
