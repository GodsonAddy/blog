import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Card,  Button, CardContent, Typography, CircularProgress } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

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
  
  
  const handlePasswordChange = (event, newValue) => {
    setPassword(password);
  };
   
  const handleEmailChange = (event, newValue) => {
    setEmail(email);
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
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <Grid  container direction="column" justify="space-evenly" alignItems="center">
                  <Typography variant='h6'>
                  SignIn to create your Blog
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
                  <Button variant="contained" onClick={handleSubmit} color="secondary" fullWidth> Sign In</Button>
                </Grid>
                
              </div>
            </form>
          
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