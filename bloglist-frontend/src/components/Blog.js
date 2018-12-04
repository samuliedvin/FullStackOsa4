import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

class Blog extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        blog: PropTypes.object.isRequired,
        addLike: PropTypes.func.isRequired,
        removeBlog: PropTypes.func.isRequired,
        showDelete: PropTypes.bool.isRequired
    }

    handleClick = () => {
        this.blogInfo.toggleVisibility()
    }

    render() {
        const showWhenVisible = { display: this.props.showDelete ? '' : 'none' }

        const togglable = () => (
                <Togglable ref={component => this.blogInfo = component}>
                    <div className="blogInfo">
                        <p>
                            <a href={this.props.blog.url}>{this.props.blog.url}</a>
                        </p>
                        <p>{this.props.blog.likes} likes <button onClick={this.props.addLike}>like</button></p>
                        <p>added by {!this.props.blog.user ? 'anonymous' : this.props.blog.user.name}</p>
                        <button style={showWhenVisible} onClick={this.props.removeBlog}>delete blog</button>
                    </div>
                </Togglable>
        )
        
        return(
            <div className='blog' onClick={this.handleClick}>
                <p>
                    <strong>{this.props.blog.title}</strong> {this.props.blog.author}
                </p>                
                {togglable()}
            </div>  
        )
    }
}

export default Blog