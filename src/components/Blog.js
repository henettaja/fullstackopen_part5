import { useState } from 'react';

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    }

    const blogStyle = {
      maxWidth: '500px',
      backgroundColor: 'aliceblue',
      borderRadius: '1.5rem',
      padding: '3rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    }

    const mainViewStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '5rem',
    }

    const detailsStyle = {
      display: showDetails ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '1rem'
    }

  return (
    <li style={blogStyle}>
      <div style={mainViewStyle}>
        <h3 style={{fontSize: '2rem', margin: 0}}>{ blog.title + ' by ' + blog.author}</h3>
        <button style={{margin: 0}} onClick={() => toggleDetails()}>Show details</button>
      </div>

      <div style={detailsStyle}>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          Likes: {blog.likes}
          <button style={{margin: 0, padding: '10px', lineHeight: 1}} onClick={() => toggleDetails()}>Like</button>
        </div>
        <div>Added by: {blog.user.name}</div>
        <div>URL: <a target="_blank" href={blog.url} rel="noreferrer">{blog.url}</a></div>
      </div>

    </li>
  );
}

export default Blog
