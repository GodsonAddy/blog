import {ADD_BLOG, LIKE_BLOG, DELETE_BLOG, FETCH_BLOG, COMMENT_BLOG} from './types';
import axios from 'axios'

export const fetchBlogs = ( ) => async (dispatch) => {
    console.log("fetch")
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=8')
        dispatch({
            type: FETCH_BLOG,
            payload: response.data
        })
    }
    catch(err) {
        console.log(err)
    }

}

export const addBlog = (blog) => async (dispatch) =>{
    const body = JSON.stringify(blog)
    try {
        await axios.post('https://jsonplaceholder.typicode.com/posts', {body})
        dispatch({
            type: ADD_BLOG,
            payload: body
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const commentBlog = (blog) => (dispatch) =>{
    dispatch({
        type: COMMENT_BLOG,
        payload: blog
    })
}

export const likeBlog = (blogID) => (dispatch) => {
    dispatch({
        type: LIKE_BLOG,
        payload: blogID
    })
}

export const deleteBlog = (blogID) => (dispatch) => {
    dispatch({
        type: DELETE_BLOG,
        payload: blogID
    })
}
