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
    database
});
// routes
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        (yield login_1.checkLogin(username, password)) ? res.send(true) : res.send(false);
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
// server
app.listen(config.port, () => {
    console.log(`VTserver listening at ${config.port}`);
});
//# sourceMappingURL=index.js.map