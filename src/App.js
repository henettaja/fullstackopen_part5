import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [toast, setToast] = useState(null)

  const blogFormRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();

    loginService.login({ username, password }).then(user => {
        window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(user)
        );
        blogService.setToken(user.token);
        setUser(user);
        setUsername('');
        setPassword('');
      }).catch(e => {
        console.error(e);
        setToast('Wrong username or password');
      });
  }

  const saveBlog = (blog) => {
    blogService.saveBlog(blog).then(blog => {
      setBlogs(blogs.concat(blog));
      setToast(`Blog ${blog.title} by ${blog.author} added`);
      blogFormRef.current.toggleVisibility()
    }).catch(e => {
      console.log(e);
      setToast('Failed to save the blog');
    });
  }

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem('loggedBlogAppUser');
    } else {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      ).catch(e => {
        console.error(e);
        setToast('Failed to fetch blogs');
      })
    }
  }, [user])

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(null);
      }, 5000);
    }
  }, [toast])


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

        <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
            <BlogForm saveBlog={saveBlog} />
        </Togglable>

        <h2>Blogs</h2>
        <ul style={
          {
            listStyleType: 'none',
            margin: '1rem'
          }
        }>
          {
            blogs.map((blog) =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </ul>
      </div>
    )
  }

  const toastMessage = () => {
    return (
      <pre>
        <code>{toast}</code>
      </pre>
    )
  }

  return (
    <div className="container">
      { toast ? toastMessage() : null }
      <h1>Blog pocket</h1>
      <p>Save blogs you find interesting so you can find them in the future</p>
      { user === null ? loginForm() : loggedIn()}
    </div>
  )
}

export default App
