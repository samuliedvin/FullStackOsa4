import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      error: null,
      user: null,
      newTitle: '',
      newUrl: '',
      newAuthor: '',
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user})
      blogService.setToken(user.token)

    } catch(exception) {
      this.setState({
        error: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  logout = (event) => {
      event.preventDefault()
      window.localStorage.removeItem('loggedBlogappUser')
      this.setState({user: null})
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newTitle,
      url: this.state.newUrl,
      author: this.state.newAuthor
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
            error: `a new blog '${blogObject.title}' by ${blogObject.author} added`,
            blogs: this.state.blogs.concat(newBlog),
            newTitle: '',
            newUrl: '',
            newAuthor: '',
        })
        setTimeout(() => {
            this.setState({ error: null })
        }, 2000)  
      })
  }

  
  

  render() {
    const blogForm = () => (
        <div>
              <form onSubmit={this.addBlog}>
                  <div>
                      title
                      <input
                          type="text"
                          name="newTitle"
                          value={this.state.newTitle}
                          onChange={this.handleFieldChange}
                      />
                  </div>
                  <div>
                      author
                      <input
                          type="text"
                          name="newAuthor"
                          value={this.state.newAuthor}
                          onChange={this.handleFieldChange}
                      />
                  </div>
                  <div>
                      url
                      <input
                          type="text"
                          name="newUrl"
                          value={this.state.newUrl}
                          onChange={this.handleFieldChange}
                      />
                  </div>
                  <button type="submit">save</button>
              </form>
        </div>
    )


    if (this.state.user === null) {
      return (
        <div>
            <Notification message={this.state.error} />
            <h2>Kirjaudu sovellukseen</h2>
            <form onSubmit={this.login}>
                <div>
                username
                    <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleFieldChange}
                    />
                </div>
                <div>
                password
                    <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleFieldChange}
                    />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
      )
    }
  
    return (
      <div>
        <Notification message={this.state.error} />
        <p>{this.state.user.name} logged in</p>
        <button onClick={this.logout}>logout</button>
        {blogForm()}
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App;
