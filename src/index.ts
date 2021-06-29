import * as express from 'express'
import * as cors from 'cors'
import * as config from './../config.json'

import { checkLogin } from './routes/login'
import { checkRegister } from './routes/register'
import { loggerError } from './utils/logger'
import { addPinCode, getPinCode } from './routes/pincode'
import { getAllBlogPosts, addBlogPost, addBlogComment } from './routes/blogPosts'
import { getAllDirectPosts, addDirectPost, addDirectComment } from './routes/directPosts'

const app = express();
app.use(cors());
app.use(express.json());

// db
const mysql = require('mysql');

const { host, user, password, database } = config
export const connection = mysql.createConnection({
    host,
    user,
    port: config.dbPort,
    password,
    database
});


// routes
app.post('/login', async(req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        await checkLogin(username, password) ? res.send(true) : res.send(false)
    } catch (err) {
        loggerError.error(`failed in params of /login route. ${err}`)
    }
})

app.post('/register', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const phone = req.body.phone
        const email = req.body.email
        await checkRegister(username, password, phone, email) ? res.send(true) : res.send(false)
    } catch (err) {
        loggerError.error(`failed in params of /register route. ${err}`)
    }
})

app.post('/addpincode', async (req, res) => {
    try {
        const username = req.body.username
        const pincode = req.body.pincode
        await addPinCode(username, pincode) ? res.send(true) : res.send(false)
    } catch (err) {
        loggerError.error(`failed to add pin code. ${err}`)
    }
})

app.get('/getpincode', async (req, res) =>{
    try {
        const username = req.body.username
        const pincode = await getPinCode(username)
        res.send(pincode)
    } catch (err) {
        loggerError.error(`failed to get pin code. ${err}`)
    }
})

app.post('/addblogpost', async (req, res) =>{
    try {
        const username = req.body.username
        const title = req.body.title
        const description = req.body.description
        const date = req.body.date
        const files = req.body.files
        const result = await addBlogPost(username, title, description, date, files)
    } catch (err) {
        loggerError.error(`failed to get pin code. ${err}`)
    }
})

app.post('/addblogcomment', async (req, res) =>{
    try {
        const username = req.body.username
        const description = req.body.description
        const date = req.body.date
        const files = req.body.files
        const result = await addBlogComment(username, description, date, files)
    } catch (err) {
        loggerError.error(`failed to get pin code. ${err}`)
    }
})

app.post('/getallblogposts', async (req, res) =>{
    try {
        const result = await getAllBlogPosts()
    } catch (err) {
        loggerError.error(`failed to get pin code. ${err}`)
    }
})

app.post('/adddirectpost', async (req, res) =>{
    try {
        const username = req.body.username
        const title = req.body.title
        const description = req.body.description
        const date = req.body.date
        const files = req.body.files
        const result = await addDirectPost(username, title, description, date, files)
    } catch (err) {
        loggerError.error(`failed to get pin code. ${err}`)
    }
})

app.post('/adddirectcomment', async (req, res) =>{
    try {
        const username = req.body.username
        const description = req.body.description
        const date = req.body.date
        const files = req.body.files
        const result = await addDirectComment(username, description, date, files)
    } catch (err) {
        loggerError.error(`failed to get pin code. ${err}`)
    }
})

app.post('/getalldirectposts', async (req, res) =>{
    try {
        const username = req.body.username
        const result = await getAllDirectPosts(username)
    } catch (err) {
        loggerError.error(`failed to get pin code. ${err}`)
    }
})

// server
app.listen(config.port, () => {
    console.log(`VTserver listening at ${config.port}`)
})