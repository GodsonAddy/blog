import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import BlogContext from './context/blog-context';
import BlogItem from './BlogItem';




const Body = () => {
  
  const {blogup, toggleBlog, deleteBlog} = useContext(BlogContext);
  
  
  return(
      
    <div>
      <div>
        {blogup && blogup.map(blog => (
        <BlogItem 
          key={blog.id}
          text={blog.text} 
          clickToToggle={() => toggleBlog(blog.id)} 
          clickToDelete={() => deleteBlog(blog.id)}
          complete={blog.complete}
        />
        ) 
        )}
      </div>
    </div>
        
  )
}


export default  withRouter(Body);