import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


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

    compareLikes = (a, b) => {
        if(a.likes < b.likes) return 1
        if(a.likes > b.likes) return -1
        return 0
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

    addLike = (id) => () => {
        const blog = this.state.blogs.find(b => b.id === id)
        const changedBlog = { ...blog, likes: blog.likes+1 }
    
        blogService
            .update(id, changedBlog)
            .then(changedBlog => {
                this.setState({
                    blogs: this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
            })
            })
            .catch(error => {
                this.setState({
                    error: `blog '${blog.title}' has been removed from the server`,
                    blogs: this.state.blogs.filter(b => b.id !== id)
            })
            setTimeout(() => {
                this.setState({ error: null })
            }, 50000)
        })
    }

    removeBlog = (id) => () => {
        if(window.confirm("are you sure you want to remove the blog?")) {
            blogService
                .remove(id)
                .then(() => {
                    blogService
                        .getAll()
                        .then(blogs => {
                            this.setState({ blogs })
                        })
                } 
            )
        }
    }

    showDeleteForBlog = (blog) => {
        if (!blog.user.username) { 
            return true
        }
        if (blog.user.username === this.state.user.username) {
            return true
        }
        return false
    } 

    render() {
        if (this.state.user === null) {
            return (
                <div className="login">
                    <Notification message={this.state.error} />
                    <Togglable buttonLabel="login">
                        <LoginForm
                            username={this.state.username}
                            password={this.state.password}
                            handleChange={this.handleFieldChange}
                            handleSubmit={this.login}
                        />
                    </Togglable>
                </div>
            )
        }
  
        return (
        <div>
            <Notification message={this.state.error} />
            <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
            <Togglable buttonLabel="add blog">
                <BlogForm 
                    addBlog={this.addBlog}
                    handleChange={this.handleFieldChange}
                    newTitle={this.state.newTitle}
                    newAuthor={this.state.newAuthor}
                    newUrl={this.state.newUrl}
                />
            </Togglable>
            <h2>blogs</h2> 
            {this.state.blogs.sort(this.compareLikes).map(blog => // sort blogs in descending order by likes
                <Blog 
                    key={blog.id} 
                    blog={blog} 
                    addLike={this.addLike(blog.id)}
                    removeBlog={this.removeBlog(blog.id)}
                    showDelete={this.showDeleteForBlog(blog)}
                />
            )}
        </div>
        )
    }
}

export default App;
