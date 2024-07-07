const express = require('express')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary').v2
const cors = require('cors')
const fileupload = require('express-fileupload')
const {errormiddleware} = require('./middleware/error')//const errormiddleware = require('./middleware/error')
const userrouter = require('./routes/user.route')
const listrouter  = require('./routes/list.route')
const cookieparser = require('cookie-parser')
const app = express()
require('./db/conn')

dotenv.config({ path: './dotenv/config.env' })
const port  = process.env.PORT 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use(cookieparser())
app.use('/api/v1/user', userrouter)
app.use('/api/v1/list', listrouter)
app.use(errormiddleware)


app.listen(port, () => console.log(`Server running on port ${port}`))