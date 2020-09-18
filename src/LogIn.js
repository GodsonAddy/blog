import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Card,  Button, CardContent, Typography, CircularProgress } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Tabs, Tab, AppBar, Box} from '@material-ui/core'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    width: '100%',
    
  },
  style: {
    margin: "100px 400px 100px 400px",
    minWidth: 275,
    
  },
  
}));

const LogIn = ({ history}) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  
  
  const handlePasswordChange = (event, newValue) => {
    setPassword(password);
  };
   
  const handleEmailChange = (event, newValue) => {
    setEmail(email);
  };

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      history.push("/Home")
    }, 2000)
    
  }
  return (
    <div>
      <Typography variant="h3">
        BlogPost
      </Typography>
        <Card className={classes.style}>
          <CardContent>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  scrollButtons="on"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="scrollable force tabs example">
                  <Tab label="Sign Up"  {...a11yProps(0)} />
                  <Tab label="Sign In" edge="end" {...a11yProps(1)} />      
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <form className={classes.root} action="/api/users" method="POST" noValidate autoComplete="off">
                  <div>
                    <Grid  container direction="column" justify="space-evenly" alignItems="center">
                      <Typography variant='h6'>
                        SignUp here to create your Blog
                      </Typography>
                      <TextField
                        id="standard-email-input"
                        label="E-mail"
                        type="email"
                        autoComplete="current-email"
                        fullWidth
                        onChange={handleEmailChange}
                        name="email"
                      />
                      <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        onChange={handlePasswordChange}
                        name="password"
                      />

                      <TextField
                        id="standard-password-input"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        onChange={handlePasswordChange}
                        name="password"
                      />
                      <br />
                      <Button variant="contained" onClick={handleSubmit} color="secondary" fullWidth> 
                        Sign Up
                      </Button>
                    </Grid>            
                  </div>
                </form>
              </TabPanel>
              
              <TabPanel value={value} index={1}>
                <form action="/api/users" method="GET" className={classes.root} noValidate autoComplete="off">
                  <div>
                    <Grid  container direction="column" justify="space-evenly" alignItems="center">
                      <Typography variant='h6'>
                        SignIn here to create your Blog
                      </Typography>
                      <TextField
                        id="standard-email-input"
                        label="E-mail"
                        type="email"
                        autoComplete="current-email"
                        fullWidth
                        onChange={handleEmailChange}
                      />
                        
                      <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        onChange={handlePasswordChange}
                      />
                      <br />
                      <Button variant="contained" onClick={handleSubmit} color="secondary" fullWidth> 
                      Sign In
                      </Button>
                    </Grid>
                  </div>
                </form>
              </TabPanel>
            </div>
          </CardContent>
        </Card>
      <center>
        {loading && <CircularProgress color="secondary" />}
      </center>
    </div>
    );
  }
  
  
  
  export default LogIn;