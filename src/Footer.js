import React from 'react';
import './App.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import {IconButton} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
    return (
        <div className="foot">
            <footer  className="copy">
                &copy; 2020
                <div className="contact">
                    <p> Contacts </p>
                    <IconButton >
                        <TwitterIcon  color="primary"/>
                        <InstagramIcon  color="primary"/>
                        <FacebookIcon  color="primary"/>
                    </IconButton>
                </div>
            </footer>
        </div>

    )
}



export default Footer;