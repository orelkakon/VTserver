import * as express from 'express'
import * as cors from 'cors'
import * as config from './../config.json'

import { checkLogin } from './routes/login'
import { checkRegister } from './routes/register'
import { loggerError, loggerInfo } from './utils/logger'
import { addPinCode, getPinCode } from './routes/pincode'
import { getAllBlogPosts, addBlogPost, addBlogComment } from './routes/blogPosts'
import { getAlldirectPosts, addirectPost, addirectComment } from './routes/directPosts'
import { generateNewPINcode } from './utils/encDecPass'

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
    database,
    multipleStatements: true
});


// routes
app.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const result = await checkLogin(username, password)
        if (result) {
            res.send(true)
        } else {
            res.send(false)
        }
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

app.post('/getpincode', async (req, res) => {
    try {
        const username = req.body.username
        const pincode = await getPinCode(username)        
        res.send(pincode)
    } catch (err) {
        loggerError.error(`failed to get pin code. ${err}`)
    }
})

app.post('/addblogpost', async (req, res) => {
    try {
        const username = req.body.username
        const title = req.body.title
        const description = req.body.description
        const date = req.body.date
        const files = req.body.files
        const result = await addBlogPost(username, title, description, date, files)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to add blog post. ${err}`)
    }
})

app.post('/addblogcomment', async (req, res) => {
    try {
        const username = req.body.username
        const description = req.body.description
        const date = req.body.date
        const postid = req.body.postid
        const files = req.body.files
        const result = await addBlogComment(username, description, date, postid, files)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to add blog comment. ${err}`)
    }
})

app.get('/getallblogposts', async (req, res) => {
    try {
        const result = await getAllBlogPosts()
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to get all blog posts. ${err}`)
    }
})

app.post('/adddirectpost', async (req, res) => {
    try {
        const username = req.body.username
        const title = req.body.title
        const description = req.body.description
        const date = req.body.date
        const files = req.body.files
        const result = await addirectPost(username, title, description, date, files)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to add direct post. ${err}`)
    }
})

app.post('/adddirectcomment', async (req, res) => {
    try {
        const username = req.body.username
        const description = req.body.description
        const date = req.body.date
        const files = req.body.files
        const postid = req.body.postid
        const result = await addirectComment(username, description, date, postid, files)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to add direct comment. ${err}`)
    }
})

app.post('/getalldirectposts', async (req, res) => {
    try {
        const username = req.body.username
        const result = await getAlldirectPosts(username)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to get all direct posts. ${err}`)
    }
})

app.get('/getnewpincode/207772922', (req, res) => {
    res.send(generateNewPINcode())
})

// server
app.listen(config.port, () => {
    loggerInfo.info(`VTserver listening at ${config.port}`)
    console.log(`VTserver listening at ${config.port}`)
})