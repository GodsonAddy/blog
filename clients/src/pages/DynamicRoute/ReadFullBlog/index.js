import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Avatar,
  Button,
  IconButton,
  OutlinedInput,
  Link,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { styled } from "@mui/material/styles";
import "./index.css";
import ButtonBase from "@mui/material/ButtonBase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/system";
import vibes from "../../../images/vibes.png";
import {
  commentMyBlog,
  favoriteMyBlog,
  getASingleBlog,
} from "../../../features/actions/blogAction";
import LandingPage from "../../LandingPage";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { FollowUserProfile } from "../../../features/actions/userAction";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function ReadFullBlog() {
  const { aSingleBlog, blogError, createdAt, loader } = useSelector(
    (state) => state.blog
  );

  const { jwtToken } = useSelector((state) => state.auth);

  const [openComment, setOpenComment] = useState(false);
  const [openReplyComment, setOpenReplyComment] = useState(false);

  const [writeComment, setWriteComment] = useState("");

  const params = useParams();
  const { category, id, slug } = params;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/login";

  useEffect(() => {
    if (blogError) {
      navigate("/404");
    }

    dispatch(getASingleBlog({ category, id, slug }));
  }, [blogError, category, dispatch, id, navigate, slug]);

  console.log(params);

  const handleOpenComment = () => {
    setOpenComment(!openComment);
  };

  const handleOpenReplyComment = () => {
    setOpenReplyComment(!openReplyComment);
  };

  const FollowUser = async (id) => {
    console.log("id", id);
    if (!jwtToken) {
      navigate(from, { replace: true });
    }
    await dispatch(FollowUserProfile(id));
  };

  const FavoritePost = (id) => {
    console.log("id", id);

    dispatch(favoriteMyBlog(id));
  };

  const Favorites = () => {
    if (aSingleBlog?.favorites?.length > 0) {
      return aSingleBlog?.favorites?.find(
        (favorite) => favorite === (jwtToken?.googleId || jwtToken?._id)
      ) ? (
        <>
          <FavoriteBorder fontSize="large" />
          &nbsp;
          {aSingleBlog?.favorites?.length > 2
            ? `You and ${aSingleBlog?.favorites?.length - 1} others`
            : `${aSingleBlog?.favorites?.length} Like ${
                aSingleBlog?.favorites?.length > 1 ? "s" : ""
              }`}{" "}
        </>
      ) : (
        <>
          <FavoriteBorder fontSize="large" />
          &nbsp;{aSingleBlog?.favorites?.length}{" "}
          {aSingleBlog?.favorites?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FavoriteBorder fontSize="large" />
        &nbsp;Like
      </>
    );
  };

  const PostComment = async (e) => {
    e.preventDefault();

    await dispatch(commentMyBlog(aSingleBlog?._id, { writeComment }));
    //setComments(getcomments);
  };

  const FavoriteComment = (e) => {
    e.preventDefault();
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    className: "center",
    centerPadding: "60px",
  };

  return (
    <LandingPage>
      <Container>
        <Grid
          container
          component="main"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          my={4}
          spacing={2}
        >
          <Grid item sm={2}>
            <Paper elevation={2} sx={{ borderRadius: "16px" }}>
              <Grid
                container
                display={{ xs: "none", sm: "flex" }}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding={2}
                spacing={2}
                mt={0.2}
              >
                <Grid item>{loader && <CircularProgress />}</Grid>
                <Grid item>
                  {aSingleBlog?.author?.avatar ? (
                    <Avatar
                      alt={aSingleBlog?.author?.name}
                      src={aSingleBlog?.author?.avatar}
                    />
                  ) : (
                    <Avatar
                      alt={aSingleBlog?.author?.name}
                      sx={{
                        bgcolor: aSingleBlog?.author?.color,
                      }}
                    >
                      {" "}
                      {aSingleBlog?.author?.initials}{" "}
                    </Avatar>
                  )}
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {aSingleBlog?.author?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="favorite"
                    onClick={() => FavoritePost(aSingleBlog._id)}
                    color="error"
                    sx={{ fontSize: 15 }}
                    disabled={!jwtToken}
                  >
                    <Favorites />
                  </IconButton>
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
                      FollowUser(aSingleBlog?.author?._id);
                    }}
                  >
                    Follow
                  </Button>
                </Grid>
                <Grid item>
                  <Link
                    href={`/user/${aSingleBlog?.author?._id}/${aSingleBlog?.author?.moniker}`}
                    underline="hover"
                  >
                    Read Full Profile
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Box component={Paper} elevation={2} mb={10} p={2}>
              <Grid
                container
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Grid item>{loader && <CircularProgress />}</Grid>
                <Grid item>
                  <Grid item>
                    <Typography variant="h4" sx={{ px: 2 }}>
                      {" "}
                      {aSingleBlog.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      flexDirection={{ xs: "column", sm: "row" }}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="space-between"
                      spacing={2}
                      mt={2}
                    >
                      <Grid item>
                        <Link
                          href={`/blog/${aSingleBlog.category}`}
                          underline="hover"
                        >
                          {aSingleBlog.category}
                        </Link>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          // justifyContent="flex-start"
                          // alignItems="center"
                          spacing={2}
                        >
                          <Grid item>
                            <IconButton
                              sx={{
                                color: "#1DA1F2",
                                "&:hover": {
                                  backgroundColor: "#1DA1F2",
                                  color: "secondary.main",
                                },
                              }}
                            >
                              <TwitterIcon />
                            </IconButton>
                          </Grid>

                          <Grid item>
                            <IconButton
                              sx={{
                                color: "#3b5998",
                                "&:hover": {
                                  backgroundColor: "#3b5998",
                                  color: "secondary.main",
                                },
                              }}
                            >
                              <FacebookIcon />
                            </IconButton>
                          </Grid>

                          <Grid item>
                            <IconButton
                              sx={{
                                color: "#8a3ab9",
                                "&:hover": {
                                  backgroundColor: "#8a3ab9",
                                  color: "secondary.main",
                                },
                              }}
                            >
                              <InstagramIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Typography variant="body1" component="span">
                          {createdAt}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item mt={5}>
                  <Grid
                    container
                    display={{ xs: "flex", sm: "none" }}
                    //justifyContent="space-between"
                    spacing={2}
                    rowSpacing={{ xs: 0 }}
                  >
                    <Grid item>
                      {aSingleBlog?.author?.avatar ? (
                        <Avatar
                          alt={aSingleBlog?.author?.name}
                          src={aSingleBlog?.author?.avatar}
                        />
                      ) : (
                        <Avatar
                          alt={aSingleBlog?.author?.name}
                          sx={{
                            bgcolor: aSingleBlog?.author?.color,
                          }}
                        >
                          {" "}
                          {aSingleBlog?.author?.initials}{" "}
                        </Avatar>
                      )}
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        {aSingleBlog?.author?.name}
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
                          FollowUser(aSingleBlog?.author?._id);
                        }}
                      >
                        Follow
                      </Button>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-label="favorite"
                        onClick={() => FavoritePost(aSingleBlog._id)}
                        color="error"
                        sx={{ fontSize: 15 }}
                        disabled={!jwtToken}
                      >
                        <Favorites />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Link
                        href={`/user/${aSingleBlog?.author?._id}/${aSingleBlog?.author?.moniker}`}
                        underline="hover"
                      >
                        Read Full Profile
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item mt={5}>
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 920,
                      maxHeight: { xs: 233, md: 300 },
                      maxWidth: { xs: 310, md: 1000 },
                    }}
                    alt={aSingleBlog.title}
                    src={vibes}
                  />
                </Grid>
                <Grid item sx={{ marginTop: 6 }} className="capital">
                  <Typography variant="body1" className="capital">
                    {" "}
                    {aSingleBlog.content}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Carousel */}
        <Box sx={{ bgcolor: "silver", pb: 5 }}>
          <Typography variant="h6" color="secondary">
            {" "}
            Recommended For You:{" "}
          </Typography>
          <Box sx={{ my: 8 }}>
            <Slider {...settings}>
              <div>
                <Paper
                  sx={{
                    p: 2,
                    margin: "auto",
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={vibes} />
                      </ButtonBase>
                    </Grid>

                    <Grid item>
                      <Avatar sx={{ bgcolor: red[500] }}>GA</Avatar>
                    </Grid>

                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography variant="subtitle1" component="div">
                            Standard license
                          </Typography>
                          <Typography variant="body2">
                            Full resolution 1920x1080 • JPEG
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: 1030114
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Button variant="text" color="info">
                            Read
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
              <div>
                <Paper
                  sx={{
                    p: 2,
                    margin: "auto",
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={vibes} />
                      </ButtonBase>
                    </Grid>

                    <Grid item>
                      <Avatar sx={{ bgcolor: red[500] }}>GA</Avatar>
                    </Grid>

                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography variant="subtitle1" component="div">
                            Standard license
                          </Typography>
                          <Typography variant="body2">
                            Full resolution 1920x1080 • JPEG
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: 1030114
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Button variant="text" color="info">
                            Read
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
              <div>
                <Paper
                  sx={{
                    p: 2,
                    margin: "auto",
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={vibes} />
                      </ButtonBase>
                    </Grid>

                    <Grid item>
                      <Avatar sx={{ bgcolor: red[500] }}>GA</Avatar>
                    </Grid>

                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography variant="subtitle1" component="div">
                            Standard license
                          </Typography>
                          <Typography variant="body2">
                            Full resolution 1920x1080 • JPEG
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: 1030114
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Button variant="text" color="info">
                            Read
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </Slider>
          </Box>
        </Box>

        <Grid
          container
          display="flex"
          direction="column"
          justifyContent="center"
          spacing={2}
          marginTop={5}
        >
          {jwtToken && (
            <>
              <Grid item>
                <OutlinedInput
                  id="outlined-basic"
                  placeholder="Comment"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "tertiary.main",
                  }}
                  value={writeComment}
                  onChange={(e) => setWriteComment(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="info"
                  type="button"
                  disabled={!writeComment}
                  onClick={PostComment}
                >
                  Post a Comment
                </Button>
              </Grid>
            </>
          )}
          {aSingleBlog?.comments?.length !== 0 && (
            <Grid item className="comment-container" id="first-comment">
              <Box component={Paper} my={5} p={2}>
                <Grid
                  container
                  display="flex"
                  justifyContent="space-between"
                  spacing={2}
                >
                  {aSingleBlog?.comments?.map((comment, index) => (
                    <Grid item key={index}>
                      <Grid item>
                        {comment?.user?.avatar ? (
                          <Avatar
                            alt={comment?.user?.name}
                            src={comment?.user?.avatar}
                          />
                        ) : (
                          <Avatar
                            alt={comment?.user?.name}
                            sx={{
                              bgcolor: comment?.user?.color,
                            }}
                          >
                            {" "}
                            {comment?.user?.initials}{" "}
                          </Avatar>
                        )}
                      </Grid>
                      <Grid item>
                        <Grid container display="flex" direction="column">
                          <Grid item>
                            <Typography variant="h6">
                              {comment?.user?.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Link
                              // href={`/user/${user._id}/${user.moniker}`}
                              underline="hover"
                            >
                              {comment?.user?.moniker}
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Typography>{comment?.content?.createdAt}</Typography>
                      </Grid>

                      <Grid
                        container
                        display="flex"
                        spacing={2}
                        flexDirection="column"
                        py={3}
                      >
                        <Grid item>
                          <Grid item>{comment?.content}</Grid>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            display="flex"
                            spacing={2}
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <Grid item>
                              <Button
                                variant="text"
                                color="tertiary"
                                type="button"
                                startIcon={<ReplyIcon />}
                                sx={{ "&:hover": { color: "primary.main" } }}
                                onClick={handleOpenReplyComment}
                              >
                                Reply
                              </Button>
                            </Grid>
                            <Grid item>
                              <IconButton
                                aria-label="favorite"
                                onClick={() => FavoriteComment(comment._id)}
                                color="error"
                                sx={{ fontSize: 15 }}
                                disabled={!jwtToken}
                              >
                                <Favorites />
                              </IconButton>
                            </Grid>

                            <Grid item>
                              <Button
                                variant="text"
                                color="tertiary"
                                type="button"
                                startIcon={<ModeCommentIcon />}
                                sx={{ "&:hover": { color: "primary.main" } }}
                                onClick={handleOpenComment}
                              >
                                {comment?.length}&nbsp;Comments
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Nested reply */}
              <Grid item className="comment-container">
                {openReplyComment && (
                  <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    spacing={2}
                  >
                    <Grid item>
                      <OutlinedInput
                        id="outlined-basic"
                        placeholder="Comment"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{
                          backgroundColor: "secondary.main",
                          color: "tertiary.main",
                        }}
                      />
                    </Grid>
                    <Grid item mb={3}>
                      <Button variant="contained" color="info" type="button">
                        Reply Comment
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>

              {/* Nested Comments */}

              <Grid item className="comment-container" dataset="first-comment">
                {openComment && (
                  <Box component={Paper} mb={10} p={2}>
                    <Grid
                      container
                      display="flex"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Grid item>
                        <Avatar sx={{ bgcolor: red[500] }}>GA</Avatar>
                      </Grid>
                      <Grid item>
                        <Grid container display="flex" direction="column">
                          <Grid item>
                            <Typography variant="h6">Name</Typography>
                          </Grid>
                          <Grid item>
                            <Link
                              // href={`/user/${user._id}/${user.moniker}`}
                              underline="hover"
                            >
                              @moniker
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography>Date</Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      display="flex"
                      spacing={2}
                      flexDirection="column"
                      py={3}
                    >
                      <Grid item>
                        <Grid item>Contents</Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          display="flex"
                          spacing={2}
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <Grid item>
                            <Button
                              variant="text"
                              color="tertiary"
                              type="button"
                              startIcon={<ReplyIcon />}
                              sx={{ "&:hover": { color: "primary.main" } }}
                              onClick={handleOpenReplyComment}
                            >
                              Reply
                            </Button>
                          </Grid>
                          <Grid item>
                            <IconButton
                              aria-label="favorite"
                              onClick={() => FavoriteComment(aSingleBlog._id)}
                              color="error"
                              sx={{ fontSize: 15 }}
                              disabled={!jwtToken}
                            >
                              <Favorites />
                            </IconButton>
                          </Grid>

                          <Grid item>
                            <Button
                              variant="text"
                              color="tertiary"
                              type="button"
                              startIcon={<ModeCommentIcon />}
                              sx={{ "&:hover": { color: "primary.main" } }}
                              onClick={handleOpenComment}
                            >
                              0 Comments
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </LandingPage>
  );
}

export default ReadFullBlog;
