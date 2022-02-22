import  {ADD_BLOG, LIKE_BLOG, DELETE_BLOG, FETCH_BLOG, COMMENT_BLOG} from '../actions/types';

const initialState = {
    allBlogs: [],
    userBlogs: {}
}

const blogReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_BLOG:
            console.log("fetches", action.payload)
            return {
                ...state,
                allBlogs: action.payload
            };
        case ADD_BLOG :
            console.log("add")
            return {
                ...state,
                userBlogs: action.payload
            };
        case LIKE_BLOG :
            return {
                ...state,
                userBlogs: state.userBlogs.map(blog => blog.id === action.payload ? 
                {...blog, complete: !blog.complete} : blog)
            };
        case DELETE_BLOG :
            return {
                ...state,
                userBlogs: state.blogup.filter(blog => blog.id !== action.payload)
            };
        case COMMENT_BLOG:
            return {};
        default:
            return state

    }
}

export default blogReducer