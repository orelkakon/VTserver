import { login } from './../db/mysqlAPI'
import { loggerInfo } from './../utils/logger'

export const checkLogin = async (username, password) => {
    const decPassword = await login(username);
    
    if(password === decPassword){
        loggerInfo.info(`${username} success to login`)
        return true
    }
    else{
        loggerInfo.info(`${username} failed to login`)
        return false
    }
} 

