"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const express = require("express");
const cors = require("cors");
const config = require("./../config.json");
const login_1 = require("./routes/login");
const register_1 = require("./routes/register");
const logger_1 = require("./utils/logger");
const pincode_1 = require("./routes/pincode");
const blogPosts_1 = require("./routes/blogPosts");
const directPosts_1 = require("./routes/directPosts");
const encDecPass_1 = require("./utils/encDecPass");
const app = express();
app.use(cors());
app.use(express.json());
// db
const mysql = require('mysql');
const { host, user, password, database } = config;
exports.connection = mysql.createConnection({
    host,
    user,
    port: config.dbPort,
    password,
    database,
    multipleStatements: true
});
// routes
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const result = yield login_1.checkLogin(username, password);
        if (result) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    catch (err) {
        logger_1.loggerError.error(`failed in params of /login route. ${err}`);
    }
}));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const phone = req.body.phone;
        const email = req.body.email;
        (yield register_1.checkRegister(username, password, phone, email)) ? res.send(true) : res.send(false);
    }
    catch (err) {
        logger_1.loggerError.error(`failed in params of /register route. ${err}`);
    }
}));
app.post('/addpincode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const pincode = req.body.pincode;
        (yield pincode_1.addPinCode(username, pincode)) ? res.send(true) : res.send(false);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to add pin code. ${err}`);
    }
}));
app.post('/getpincode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const pincode = yield pincode_1.getPinCode(username);
        res.send(pincode);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to get pin code. ${err}`);
    }
}));
app.post('/addblogpost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const files = req.body.files;
        const result = yield blogPosts_1.addBlogPost(username, title, description, date, files);
        res.send(result);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to add blog post. ${err}`);
    }
}));
app.post('/addblogcomment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const description = req.body.description;
        const date = req.body.date;
        const postid = req.body.postid;
        const files = req.body.files;
        const result = yield blogPosts_1.addBlogComment(username, description, date, postid, files);
        res.send(result);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to add blog comment. ${err}`);
    }
}));
app.get('/getallblogposts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blogPosts_1.getAllBlogPosts();
        res.send(result);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to get all blog posts. ${err}`);
    }
}));
app.post('/adddirectpost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const files = req.body.files;
        const result = yield directPosts_1.addirectPost(username, title, description, date, files);
        res.send(result);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to add direct post. ${err}`);
    }
}));
app.post('/adddirectcomment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const description = req.body.description;
        const date = req.body.date;
        const files = req.body.files;
        const postid = req.body.postid;
        const result = yield directPosts_1.addirectComment(username, description, date, postid, files);
        res.send(result);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to add direct comment. ${err}`);
    }
}));
app.post('/getalldirectposts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const result = yield directPosts_1.getAlldirectPosts(username);
        res.send(result);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to get all direct posts. ${err}`);
    }
}));
app.get('/getAdmindirectposts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield directPosts_1.getAdmindirectPosts();
        res.send(result);
    }
    catch (err) {
        logger_1.loggerError.error(`failed to get all direct posts. ${err}`);
    }
}));
app.get('/getnewpincode/207772922', (req, res) => {
    res.send(encDecPass_1.generateNewPINcode());
});
// server
app.listen(config.port, () => {
    logger_1.loggerInfo.info(`VTserver listening at ${config.port}`);
    console.log(`VTserver listening at ${config.port}`);
});
//# sourceMappingURL=index.js.map