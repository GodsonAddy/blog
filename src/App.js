import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';
import LogIn from './LogIn';
import Bloggers from './Bloggers';
import WriteBlog from './WriteBlog';

function App() {
 
  return (
    <div >
      <Switch>
        <Route exact path='/' component={LogIn} />
        <Route  path="/Home" component={Bloggers} />
        <Route path="/Create" component={WriteBlog} />
        <Route path="/" component={LogIn} />
      </Switch>
    </div>
  );
}

export default App;
