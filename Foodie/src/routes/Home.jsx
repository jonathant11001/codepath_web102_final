import React, { useState, useEffect } from 'react';
import Posting from "../components/PostDisplay"
import { supabase } from '../client'
import "./Home.css"

const ReadPosts = (props) => {
    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
              .from('Posts')
              .select();
          
            setPosts(data)
        }
        fetchPosts();
        setPosts(props.data);
    }, [props]);

    return (
        <div className="ReadPosts">
            <div className="Homepage_title">Foodie</div>
            {
                Posts && Posts.length > 0 ?
                Posts.map((Post) => 
                    <Posting 
                    post = {Post} 
                    />
                ) : <h2>No Posts Yet 😞</h2>
            }
        </div>  
    );
};

export default ReadPosts;