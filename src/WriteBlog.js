import React from 'react';
import BlogState from './context/BlogState';
import CreateBlog from './CreateBlog'
import NavBar from './NavBar';
import Body from './Body';

const WriteBlog = () => {
    return (
        <div>
            <NavBar />
            <BlogState>
                <CreateBlog /> 
                <Body />  
            </BlogState>
        </div>
    )  
}

export default WriteBlog;
