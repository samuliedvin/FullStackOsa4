import React from 'react'
import Togglable from './Togglable';

class Blog extends React.Component {
    constructor(props) {
        super(props)
    }

  
    handleClick = () => {
        this.blogInfo.toggleVisibility()
    }

    render() {

        const togglable = () => (
                <Togglable ref={component => this.blogInfo = component} >
                    <div className="blogInfo">
                        <p>
                            <a href={this.props.blog.url}>{this.props.blog.url}</a>
                        </p>
                        <p>{this.props.blog.likes} likes <button>like</button></p>
                        <p>added by {!this.props.blog.user ? 'anonymous' : this.props.blog.user.name}</p>
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