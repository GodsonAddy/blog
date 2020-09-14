import React, {useReducer} from 'react';
import BlogContext from './blog-context';
import BlogReducer from './blog-reducer';
import {ADD_BLOG, TOGGLE_BLOG, DELETE_BLOG} from './blog-actions'

const BlogState = (props) => {
    const initialState = {
        blogup: [] 
    }

    const [state, dispatch] = useReducer(BlogReducer, initialState);

    const addBlog = (blog) => {
        dispatch({
            type: ADD_BLOG,
            payload: blog
        })
    }

    const toggleBlog = (blogID) => {
        dispatch({
            type: TOGGLE_BLOG,
            payload: blogID
        })
    }

    const deleteBlog = (blogID) => {
        dispatch({
            type: DELETE_BLOG,
            payload: blogID
        })
    }

    return (
        <BlogContext.Provider 
            value={{ 
                blogup: state.blogup,
                addBlog,
                toggleBlog,
                deleteBlog
            }}
        >
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState
