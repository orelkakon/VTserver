"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const index_1 = require("./../index");
const logger_1 = require("./../utils/logger");
const encDecPass_1 = require("./../utils/encDecPass");
const login = (username) => {
    return new Promise((resolve, reject) => {
        const GET_MEMBER = `SELECT password FROM members WHERE (username = '${username}')`;
        index_1.connection.query(GET_MEMBER, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to check login in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    const decryptPass = encDecPass_1.decrypt(result[0].password);
                    resolve(decryptPass);
                }
                resolve(false);
            }
        });
    });
};
exports.login = login;
const register = (username, password, phone, email) => {
    return new Promise((resolve, reject) => {
        const ADD_MEMBER = `INSERT INTO members (username, password, phone, email) VALUES ('${username}', '${password}', '${phone}', '${email}')`;
        index_1.connection.query(ADD_MEMBER, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to register in db. ${err}`);
                resolve(false);
            }
            else {
                if (result) {
                    logger_1.loggerInfo.info(`${username} success to register`);
                    resolve(true);
                }
                else {
                    logger_1.loggerInfo.info(`${username} failed to register`);
                    resolve(false);
                }
            }
        });
    });
};
exports.register = register;
//# sourceMappingURL=mysqlAPI.js.map