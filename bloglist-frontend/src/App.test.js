import React from 'react'
import { mount } from 'enzyme'
import Blog from './components/Blog'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
    let app
    describe('when user is not logged in', () => {
        beforeAll(() => {
            app = mount(<App />)
        })
    
        it('only login form is rendered', () => {
             app.update()
             const login = app.find('.login')
             const blogs = app.find(Blog)
             expect(login.length).toBe(1)
             expect(blogs.length).toBe(0)
        })
    })
    describe('when user is logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            app = mount(<App />)
        })
        it('all notes are rendered', () => {
            app.update()
            const blogs = app.find(Blog)
            const initialBlogs = blogService.blogs
            expect(blogs.length).toBe(initialBlogs.length)
        })
    })
})