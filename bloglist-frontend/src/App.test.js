import React from 'react'
import { mount } from 'enzyme'
import Blog from './components/Blog'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })

    it('renders only login button when not signed in', () => {
         app.update()
         const login = app.find('.login')
         const blogs = app.find(Blog)
         expect(login.length).toBe(1)
         expect(blogs.length).toBe(0)
    })
})