import React, { useState, useEffect } from 'react';
import Posting from "../components/PostDisplay"
import { supabase } from '../client'
import "./Home.css"
import "./Home.css";

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('created_at');

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select();

            setPosts(data)
        }
        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    }

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortBy === 'created_at') {
            return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy === 'likes') {
            return b.likes - a.likes;
        }
    });

    const filteredPosts = sortedPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="ReadPosts">
            <div className="Homepage_title">Foodie</div>
            <div className="SearchBar">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="SortBy">
                <label>Sort By:</label>
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="created_at">Created Time</option>
                    <option value="likes">Upvotes Count</option>
                </select>
            </div>
            <div className="PostsContainer">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Posting
                            key={post.id}
                            post={post}
                        />
                    ))
                ) : (
                    <h2 className="NoPostsMessage">No Posts Found 😞</h2>
                )}
            </div>
        </div>
    );
};

export default Home;
