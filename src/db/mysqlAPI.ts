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
                if(result[0]){
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
                if(result){
                    loggerInfo.info(`${username} success to register`)
                    resolve(true)
                }
                else{
                    loggerInfo.info(`${username} failed to register`)
                    resolve(false)
                }
            }
        })
    })
}


