import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { supabase } from '../client';
import './EditPost.css'

const EditPosts = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState({
        title: "",
        author: "",
        image: "",
        ingredients: [],
        steps: []
    });
    const [originalPosts, setOriginalPosts] = useState({
        title: "",
        author: "",
        image: "",
        ingredients: [],
        steps: []
    });

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();
            if (data) {
                setOriginalPosts(data);
            }
        };

        fetchPosts();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPosts(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const updatePosts = async (event) => {
        event.preventDefault();
    
        await supabase
            .from('Posts')
            .update({
                title: posts.title,
                author: posts.author,
                image: posts.image,
                ingredients: posts.ingredients,
                steps: posts.steps
            })
            .eq('id', id);
        window.location = "http://localhost:5173/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('id', id); 
      
        window.location = "http://localhost:5173/";
    }

    return (
        <div onSubmit={updatePosts}>
            <form>
                <label htmlFor="title">Title: {originalPosts.title}</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />

                <label htmlFor="author">Author: {originalPosts.author}</label><br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br />

                <label htmlFor="image">Image: {originalPosts.image}</label><br />
                <input type="text" id="image" name="image" onChange={handleChange} /><br />
                <br />

                <label htmlFor="ingredients">Ingredients</label><br />
                <textarea type="text" id="ingredients" name="ingredients" onChange={handleChange} /><br />
                <br />

                <label htmlFor="steps">Steps</label><br />
                <textarea type="text" id="steps" name="steps" onChange={handleChange} /><br />
                <br />

                <input type="submit" value="Submit" onSubmit={updatePosts}/><br/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPosts;