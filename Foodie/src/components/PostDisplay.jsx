import { Link } from 'react-router-dom';
import './PostDisplay.css'

const PostDisplay = ({post}) => {

  function ListMaker({ list }) {
    return (
      <div className="in_div">
        <h1 className="in_title">Ingredients</h1>
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
    <Link to={`/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="post_display">
      <div className="headding_post">
        <div className="left_side">
          <h2 className="title">{post.title}</h2>
          <h3 className="author">By: {post.author}</h3>
        </div>
      <DateDisplay className="time" date={post.created_at}/>
      </div>
      <img className="image" src={post.image} alt="food"/>
      <div className="side">
        <div className="ingredients"> 
          <ListMaker list={post.ingredients}/>
        </div>
        <h2 className="likes">Likes: {post.likes}</h2>
      </div>
    </div>
    </Link>
  );
};

export default PostDisplay;
