import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username, password);

    try {
      loginService.login({ username, password }).then(user => {
        console.log(user);
        window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(user)
        );
        blogService.setToken(user.token);
        setUser(user);
        setUsername('');
        setPassword('');
      });
    } catch (e) {
      console.log(e);
    }
  }

  const saveBlog = (event) => {
    event.preventDefault();

    try {
      blogService.saveBlog({
        title: event.target.Title.value,
        author: event.target.Author.value,
        url: event.target.URL.value,
      }).then(blog => {
        setBlogs(blogs.concat(blog));
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem('loggedBlogAppUser');
    } else {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])


  const loginForm = () => {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input id="username" name='Username' type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
          <label htmlFor="password">Password</label>
          <input id="password" name='Password' type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          <br/>
          <button className="button-primary" type='submit'>Log in</button>
        </form>
      </div>
    );
  }

  const loggedIn = () => {
    return (
      <div>
        <div className="row">
          <div className="one-third column">
            <p>{ user.name } logged in</p>
          </div>
          <div className="one-third column u-pull-right">
            <button onClick={() => setUser(null)}>Log out</button>
          </div>
        </div>

        <h2>Add a new blog</h2>
        <form onSubmit={saveBlog}>
          <div className="row">
            <div className="one-half column">
              <label htmlFor="title">Title</label>
              <input className="u-full-width" id="title" name='Title' type='text'/>
            </div>
            <div className="one-half column">
              <label htmlFor="author">Author</label>
              <input className="u-full-width" id="author" name='Author' type='text'/>
            </div>
          </div>
          <label htmlFor="url">URL</label>
          <input className="u-full-width" id="url" name='URL' type='text'/>
          <br/>
          <button className="button-primary" type='submit'>Add</button>
        </form>

        <h2>Blogs</h2>
        {
          blogs.map((blog) =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Blog pocket</h1>
      <p>Save blogs you find interesting so you can find them in the future</p>
      { user === null ? loginForm() : loggedIn()}
    </div>
  )
}

export default App
