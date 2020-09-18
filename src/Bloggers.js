import React from 'react';
import Main from './Main';
import Footer from './Footer';
import NavBar from './NavBar';
import Body from './Body';
import BlogState from './context/BlogState';




const Bloggers = () => {
    return (
        <div>
           <NavBar />
           <Main />
           <BlogState>
            <Body />
           </BlogState>
           <Footer />
        </div>
    )
}

export default Bloggers;