import { Container, Paper, Grid, Typography, Avatar, Button, IconButton, ButtonGroup, Card, TextField, OutlinedInput, Divider } from '@mui/material';
import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import { red } from "@mui/material/colors";
import { useSelector } from 'react-redux';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import './readblog.css';
import NavigationBar from '../LandingPage/NavigationBar';
import LandingFooter from '../LandingPage/landingfooter';
import ButtonBase from '@mui/material/ButtonBase';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@mui/system';




const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});



const TwitterButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#fff"),
    backgroundColor: "#1DA1F2",
    '&:hover': {
      backgroundColor: "#1DA1F2",
    },
  }));

  const FacebookButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#4267B2"),
    backgroundColor: "#3b5998",
    '&:hover': {
      backgroundColor: "#3b5998",
    },
  }));

  const InstagramButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#fff"),
    backgroundColor: "#8a3ab9",
    '&:hover': {
      backgroundColor: "#8a3ab9",
    },
  }));

function ReadFullBlog (props) {
    const { allBlogs} = useSelector(state => state.blogs);
    const getId = parseInt(props.match.params.id, 10);
    const data = allBlogs[getId - 1];

    if (getId !==0 && !getId) {
        return <Redirect to={{ pathname: "/404"}} />
    }
    
    console.log(data);
    console.warn(props);

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
        <>
        <NavigationBar />
        <Container sx={{backgroundColor: 'tertiary.main', mb: 5, maxHeight: '100%'}}>
            <Grid
                 container
                 component="main"
                 sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    
                    my: 4,
                
                 }}
                 spacing={3}
                 
            >
                <Grid item xs={3} >
                    <Paper elevation={2}>
                        <Grid
                            container
                            component="main"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 2,
                                
                            }}
                            
                        >
                            <Grid item>
                                <Avatar sx={{ bgcolor: red[500], width: 56, height: 56 }}>
                                    GA
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">Godson Addy</Typography>
                            </Grid>
                            <Grid item>
                                <Button >SUBSCRIBE</Button>
                            </Grid>
                            <Grid item>
                                <IconButton >
                                    <FavoriteBorderIcon />
                                </IconButton>
                                <Typography variant="body1" component="span">10K</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton >
                                    <ModeCommentIcon />
                                </IconButton>
                                <Typography variant="body1" component="span">COMMENTS</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={9}>
                    <Paper elevation={2} >
                    <Grid 
                        container
                        component="main"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            //alignItems: "center",
                            justifyContent: "space-between",
                            padding: 2
                        }}
                    >
                        <Grid item>
                           
                            <Grid item>
                                <Typography variant="h4" className='header'> {data.title}</Typography>
                            </Grid>

                            <Grid 
                                container
                                component="main"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                                
                            >
                                <Grid item>
                                    <Typography variant="body1" component="span">
                                        Countries
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <ButtonGroup variant="contained" aria-label="outlined button group">
                                        <TwitterButton sx={{ color: "white" }}startIcon={<TwitterIcon />}>
                                            Twitter
                                        </TwitterButton>
                                        <FacebookButton startIcon={<FacebookIcon />}>
                                            Facebook
                                        </FacebookButton>
                                        <InstagramButton sx={{ color: "white" }} startIcon={<InstagramIcon />}>
                                            Instagram
                                        </InstagramButton>
                                    </ButtonGroup>
                                </Grid>

                                <Grid item>
                                    <Typography variant="body1" component="span">
                                        Date
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                        
                        <Grid item sx={{marginTop: 6}}>
                            <img 
                                src={data.imgPath? data.imgPath : null}
                                alt={data.title}
                            />
                        </Grid>
                        <Grid item sx={{marginTop: 6}} className='capital'>
                            <Typography variant="body1" className='capital'> {data.body}</Typography>
                        </Grid>
                    </Grid>
                    </Paper>
                </Grid>

            </Grid>

            <Typography variant='h6'> Recommended For You: </Typography>
                <Box sx={{my: 8}} >
                    <Slider {...settings}>
                        <div>
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 500,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>

                            <Grid item>
                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                    <Img alt="complex" src="/static/images/grid/complex.jpg" />
                                </ButtonBase>
                            </Grid>

                            <Grid item>
                                <Avatar sx={{ bgcolor: red[500]}}>
                                    GA
                                </Avatar>
                            </Grid>

                            <Grid item xs={12} sm container>

                                <Grid item xs container direction="column" spacing={2}>

                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920x1080 • JPEG
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Button variant='text' color='info'>
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
                            margin: 'auto',
                            maxWidth: 500,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>

                            <Grid item>
                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                    <Img alt="complex" src="/static/images/grid/complex.jpg" />
                                </ButtonBase>
                            </Grid>

                            <Grid item>
                                <Avatar sx={{ bgcolor: red[500]}}>
                                    GA
                                </Avatar>
                            </Grid>

                            <Grid item xs={12} sm container>

                                <Grid item xs container direction="column" spacing={2}>

                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920x1080 • JPEG
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Button variant='text' color='info'>
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
                            margin: 'auto',
                            maxWidth: 500,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>

                            <Grid item>
                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                    <Img alt="complex" src="/static/images/grid/complex.jpg" />
                                </ButtonBase>
                            </Grid>

                            <Grid item>
                                <Avatar sx={{ bgcolor: red[500]}}>
                                    GA
                                </Avatar>
                            </Grid>

                            <Grid item xs={12} sm container>

                                <Grid item xs container direction="column" spacing={2}>

                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920x1080 • JPEG
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Button variant='text' color='info'>
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

            <Grid 
                container
                display='flex'
                direction='column'
                justifyContent='center'
                spacing={2}
                marginTop={5}
                
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
                            
                            backgroundColor: 'secondary.main',
                            color: 'primary.main'
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button variant='contained' color='info'> Post a Comment</Button>
                </Grid>

                <Grid item>
                    <Grid
                        container
                        display='flex'
                        alignItems='center'
                        component='Paper'
                        direction='row'
                        sx={{
                            my: 5
                        }}
                        spacing={2}
                    >
                        <Grid item>
                            <Avatar sx={{ bgcolor: red[500]}}>
                                GA
                            </Avatar>
                        </Grid>

                        <Grid item>
                            <Paper>

                            <Grid
                                container
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                direction='column'
                                sx={{
                                    my: 5
                                }}
                                spacing={2}
                            >

                                <Grid item>
                                    <Typography>Name</Typography>
                                </Grid>

                                <Divider flexItem variant='fullWidth' />

                                <Grid item gutterBottom>
                                    Contents
                                </Grid>

                                <Grid item >
                                    <Button variant='contained' color='info'>
                                        Reply
                                    </Button>
                                </Grid>
                            </Grid>
                            </Paper>

                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Container>

        <LandingFooter />
        </>
    )
}

export default withRouter(ReadFullBlog);