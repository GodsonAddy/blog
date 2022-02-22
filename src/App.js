import React, {useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import LogIn from './components/Login';
import ProtectedRoute from './protectedRoute';
import SignUp from './components/Signup';
import {getUser} from './actions/userAction';
import {store} from './store'
import { CssBaseline } from '@mui/material';
import LandingPage from './components/LandingPage';
import ReadFullBlog from './components/DynamicRoute/readblog';
import PageNotFound from './components/pageNotFound';
import Dashboard from './components/UserDashboard/Dashboard';
import Posted from './components/UserDashboard/Post';
import Settings from './components/UserDashboard/UserSettings'

function App() {


  useEffect(() => {
    store.dispatch(getUser())
    console.log("user")
  }, [])
 
  return (
    <div className='vibes'>
      <CssBaseline />
      <Switch>
        <Route  exact path="/" component={LandingPage} />  
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/blog/:id/:title' render={props => <ReadFullBlog {...props}/>} />
        <Route exact path='/404' component={PageNotFound} />
        <ProtectedRoute exact path="/myaccount/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/myaccount/posts" component={Posted} />
        <ProtectedRoute exact path="/myaccount/settings" component={Settings} />
      </Switch>
    </div>
  );
}

export default App;
