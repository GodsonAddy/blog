import React, {useState, useContext} from 'react';
import { Button} from '@material-ui/core';
import './App.css';
import BlogContext from './context/blog-context';




const CreateBlog = () => {
    const [blog, setBlog] = useState("");
    
    const {addBlog} = useContext(BlogContext);

    function handleClick(e) {
        e.preventDefault();

        const newBlog = {
            id: Math.random(),
            text: blog,
            complete: false
        }

        addBlog(newBlog)
        setBlog("")
    }

    function handleChange(e) {
        setBlog(e.target.value)
       
    }

    return (  
        <div>
            <div style={{margin: "60px"}}>
                <form>
                    <center>
                        <textarea type="text" value={blog} onChange={handleChange}/>
                        <Button variant="contained" color="primary" type="submit" onClick={handleClick}>
                            SUBMIT  
                        </Button>
                    </center>  
                </form>      
            </div>   
        </div>        
    )
}
    

export default CreateBlog;