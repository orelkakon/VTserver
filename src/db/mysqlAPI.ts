import { connection } from './../index'
import { loggerError, loggerInfo } from './../utils/logger'
import { decrypt } from './../utils/encDecPass'

export const login = (username) => {
    return new Promise((resolve, reject) => {
        const GET_MEMBER = `SELECT password FROM members WHERE (username = '${username}')`
        connection.query(GET_MEMBER, (err, result) => {
            if (err) {
                loggerError.error(`failed to check login in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    const decryptPass = decrypt(result[0].password)
                    resolve(decryptPass)
                }
                resolve(false)
            }
        })
    })
}

export const register = (username, password, phone, email): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const ADD_MEMBER = `INSERT INTO members (username, password, phone, email) VALUES ('${username}', '${password}', '${phone}', '${email}')`
        connection.query(ADD_MEMBER, (err, result) => {
            if (err) {
                loggerError.error(`failed to register in db. ${err}`)
                resolve(false)
            }
            else {
                if (result) {
                    loggerInfo.info(`${username} success to register`)
                    resolve(true)
                }
                else {
                    loggerInfo.info(`${username} failed to register`)
                    resolve(false)
                }
            }
        })
    })
}

export const addPin = (username, pincode) => {
    return new Promise((resolve, reject) => {
        const ADD_PIN = `UPDATE members SET pincode = '${pincode}' WHERE (username = '${username}')`
        connection.query(ADD_PIN, (err, result) => {
            if (err) {
                loggerError.error(`failed to add pin code in db. ${err}`)
                reject(err)
            }
            else {
                if(result.affectedRows === 1){
                    loggerInfo.info(`success to save a new pin code ${pincode} of ${username}`)
                    resolve(true)
                }
                else{
                    loggerInfo.info(`failed to save a new pin code ${pincode} of ${username}`)
                    resolve(false)
                }
            }
        })
    })
}

export const getPin = (username) => {
    return new Promise((resolve, reject) => {
        const GET_PIN = `SELECT pincode FROM members WHERE (username = '${username}')`
        connection.query(GET_PIN, (err, result) => {
            if (err) {
                loggerError.error(`failed to get pin code in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    loggerInfo.info(`success to get pin code of ${username}`)
                    resolve(result[0].pincode)
                }
                else{
                    loggerInfo.info(`failed to get pin code of ${username}`)
                    resolve('0000') // 0000 represent failed pin code 
                }
            }
        })
    })
}