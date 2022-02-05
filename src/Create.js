import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Bilal");
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // Preventing default action of submit
        event.preventDefault();

        // Creating blog object
        const blog = {
            title,
            body,
            author
        }

        setIsPending(true);
        
        setTimeout(() => {
            // Second parameter in fetch for setting POST options
            fetch("http://localhost:8000/blogs", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(blog)
            }).then(() => {
                setIsPending(false);
                navigate("/");
            })
        },500);
    }

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Blog Title</label>
                <input type="text" required value={title} onChange={(event) => setTitle(event.target.value)}/>
                
                <label htmlFor="">Blog</label>
                <textarea name="" id="" cols="30" rows="10" value={body} onChange={(event) => setBody(event.target.value)}>

                </textarea>

                <label htmlFor="">Author</label>
                <select value={author} onChange={(event) => setAuthor(event.target.value)}>
                    <option value="Bilal">Bilal</option>
                    <option value="Ayad">Ayad</option>
                </select>
                {isPending && <button>Adding Blog...</button>}
                {!isPending && <button>Add Blog</button>}
            </form>
        </div>
    )
}

export default Create;