import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { supabase } from '../client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./Post.css"

const Post = () => {
    const { id } = useParams();
    const [commentInput, setCommentInput] = useState("");
    const [post, setPost] = useState({
      title: "",
      author: "",
      image: "",
      ingredients: [],
      steps: [],
      comments: [],
      likes: 0
    });

    useEffect(() => {
      const fetchPosts = async () => {
          const { data } = await supabase
              .from('Posts')
              .select('*')
              .eq('id', id)
              .single()
            if (data) {
              setPost(data);
            }
      };
      fetchPosts();
    }, [id]);

    const handleLike = async () => {
      const updatedLikes = post.likes + 1;
      setPost(prevPost => ({
        ...prevPost,
        likes: updatedLikes
      }));
    
      await supabase
        .from('Posts')
        .update({ likes: updatedLikes })
        .eq('id', id);
    };

    const handleComment = async () => {
      const trimmedInput = commentInput.trim();
      if (trimmedInput !== "") {
        const updatedComments = [...post.comments, trimmedInput];
        await supabase
          .from('Posts')
          .update({ comments: updatedComments })
          .eq('id', id);
    
        setPost(prevPost => ({
          ...prevPost,
          comments: updatedComments
        }));
    
        setCommentInput("");
      }
    };    

  function ListMaker({ list }) {
    return (
      <div className="in_div">
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  function DateDisplay({ date }) {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
  
    return <h2 className="time">{formattedDate}</h2>;
  }

  return (
    <div className="post_display">
      <div className="headding_post">
        <div className="left_side">
          <h2 className="title">{post.title}</h2>
          <h3 className="author">By: {post.author}</h3>
        </div>
        <DateDisplay date={post.created_at} />
      </div>
      <img className="image" src={post.image} alt="food"/>
      <div className="side">
        <div className="ingredients"> 
          <ListMaker list={post.ingredients}/>
        </div>
        <div className="likeSection">
          <div className="likes">
            <h2 className="likes">Likes: {post.likes}</h2>
            <FontAwesomeIcon icon={faHeart} className="likeButton" onClick={handleLike} />
          </div>
          <Link to={`/${id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <button className="editButton">Edit Post</button>
          </Link>
        </div>
      </div>
      <div className="commentsSection">
          <h2>Comments</h2>
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <input className="commentsBar" type="text" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
          <button onClick={handleComment}>Add Comment</button>
        </div>
    </div>
  );
};

export default Post;
