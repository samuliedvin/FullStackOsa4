const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.logger)
app.use(middleware.error)

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})