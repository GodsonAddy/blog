import  {ADD_BLOG, TOGGLE_BLOG, DELETE_BLOG} from './blog-actions';


const BlogReducer = (state, action) => {
    switch(action.type) {
        case ADD_BLOG :
            return {
                ...state,
                blogup: [...state.blogup, action.payload]
            };
        case TOGGLE_BLOG :
            return {
                ...state,
                blogup: state.blogup.map(blog => blog.id === action.payload ? 
                {...blog, complete: !blog.complete} : blog)
            };
        case DELETE_BLOG :
            return {
                ...state,
                blogup: state.blogup.filter(blog => blog.id !== action.payload)
            };
            default:
                return state

    }
}

export default BlogReducer;