import React from 'react'

const BlogForm = ({ addBlog, handleChange, newTitle, newAuthor, newUrl }) => {
    return (
        <div>
          <form onSubmit={addBlog}>
              <div>
                  title
                  <input
                      type="text"
                      name="newTitle"
                      value={newTitle}
                      onChange={handleChange}
                  />
              </div>
              <div>
                  author
                  <input
                      type="text"
                      name="newAuthor"
                      value={newAuthor}
                      onChange={handleChange}
                  />
              </div>
              <div>
                  url
                  <input
                      type="text"
                      name="newUrl"
                      value={newUrl}
                      onChange={handleChange}
                  />
              </div>
              <button type="submit">save</button>
          </form>
        </div>
    )
}

export default BlogForm