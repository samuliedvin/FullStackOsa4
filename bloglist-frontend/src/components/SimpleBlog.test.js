import React from 'react'
import { shallow } from 'enzyme'
import { mount } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'

describe.only('<SimpleBlog /> and <Blog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Samuli Virtanen',
            likes: 4
        }

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const contentDiv = blogComponent.find('.info')

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
    })
    it('clicking the button twice calls event handler twice', () => {
        const blog = {
          title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
          author: 'Samuli Virtanen',
          likes: 4
        }
      
        const mockHandler = jest.fn()
      
        const blogComponent = shallow(
          <SimpleBlog
            blog={blog}
            onClick={mockHandler}
          />
        )
      
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
      
        expect(mockHandler.mock.calls.length).toBe(2)
    })

    it('shows normally only title and author', () => {
        const blog = {
            title: 'Otsikko',
            author: 'Samuli Virtanen',
            likes: 4,
            url: 'https://www.fi'
        }
        const mockHandler = jest.fn()
        const blogComponent = shallow(
            <Blog
              blog={blog}
              addLike={mockHandler}
              removeBlog={mockHandler}
              showDelete={false}
            />
        )
        const contentDiv = blogComponent.find('.blog')
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).not.toContain(blog.likes)         
    })

    it('after clicking name the details are displayed', () => {
        const blog = {
            title: 'Otsikko',
            author: 'Samuli Virtanen',
            likes: 4,
            url: 'https://www.fi'
        }
        const mockHandler = jest.fn()
        const blogComponent = mount( 
            // had to use mount because the ref wouldnt otherwise work, checkout this:
            // https://github.com/airbnb/enzyme/issues/316
            <Blog
              blog={blog}
              addLike={mockHandler}
              removeBlog={mockHandler}
              showDelete={false}
            />
        )
        // haetaan klikattava osa komponentista
        const nameDiv = blogComponent.find('.blog')
        nameDiv.simulate('click')
        // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
        const contentDiv = blogComponent.find('.blogInfo')
        expect(contentDiv.text()).toContain(blog.likes)
        expect(contentDiv.text()).toContain(blog.url)
        expect(contentDiv.text()).toContain('anonymous')
    })
})