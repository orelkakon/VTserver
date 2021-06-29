import { encrypt } from './../utils/encDecPass'
import { register } from './../db/mysqlAPI'

export const checkRegister = (username, password, phone, email) => {
    const encPassword = encrypt(password);
    return register(username, encPassword, phone, email)    
} 
