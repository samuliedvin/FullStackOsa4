let token = null

const blogs = [
    {
        id: '5c0500366ccb9634b4dea3e6',
        title: 'Testiblogi',
        author: 'Author',
        url: 'www.test.com',
        likes: 12,
        user: {
            _id: '5c04d47f453f6a2e5998f58',
            username: 'samuliedvin',
            name: 'Samuli Virtanen'
        }
    },
    {
        id: '5c05020bf7278c354b584a01',
        title: 'Testiblogi2',
        author: 'Author',
        url: 'www.test.com',
        likes: 2,
        user: {
            _id: '5c04d47f453f6a2e5998f58',
            username: 'samuliedvin',
            name: 'Samuli Virtanen'
        }
    },
    {
        id: '5c0502557aac32355e86d9dc',
        title: 'Testiblogi3',
        author: 'Author',
        url: 'www.test.com',
        likes: 21,
        user: {
            _id: '5c04d47f453f6a2e5998f58',
            username: 'samuliedvin',
            name: 'Samuli Virtanen'
        }
    },
]


const getAll = () => {
    return Promise.resolve(blogs)
}
  
export default { getAll, blogs }