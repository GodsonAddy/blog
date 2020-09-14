import React from 'react';
import './App.css';
import {Typography, Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';



const Main = ({history}) => {
    
    const handleClick = () => {
        history.push("/Create");
    }

    return (
        <div>
            <div className="container">
              <img  src="https://i.ytimg.com/vi/dWrvT_-mUro/maxresdefault.jpg" alt="" 
               style={{width:"100%" }} />
                <div className="centered">
                    <Typography variant="h3" >
                      Welcome To BlogPost
                    </Typography>
                    <Button color="primary" variant="contained" onClick={handleClick}>
                        Create Your Blog Here
                    </Button>
                </div>
            </div>  
        </div>
    ) 
}


export default withRouter(Main);