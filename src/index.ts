import * as express from 'express'
import * as cors from 'cors'
import * as config from './../config.json'

import { getMemberData } from './routes/utils'
import { checkLogin } from './routes/login'
import { checkRegister } from './routes/register'
import { loggerError, loggerInfo } from './utils/logger'
import { addPinCode, getPinCode, existPinCode } from './routes/pincode'
import { getAllBlogPosts, addBlogPost, addBlogComment, deletePost, deleteComment } from './routes/blogPosts'
import { getAlldirectPosts, addirectPost, addirectComment, getAdmindirectPosts, deletePostD, deleteCommentD } from './routes/directPosts'
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

app.post('/checkexistpincode', async (req, res) => {
    try {
        const pincode = req.body.pincode
        const username = req.body.username
        const exist = await existPinCode(pincode, username)
        res.send(exist)
    } catch (err) {
        loggerError.error(`failed to check pin code. ${err}`)
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

app.get('/getAdmindirectposts', async (req, res) => {
    try {
        const result = await getAdmindirectPosts()
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to get all direct posts. ${err}`)
    }
})


app.get('/getnewpincode/207772922', (req, res) => {
    res.send(generateNewPINcode())
})


app.post('/deletepost', async (req, res) => {
    try {
        const postid = req.body.postid
        const result = await deletePost(postid)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to delete post. ${err}`)
    }
})

app.post('/deletedirectpost', async (req, res) => {
    try {
        const postid = req.body.postid
        const result = await deletePostD(postid)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to delete direct post. ${err}`)
    }
})

app.post('/deletecomment', async (req, res) => {
    try {
        const commentid = req.body.commentid
        const result = await deleteComment(commentid)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to delete comment. ${err}`)
    }
})

app.post('/deletedirectcomment', async (req, res) => {
    try {
        const commentid = req.body.commentid
        const result = await deleteCommentD(commentid)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to delete direct comment. ${err}`)
    }
})

app.post('/getmemberdata', async (req, res) => {
    try {
        const username = req.body.username
        const result = await getMemberData(username)
        res.send(result)
    } catch (err) {
        loggerError.error(`failed to get member data ${err}`)
    }
})

// server
app.listen(config.port, () => {
    loggerInfo.info(`VTserver listening at ${config.port}`)
    console.log(`VTserver listening at ${config.port}`)
})