import React from 'react';
import {Grid, Paper, Typography, Box} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


function SocialMedia () {
    return (
        <div><Box 
                component={Paper}
                elevation={2}
                margin={2}
            >
            <Grid
                container
                display='flex'
                flexDirection='column'
                spacing={2}
                padding={2}
                
            >
                <Grid item>
                    <Typography>Top Social Media Shared</Typography>
                </Grid>

                <Grid item>
                    <Grid      
                        container
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='flex-start'
                        spacing={2}
                        marginTop={2}
                    >
                        <Grid item>
                            <TwitterIcon sx={{color:"#1DA1F2"}}/>
                        </Grid>
                        <Grid item marginLeft={-10}>
                            <Typography>Twitter</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>23k</Typography>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item>
                    <Grid      
                        container
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='flex-start'
                        spacing={2}
                        marginTop={2}
                    >
                        <Grid item>
                            <FacebookIcon sx={{color:'#3b5998'}}/>
                        </Grid>
                        <Grid item marginLeft={-10}>
                            <Typography>Facebook</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>23k</Typography>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item>
                    <Grid      
                        container
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='flex-start'
                        spacing={2}
                        marginTop={2}
                        marginBottom={2}
                    
                    >
                        <Grid item>
                            <InstagramIcon sx={{color:"#8a3ab9"}}/>
                        </Grid>
                        <Grid item marginLeft={-10}>
                            <Typography>Instagram</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>23k</Typography>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
            </Box>
        </div>
    )
}


export default SocialMedia;