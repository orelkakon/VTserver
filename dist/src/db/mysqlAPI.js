"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPin = exports.addPin = exports.register = exports.login = void 0;
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
const addPin = (username, pincode) => {
    return new Promise((resolve, reject) => {
        const ADD_PIN = `UPDATE members SET pincode = '${pincode}' WHERE (username = '${username}')`;
        index_1.connection.query(ADD_PIN, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to add pin code in db. ${err}`);
                reject(err);
            }
            else {
                if (result.affectedRows === 1) {
                    logger_1.loggerInfo.info(`success to save a new pin code ${pincode} of ${username}`);
                    resolve(true);
                }
                else {
                    logger_1.loggerInfo.info(`failed to save a new pin code ${pincode} of ${username}`);
                    resolve(false);
                }
            }
        });
    });
};
exports.addPin = addPin;
const getPin = (username) => {
    return new Promise((resolve, reject) => {
        const GET_PIN = `SELECT pincode FROM members WHERE (username = '${username}')`;
        index_1.connection.query(GET_PIN, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to get pin code in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    logger_1.loggerInfo.info(`success to get pin code of ${username}`);
                    resolve(result[0].pincode);
                }
                else {
                    logger_1.loggerInfo.info(`failed to get pin code of ${username}`);
                    resolve('0000'); // 0000 represent failed pin code 
                }
            }
        });
    });
};
exports.getPin = getPin;
//# sourceMappingURL=mysqlAPI.js.map