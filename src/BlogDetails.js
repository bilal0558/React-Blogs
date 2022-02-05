import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
    // Getting the id from Route Paramter
    const { id } = useParams();
    const { data: blog, isLoading, error} = useFetch(`http://localhost:8000/blogs/${ id }`);
    const navigate = useNavigate();
    
    const handleClick = () => {
        fetch(`http://localhost:8000/blogs/${ id }`, {
            method: "DELETE"
        }).then(()=> {
            navigate("/");
        })
    }

    return (
        <div className="blog-details">
            { isLoading && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written By: { blog.author }</p>
                    <p>{ blog.body }</p>
                    <button onClick={handleClick}>Delete Blog</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails;