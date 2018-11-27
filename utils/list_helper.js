const dummy = (blogs) => 1
 
const totalLikes = (blogs) => {
    return blogs.reduce((acc, curr) => curr.likes + acc, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length !== 0) {
        return blogs.reduce((acc, curr) => {
            if (curr.likes >= acc.likes) {
                return curr
            } else {
                return acc
            }
        })
    } else {
        return null
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length !== 0) {
        // so lets create an object with reduce, where keys are author names
        // and values are the amount of their blogs. The object is in the accumulator
        let blogsByAuthor = blogs.reduce((acc, curr) => {
            if(!acc[curr.author]) {
                acc[curr.author] = 1
                return acc
            } else {
                acc[curr.author]++
                return acc 
            }
        }, {})

        // now the blogsByAuthor looks like this: 
        //   { 'Michael Chan': 1,
        //   'Edsger W. Dijkstra': 2,
        //   'Robert C. Martin': 3 }

        // here we extract the author with most blogs:
        let authorWithMostBlogs = 
            Object.keys(blogsByAuthor)
                .reduce((a, b) => blogsByAuthor[a] > blogsByAuthor[b] ? a : b)
        
        return {
            author: authorWithMostBlogs,
            blogs: blogsByAuthor[authorWithMostBlogs]
        }
    } else {
        return null
    }
}

const mostLikes = (blogs) => {
    if(blogs.length !== 0) {
        // so lets create an object with reduce, where keys are author names
        // and values are the amount of their likes. The object is in the accumulator
        let likesByAuthor = blogs.reduce((acc, curr) => {
            if(!acc[curr.author]) {
                acc[curr.author] = curr.likes
                return acc
            } else {
                acc[curr.author] += curr.likes
                return acc 
            }
        }, {})

        // now the blogsByAuthor looks like this: 
        //   { 'Michael Chan': 1,
        //   'Edsger W. Dijkstra': 2,
        //   'Robert C. Martin': 3 }

        // here we extract the author with most blogs:
        let authorWithMostLikes = 
            Object.keys(likesByAuthor)
                .reduce((a, b) => likesByAuthor[a] > likesByAuthor[b] ? a : b)
        
        return {
            author: authorWithMostLikes,
            likes: likesByAuthor[authorWithMostLikes]
        }
    } else {
        return null
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}