import * as express from 'express'
import * as cors from 'cors'
import * as config from './../config.json'

import { checkLogin } from './routes/login'
import { checkRegister } from './routes/register'
import { loggerError } from './utils/logger'

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

// server
app.listen(config.port, () => {
    console.log(`VTserver listening at ${config.port}`)
})