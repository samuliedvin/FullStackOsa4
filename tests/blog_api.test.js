const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        await Promise.all(blogObjects.map(blog => blog.save()))
    })

    test('blogs are returned as json by GET /api/blogs', async () => {
        const blogsInDatabase = await blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)

        const returnedTitles = response.body.map(b => b.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedTitles).toContain(blog.title)
        })
    })

    describe('addition of a blog', async() => {
        test('a valid blog can be added', async () => {

            const newBlog = {
                title: 'a valid blog post',
                author: 'Samuli Virtanen',
                url: 'www.samulivirtanen.fi',
                likes: 0   
            }
    
            const blogsBefore = await blogsInDb()
    
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        
            const blogsAfter = await blogsInDb()
            
            expect(blogsAfter.length).toBe(blogsBefore.length + 1)
            const titles = blogsAfter.map(r => r.title)
            expect(titles).toContain('a valid blog post')    
        })
    
        test('a blog with no likes gets initiated with 0 likes', async () => {
            const newBlog = {
                title: 'a valid blog post',
                author: 'Samuli Virtanen',
                url: 'www.samulivirtanen.fi',
            }

            const blogsBefore = await blogsInDb()

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            
            const blogsAfter = await blogsInDb()
    
            const likes = blogsAfter.map(r => r.likes)
            expect(likes[blogsBefore.length]).toBe(0)   
        })
    
        test('server should respond with code 400 if blog contains no title or url', async () => {
            const noTitleOrUrl = {
                author: 'Samuli Virtanen',
                likes: 4
            }
            await api
                .post('/api/blogs')
                .send(noTitleOrUrl)
                .expect(400)
    
            const noTitle = {
                author: 'Samuli Virtanen',
                url: 'www.fi',
                likes: 4
            }
            await api
                .post('/api/blogs')
                .send(noTitle)
                .expect(400)
    
            const noUrl = {
                author: 'Samuli Virtanen',
                title: 'blog',
                likes: 4
            }
            await api
                .post('/api/blogs')
                .send(noUrl)
                .expect(400)
        })
    })

    describe('deletion of a blog', async () => {
        let addedBlog

        beforeAll(async () => {
            addedBlog = new Blog({
                title: 'poisto pyynnöllä HTTP DELETE',
                author: 'Samuli Virtanen',
                url: 'www.samulivirtanen.fi',
                likes: 0   
            })
            await addedBlog.save()
        })

        test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
            const blogsBefore = await blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(204)

            const blogsAfter = await blogsInDb()

            const titles = blogsAfter.map(r => r.title)

            expect(titles).not.toContain(addedBlog.title)
            expect(blogsAfter.length).toBe(blogsBefore.length - 1)
        })
    })
    describe('editing of a blog', () => {
        
        let addedBlog 

        beforeAll(async () => {
            addedBlog = new Blog({
                title: 'muokkaus pyynnöllä HTTP PUT',
                author: 'Samuli Virtanen',
                url: 'www.samulivirtanen.fi',
                likes: 0   
            })
            await addedBlog.save()
        })

        test('PUT /api/blogs/:id updates a blog', async () => {
            const blogsBefore = await blogsInDb()
    
            let editedBlog = {
                title: 'muokkaus pyynnöllä HTTP PUT',
                author: 'Samuli Virtanen',
                url: 'www.samulivirtanen.fi',
                likes: 42   
            }
            await api
                .put(`/api/blogs/${addedBlog._id}`)
                .send(editedBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAfter = await blogsInDb()

            expect(blogsAfter.length).toBe(blogsBefore.length)
            expect(blogsAfter[blogsAfter.length-1].likes).toBe(42)
        })
    })

    afterAll(() => {
        server.close()
    })

})