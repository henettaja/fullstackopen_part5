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
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <label for="username">Username</label>
          <input id="username" name='Username' type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
          <label for="password">Password</label>
          <input id="password" name='Password' type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          <br/>
          <button className="button-primary" type='submit'>Log in</button>
        </form>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="container">
        { loginForm() }
      </div>
    )
  } else {
    return (
        <div className="container">
          <p>{ user.name } logged in</p>
          <button onClick={() => setUser(null)}>Log out</button>

          <h2>blogs</h2>
          {
            blogs.map((blog) =>
            <Blog key={blog.id} blog={blog} />
            )
          }
        </div>
      )
  }
}

export default App
