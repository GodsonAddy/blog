import React from 'react';
import NavigationBar from './LandingPage/NavigationBar';
import LandingFooter from './LandingPage/landingfooter';
import {Typography, Container, Grid} from '@mui/material';



function PageNotFound () {
    return (
        <>
            <NavigationBar />

            <Container>
                <Grid
                    container
                    display='flex'
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    spacing={4}
                    marginTop={5}
                    marginBottom={12}
                >
                    <Grid item>
                        <Typography variant='h1'>
                            404
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant='h6'>
                            OOOPS, PAGE NOT FOUND!
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant='body1'>
                            The page you are looking for either has moved or doesn't exists in 
                            this server.Try search again!
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
            <LandingFooter />
        </>
    )
}


export default PageNotFound;