import React from 'react'

const BlogItem = ({text, clickToToggle, clickToDelete}) => {
    return (
        <div>
            <span>{text}</span>
            <div>
                <button onClick={clickToToggle}>TOGGLE</button>
                <button onClick={clickToDelete}>DELETE</button>
            </div>  
        </div>
    )
}

export default BlogItem;
