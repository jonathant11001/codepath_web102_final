import React, { useState } from 'react';
import { supabase } from '../client'

function CreateAPost() {
    const [Posts, setPosts] = useState({
        title: "",
        author: "",
        image: "",
        ingredients: [],
        steps: [],
        comments: []
    });

    const formatIngredients = (ingredientsString) => {
        return ingredientsString.split('\n').map(ingredient => ingredient.trim());
    }

    const formatSteps = (stepsString) => {
        return stepsString.split('\n').map(step => step.trim());
    }
    
    const CreatePosts = async (event) => {
        event.preventDefault();

        const formattedIngredients = formatIngredients(Posts.ingredients);
        const formattedSteps = formatSteps(Posts.steps);
      
        await supabase
            .from('Posts')
            .insert({
                title: Posts.title,
                author: Posts.author,
                image: Posts.image,
                ingredients: formattedIngredients,
                steps: formattedSteps,
                comments: Posts.comments
            })
            .select();
        alert("Post '" + Posts.title + "' is all set");
        window.location.href = "http://localhost:5173/";
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPosts( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form onSubmit={CreatePosts}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />

                <label htmlFor="author">Author</label> <br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br />

                <label htmlFor="image">Image</label><br />
                <input type="text" id="image" name="image" onChange={handleChange} /><br />
                <br />

                <label htmlFor="ingredients">Ingredients (Move to next line for each new Ingredient)</label><br />
                <textarea type="text" id="ingredients" name="ingredients" onChange={handleChange} /><br />
                <br />

                <label htmlFor="steps">Steps (Move to next line for each new Steps)</label><br />
                <textarea type="text" id="steps" name="steps" onChange={handleChange} /><br />
                <br />

                <br />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default CreateAPost;
